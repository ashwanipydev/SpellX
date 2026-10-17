// Minimal DOM + browser shim so the real app scripts can run under Node.
// Supports only what the app actually uses: element trees, class/id selectors,
// a single descendant combinator, events, and the few window APIs touched.
'use strict';

function FakeClassList(el) {
  this._el = el;
}
FakeClassList.prototype._list = function () {
  return String(this._el.className || '').split(/\s+/).filter(Boolean);
};
FakeClassList.prototype.add = function (c) {
  var l = this._list();
  if (l.indexOf(c) === -1) { l.push(c); }
  this._el.className = l.join(' ');
};
FakeClassList.prototype.remove = function (c) {
  this._el.className = this._list().filter(function (x) { return x !== c; }).join(' ');
};
FakeClassList.prototype.contains = function (c) {
  return this._list().indexOf(c) !== -1;
};

function matchSimple(el, sel) {
  sel = sel.trim();
  var childIdx = sel.indexOf('>');
  if (childIdx !== -1) {
    sel = sel.slice(childIdx + 1).trim();
  }
  var parts = sel.split('.');
  var head = parts.shift();
  if (head) {
    if (head.charAt(0) === '#') {
      if (el.getAttribute('id') !== head.slice(1)) { return false; }
    } else if (head !== '*' && String(el.tagName || '').toLowerCase() !== head.toLowerCase()) {
      return false;
    }
  }
  var cl = new FakeClassList(el);
  for (var i = 0; i < parts.length; i++) {
    if (parts[i] && !cl.contains(parts[i])) { return false; }
  }
  return true;
}

function Element(tag) {
  this.tagName = String(tag || 'div').toUpperCase();
  this.children = [];
  this.attributes = {};
  this.className = '';
  this.style = {};
  this.listeners = {};
  this.disabled = false;
  this._text = '';
  this.parentNode = null;
  this.classList = new FakeClassList(this);
}
Element.prototype.appendChild = function (child) {
  if (child == null) { return child; }
  child.parentNode = this;
  this.children.push(child);
  return child;
};
Element.prototype.insertBefore = function (child, ref) {
  var i = this.children.indexOf(ref);
  this.children.splice(i === -1 ? this.children.length : i, 0, child);
  child.parentNode = this;
  return child;
};
Element.prototype.removeChild = function (child) {
  var i = this.children.indexOf(child);
  if (i !== -1) { this.children.splice(i, 1); }
  return child;
};
Element.prototype.setAttribute = function (k, v) {
  this.attributes[k] = String(v);
};
Element.prototype.getAttribute = function (k) {
  return Object.prototype.hasOwnProperty.call(this.attributes, k) ? this.attributes[k] : null;
};
Element.prototype.hasAttribute = function (k) {
  return Object.prototype.hasOwnProperty.call(this.attributes, k);
};
Object.defineProperty(Element.prototype, 'textContent', {
  get: function () {
    if (this.children.length) {
      return this.children.map(function (c) { return c.textContent || ''; }).join('');
    }
    return this._text;
  },
  set: function (v) {
    this.children = [];
    this._text = String(v);
  }
});
Object.defineProperty(Element.prototype, 'innerHTML', {
  get: function () { return this.textContent; },
  set: function (v) {
    this.children = [];
    this._text = String(v);
  }
});
Element.prototype.addEventListener = function (ev, fn) {
  (this.listeners[ev] = this.listeners[ev] || []).push(fn);
};
Element.prototype.removeEventListener = function (ev, fn) {
  var l = this.listeners[ev] || [];
  var i = l.indexOf(fn);
  if (i !== -1) { l.splice(i, 1); }
};
Element.prototype.dispatch = function (ev) {
  var list = (this.listeners[ev] || []).slice();
  var e = { type: ev, preventDefault: function () {}, key: '', clientX: 0, clientY: 0, target: this };
  for (var i = 0; i < list.length; i++) { list[i].call(this, e); }
  return e;
};
Element.prototype.click = function () {
  return this.dispatch('click');
};
Element.prototype.focus = function () {};
Element.prototype.blur = function () {};
Element.prototype.walk = function (fn) {
  this.children.forEach(function (c) { fn(c); c.walk && c.walk(fn); });
};
function matchChain(el, parts, childOnly) {
  if (!matchSimple(el, parts[parts.length - 1])) { return false; }
  var i = parts.length - 2, node = el.parentNode;
  while (i >= 0) {
    if (childOnly) {
      if (!node || !matchSimple(node, parts[i])) { return false; }
      node = node.parentNode;
    } else {
      var found = false;
      while (node) {
        if (matchSimple(node, parts[i])) { found = true; node = node.parentNode; break; }
        node = node.parentNode;
      }
      if (!found) { return false; }
    }
    i -= 1;
  }
  return true;
}
Element.prototype.querySelectorAll = function (selector) {
  var sel = String(selector).trim();
  var childOnly = sel.indexOf(">") !== -1;
  var parts = (childOnly ? sel.split(">") : sel.split(/\s+/)).map(function (s) { return s.trim(); }).filter(Boolean);
  var hits = [];
  if (!parts.length) { return hits; }
  this.walk(function (el) { if (matchChain(el, parts, childOnly)) { hits.push(el); } });
  return hits;
};
Element.prototype.querySelector = function (selector) {
  var all = this.querySelectorAll(selector);
  return all.length ? all[0] : null;
};


function makeDoc() {
  var doc = new Element('#document');
  doc.createElement = function (tag) { return new Element(tag); };
  doc.createElementNS = function (ns, tag) { var e = new Element(tag); e.ns = ns; return e; };
  doc.createTextNode = function (t) { var e = new Element('#text'); e._text = String(t); return e; };
  doc.body = new Element('body');
  doc.appendChild(doc.body);
  doc.documentElement = new Element('html');
  doc.readyState = 'complete';
  doc.activeElement = doc.body;
  doc.getElementById = function (id) {
    if (id === 'TESTOUT') { return null; }
    var found = null;
    doc.walk(function (el) {
      if (!found && el.getAttribute('id') === id) { found = el; }
    });
    return found;
  };
  doc.querySelectorAll = function (s) { return Element.prototype.querySelectorAll.call(doc, s); };
  doc.querySelector = function (s) { return Element.prototype.querySelector.call(doc, s); };
  doc.addEventListener = function () {};
  return doc;
}

function install() {
  var doc = makeDoc();
  var storage = {};
  var main = doc.createElement('main');
  main.setAttribute('id', 'main');
  var sheetHost = doc.createElement('div');
  sheetHost.setAttribute('id', 'sheetHost');
  sheetHost.hidden = true;
  var fxHost = doc.createElement('div');
  fxHost.setAttribute('id', 'fxHost');
  doc.body.appendChild(main);
  doc.body.appendChild(sheetHost);
  doc.body.appendChild(fxHost);

  global.window = global;
  global.document = doc;
  global.localStorage = {
    getItem: function (k) { return Object.prototype.hasOwnProperty.call(storage, k) ? storage[k] : null; },
    setItem: function (k, v) { storage[k] = String(v); },
    removeItem: function (k) { delete storage[k]; }
  };
  global.matchMedia = function () { return { matches: false, addEventListener: function () {} }; };
  global.window.matchMedia = global.matchMedia;
  try { Object.defineProperty(global, 'navigator', { value: { onLine: true }, configurable: true, writable: true }); } catch (e) { /* node 24 exposes a getter-only navigator */ }
  global.location = { protocol: 'file:' };
  global.speechSynthesis = undefined;
  global.setTimeout = setTimeout;
  global.clearTimeout = clearTimeout;
  global.window.scrollTo = function () {};
  global.window.addEventListener = function () {};
  return { doc: doc, main: main, storage: storage };
}

module.exports = { install: install, Element: Element };

