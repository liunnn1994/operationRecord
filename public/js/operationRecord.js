/**
 * created by liu
 * https://www.123465.plus;
 * 基于 rrweb二次开发的项目。地址： https://github.com/rrweb-io/rrweb 
 * 后端基于nodejs 地址：https://github.com/asdjgfr/operationRecord
 */
var rrweb = (function (exports) {
  'use strict';
  var __assign = function () {
    __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };

  var NodeType;
  (function (NodeType) {
    NodeType[NodeType["Document"] = 0] = "Document";
    NodeType[NodeType["DocumentType"] = 1] = "DocumentType";
    NodeType[NodeType["Element"] = 2] = "Element";
    NodeType[NodeType["Text"] = 3] = "Text";
    NodeType[NodeType["CDATA"] = 4] = "CDATA";
    NodeType[NodeType["Comment"] = 5] = "Comment";
  })(NodeType || (NodeType = {}));

  var _id = 1;
  function genId() {
    return _id++;
  }
  function resetId() {
    _id = 1;
  }
  function getCssRulesString(s) {
    try {
      var rules = s.rules || s.cssRules;
      return rules
        ? Array.from(rules).reduce(function (prev, cur) { return (prev += cur.cssText); }, '')
        : null;
    }
    catch (error) {
      return null;
    }
  }
  function extractOrigin(url) {
    var origin;
    if (url.indexOf('//') > -1) {
      origin = url
        .split('/')
        .slice(0, 3)
        .join('/');
    }
    else {
      origin = url.split('/')[0];
    }
    origin = origin.split('?')[0];
    return origin;
  }
  var URL_IN_CSS_REF = /url\((?:'([^']*)'|"([^"]*)"|([^)]*))\)/gm;
  var RELATIVE_PATH = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/).*/;
  var DATA_URI = /^(data:)([\w\/\+]+);(charset=[\w-]+|base64).*,(.*)/gi;
  function absoluteToStylesheet(cssText, href) {
    return cssText.replace(URL_IN_CSS_REF, function (_1, path1, path2, path3) {
      var filePath = path1 || path2 || path3;
      if (!RELATIVE_PATH.test(filePath)) {
        return "url('" + filePath + "')";
      }
      if (DATA_URI.test(filePath)) {
        return "url(" + filePath + ")";
      }
      if (filePath[0] === '/') {
        return "url('" + (extractOrigin(href) + filePath) + "')";
      }
      var stack = href.split('/');
      var parts = filePath.split('/');
      stack.pop();
      for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        if (part === '.') {
          continue;
        }
        else if (part === '..') {
          stack.pop();
        }
        else {
          stack.push(part);
        }
      }
      return "url('" + stack.join('/') + "')";
    });
  }
  function absoluteToDoc(doc, attributeValue) {
    var a = doc.createElement('a');
    a.href = attributeValue;
    return a.href;
  }
  function isSVGElement(el) {
    return el.tagName === 'svg' || el instanceof SVGElement;
  }
  var BLOCK_CLASS = 'rr-block';
  function serializeNode(n, doc) {
    switch (n.nodeType) {
      case n.DOCUMENT_NODE:
        return {
          type: NodeType.Document,
          childNodes: []
        };
      case n.DOCUMENT_TYPE_NODE:
        return {
          type: NodeType.DocumentType,
          name: n.name,
          publicId: n.publicId,
          systemId: n.systemId
        };
      case n.ELEMENT_NODE:
        var needBlock = n.classList.contains(BLOCK_CLASS);
        var tagName = n.tagName.toLowerCase();
        var attributes_1 = {};
        for (var _i = 0, _a = Array.from(n.attributes); _i < _a.length; _i++) {
          var _b = _a[_i], name = _b.name, value = _b.value;
          if (name === 'src' || name === 'href') {
            attributes_1[name] = absoluteToDoc(doc, value);
          }
          else if (name === 'style') {
            attributes_1[name] = absoluteToStylesheet(value, location.href);
          }
          else {
            attributes_1[name] = value;
          }
        }
        if (tagName === 'link') {
          var stylesheet = Array.from(doc.styleSheets).find(function (s) {
            return s.href === n.href;
          });
          var cssText = getCssRulesString(stylesheet);
          if (cssText) {
            attributes_1 = {
              _cssText: absoluteToStylesheet(cssText, stylesheet.href)
            };
          }
        }
        if (tagName === 'input' ||
          tagName === 'textarea' ||
          tagName === 'select') {
          var value = n.value;
          if (attributes_1.type !== 'radio' &&
            attributes_1.type !== 'checkbox' &&
            value) {
            attributes_1.value = value;
          }
          else if (n.checked) {
            attributes_1.checked = n.checked;
          }
        }
        if (tagName === 'option') {
          var selectValue = n.parentElement;
          if (attributes_1.value === selectValue.value) {
            attributes_1.selected = n.selected;
          }
        }
        if (needBlock) {
          var _c = n.getBoundingClientRect(), width = _c.width, height = _c.height;
          attributes_1.rr_width = width + "px";
          attributes_1.rr_height = height + "px";
        }
        return {
          type: NodeType.Element,
          tagName: tagName,
          attributes: attributes_1,
          childNodes: [],
          isSVG: isSVGElement(n) || undefined,
          needBlock: needBlock
        };
      case n.TEXT_NODE:
        var parentTagName = n.parentNode && n.parentNode.tagName;
        var textContent = n.textContent;
        var isStyle = parentTagName === 'STYLE' ? true : undefined;
        if (isStyle && textContent) {
          textContent = absoluteToStylesheet(textContent, location.href);
        }
        if (parentTagName === 'SCRIPT') {
          textContent = 'SCRIPT_PLACEHOLDER';
        }
        return {
          type: NodeType.Text,
          textContent: textContent || '',
          isStyle: isStyle
        };
      case n.CDATA_SECTION_NODE:
        return {
          type: NodeType.CDATA,
          textContent: ''
        };
      case n.COMMENT_NODE:
        return {
          type: NodeType.Comment,
          textContent: n.textContent || ''
        };
      default:
        return false;
    }
  }
  function serializeNodeWithId(n, doc, map, skipChild) {
    if (skipChild === void 0) { skipChild = false; }
    var _serializedNode = serializeNode(n, doc);
    if (!_serializedNode) {
      console.warn(n, 'not serialized');
      return null;
    }
    var serializedNode = Object.assign(_serializedNode, {
      id: genId()
    });
    n.__sn = serializedNode;
    map[serializedNode.id] = n;
    var recordChild = !skipChild;
    if (serializedNode.type === NodeType.Element) {
      recordChild = recordChild && !serializedNode.needBlock;
      delete serializedNode.needBlock;
    }
    if ((serializedNode.type === NodeType.Document ||
      serializedNode.type === NodeType.Element) &&
      recordChild) {
      for (var _i = 0, _a = Array.from(n.childNodes); _i < _a.length; _i++) {
        var childN = _a[_i];
        var serializedChildNode = serializeNodeWithId(childN, doc, map);
        if (serializedChildNode) {
          serializedNode.childNodes.push(serializedChildNode);
        }
      }
    }
    return serializedNode;
  }
  function snapshot(n) {
    resetId();
    var idNodeMap = {};
    return [serializeNodeWithId(n, n, idNodeMap), idNodeMap];
  }

  var tagMap = {
    script: 'noscript',
    altglyph: 'altGlyph',
    altglyphdef: 'altGlyphDef',
    altglyphitem: 'altGlyphItem',
    animatecolor: 'animateColor',
    animatemotion: 'animateMotion',
    animatetransform: 'animateTransform',
    clippath: 'clipPath',
    feblend: 'feBlend',
    fecolormatrix: 'feColorMatrix',
    fecomponenttransfer: 'feComponentTransfer',
    fecomposite: 'feComposite',
    feconvolvematrix: 'feConvolveMatrix',
    fediffuselighting: 'feDiffuseLighting',
    fedisplacementmap: 'feDisplacementMap',
    fedistantlight: 'feDistantLight',
    fedropshadow: 'feDropShadow',
    feflood: 'feFlood',
    fefunca: 'feFuncA',
    fefuncb: 'feFuncB',
    fefuncg: 'feFuncG',
    fefuncr: 'feFuncR',
    fegaussianblur: 'feGaussianBlur',
    feimage: 'feImage',
    femerge: 'feMerge',
    femergenode: 'feMergeNode',
    femorphology: 'feMorphology',
    feoffset: 'feOffset',
    fepointlight: 'fePointLight',
    fespecularlighting: 'feSpecularLighting',
    fespotlight: 'feSpotLight',
    fetile: 'feTile',
    feturbulence: 'feTurbulence',
    foreignobject: 'foreignObject',
    glyphref: 'glyphRef',
    lineargradient: 'linearGradient',
    radialgradient: 'radialGradient'
  };
  function getTagName(n) {
    var tagName = tagMap[n.tagName] ? tagMap[n.tagName] : n.tagName;
    if (tagName === 'link' && n.attributes._cssText) {
      tagName = 'style';
    }
    return tagName;
  }
  var CSS_SELECTOR = /([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/g;
  var HOVER_SELECTOR = /([^\\]):hover/g;
  function addHoverClass(cssText) {
    return cssText.replace(CSS_SELECTOR, function (match, p1, p2) {
      if (HOVER_SELECTOR.test(p1)) {
        var newSelector = p1.replace(HOVER_SELECTOR, '$1.\\:hover');
        return p1.replace(/\s*$/, '') + ", " + newSelector.replace(/^\s*/, '') + p2;
      }
      else {
        return match;
      }
    });
  }
  function buildNode(n, doc) {
    switch (n.type) {
      case NodeType.Document:
        return doc.implementation.createDocument(null, '', null);
      case NodeType.DocumentType:
        return doc.implementation.createDocumentType(n.name, n.publicId, n.systemId);
      case NodeType.Element:
        var tagName = getTagName(n);
        var node = void 0;
        if (n.isSVG) {
          node = doc.createElementNS('http://www.w3.org/2000/svg', tagName);
        }
        else {
          node = doc.createElement(tagName);
        }
        for (var name in n.attributes) {
          if (n.attributes.hasOwnProperty(name) && !name.startsWith('rr_')) {
            var value = n.attributes[name];
            value = typeof value === 'boolean' ? '' : value;
            var isTextarea = tagName === 'textarea' && name === 'value';
            var isRemoteCss = tagName === 'style' && name === '_cssText';
            if (isRemoteCss) {
              value = addHoverClass(value);
            }
            if (isTextarea || isRemoteCss) {
              var child = doc.createTextNode(value);
              node.appendChild(child);
              continue;
            }
            if (tagName === 'iframe' && name === 'src') {
              continue;
            }
            try {
              node.setAttribute(name, value);
            }
            catch (error) {
            }
          }
          else {
            if (n.attributes.rr_width) {
              node.style.width = n.attributes.rr_width;
            }
            if (n.attributes.rr_height) {
              node.style.height = n.attributes
                .rr_height;
            }
          }
        }
        return node;
      case NodeType.Text:
        return doc.createTextNode(n.isStyle ? addHoverClass(n.textContent) : n.textContent);
      case NodeType.CDATA:
        return doc.createCDATASection(n.textContent);
      case NodeType.Comment:
        return doc.createComment(n.textContent);
      default:
        return null;
    }
  }
  function buildNodeWithSN(n, doc, map, skipChild) {
    if (skipChild === void 0) { skipChild = false; }
    var node = buildNode(n, doc);
    if (!node) {
      return null;
    }
    if (n.type === NodeType.Document) {
      doc.close();
      doc.open();
      node = doc;
    }
    node.__sn = n;
    map[n.id] = node;
    if ((n.type === NodeType.Document || n.type === NodeType.Element) &&
      !skipChild) {
      for (var _i = 0, _a = n.childNodes; _i < _a.length; _i++) {
        var childN = _a[_i];
        var childNode = buildNodeWithSN(childN, doc, map);
        if (!childNode) {
          console.warn('Failed to rebuild', childN);
        }
        else {
          node.appendChild(childNode);
        }
      }
    }
    return node;
  }
  function rebuild(n, doc) {
    var idNodeMap = {};
    return [buildNodeWithSN(n, doc, idNodeMap), idNodeMap];
  }

  function on(type, fn, target) {
    if (target === void 0) { target = document; }
    var options = { capture: true, passive: true };
    target.addEventListener(type, fn, options);
    return function () { return target.removeEventListener(type, fn, options); };
  }
  var mirror = {
    map: {},
    getId: function (n) {
      if (!n.__sn) {
        return -1;
      }
      return n.__sn.id;
    },
    getNode: function (id) {
      return mirror.map[id] || null;
    },
    removeNodeFromMap: function (n) {
      var id = n.__sn && n.__sn.id;
      delete mirror.map[id];
      if (n.childNodes) {
        n.childNodes.forEach(function (child) {
          return mirror.removeNodeFromMap(child);
        });
      }
    },
    has: function (id) {
      return mirror.map.hasOwnProperty(id);
    }
  };
  function throttle(func, wait, options) {
    if (options === void 0) { options = {}; }
    var timeout = null;
    var previous = 0;
    return function () {
      var now = Date.now();
      if (!previous && options.leading === false) {
        previous = now;
      }
      var remaining = wait - (now - previous);
      var context = this;
      var args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          window.clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        func.apply(context, args);
      }
      else if (!timeout && options.trailing !== false) {
        timeout = window.setTimeout(function () {
          previous = options.leading === false ? 0 : Date.now();
          timeout = null;
          func.apply(context, args);
        }, remaining);
      }
    };
  }
  function hookSetter(target, key, d) {
    var original = Object.getOwnPropertyDescriptor(target, key);
    Object.defineProperty(target, key, {
      set: function (value) {
        var _this = this;
        setTimeout(function () {
          d.set.call(_this, value);
        }, 0);
        if (original && original.set) {
          original.set.call(this, value);
        }
      }
    });
    return function () { return hookSetter(target, key, original || {}); };
  }
  function getWindowHeight() {
    return (window.innerHeight ||
      (document.documentElement && document.documentElement.clientHeight) ||
      (document.body && document.body.clientHeight));
  }
  function getWindowWidth() {
    return (window.innerWidth ||
      (document.documentElement && document.documentElement.clientWidth) ||
      (document.body && document.body.clientWidth));
  }
  var BLOCK_CLASS$1 = 'rr-block';
  function isBlocked(node) {
    if (!node) {
      return false;
    }
    if (node.nodeType === node.ELEMENT_NODE) {
      return (node.classList.contains(BLOCK_CLASS$1) ||
        isBlocked(node.parentNode));
    }
    return isBlocked(node.parentNode);
  }

  var EventType;
  (function (EventType) {
    EventType[EventType["DomContentLoaded"] = 0] = "DomContentLoaded";
    EventType[EventType["Load"] = 1] = "Load";
    EventType[EventType["FullSnapshot"] = 2] = "FullSnapshot";
    EventType[EventType["IncrementalSnapshot"] = 3] = "IncrementalSnapshot";
    EventType[EventType["Meta"] = 4] = "Meta";
  })(EventType || (EventType = {}));
  var IncrementalSource;
  (function (IncrementalSource) {
    IncrementalSource[IncrementalSource["Mutation"] = 0] = "Mutation";
    IncrementalSource[IncrementalSource["MouseMove"] = 1] = "MouseMove";
    IncrementalSource[IncrementalSource["MouseInteraction"] = 2] = "MouseInteraction";
    IncrementalSource[IncrementalSource["Scroll"] = 3] = "Scroll";
    IncrementalSource[IncrementalSource["ViewportResize"] = 4] = "ViewportResize";
    IncrementalSource[IncrementalSource["Input"] = 5] = "Input";
  })(IncrementalSource || (IncrementalSource = {}));
  var MouseInteractions;
  (function (MouseInteractions) {
    MouseInteractions[MouseInteractions["MouseUp"] = 0] = "MouseUp";
    MouseInteractions[MouseInteractions["MouseDown"] = 1] = "MouseDown";
    MouseInteractions[MouseInteractions["Click"] = 2] = "Click";
    MouseInteractions[MouseInteractions["ContextMenu"] = 3] = "ContextMenu";
    MouseInteractions[MouseInteractions["DblClick"] = 4] = "DblClick";
    MouseInteractions[MouseInteractions["Focus"] = 5] = "Focus";
    MouseInteractions[MouseInteractions["Blur"] = 6] = "Blur";
    MouseInteractions[MouseInteractions["TouchStart"] = 7] = "TouchStart";
    MouseInteractions[MouseInteractions["TouchMove"] = 8] = "TouchMove";
    MouseInteractions[MouseInteractions["TouchEnd"] = 9] = "TouchEnd";
  })(MouseInteractions || (MouseInteractions = {}));

  function initMutationObserver(cb) {
    var observer = new MutationObserver(function (mutations) {
      var texts = [];
      var attributes = [];
      var removes = [];
      var adds = [];
      var dropped = [];
      var addsSet = new Set();
      var genAdds = function (n) {
        if (isBlocked(n)) {
          return;
        }
        addsSet.add(n);
        n.childNodes.forEach(function (childN) { return genAdds(childN); });
      };
      mutations.forEach(function (mutation) {
        var type = mutation.type, target = mutation.target, oldValue = mutation.oldValue, addedNodes = mutation.addedNodes, removedNodes = mutation.removedNodes, attributeName = mutation.attributeName;
        switch (type) {
          case 'characterData': {
            var value = target.textContent;
            if (!isBlocked(target) && value !== oldValue) {
              texts.push({
                value: value,
                node: target
              });
            }
            break;
          }
          case 'attributes': {
            var value = target.getAttribute(attributeName);
            if (isBlocked(target) || value === oldValue) {
              return;
            }
            var item = attributes.find(function (a) { return a.node === target; });
            if (!item) {
              item = {
                node: target,
                attributes: {}
              };
              attributes.push(item);
            }
            item.attributes[attributeName] = value;
            break;
          }
          case 'childList': {
            addedNodes.forEach(function (n) { return genAdds(n); });
            removedNodes.forEach(function (n) {
              var nodeId = mirror.getId(n);
              var parentId = mirror.getId(target);
              if (isBlocked(n)) {
                return;
              }
              if (addsSet.has(n)) {
                addsSet["delete"](n);
                dropped.push(n);
              }
              else if (addsSet.has(target) && nodeId === -1);
              else if (!mirror.has(parentId));
              else {
                removes.push({
                  parentId: parentId,
                  id: nodeId
                });
              }
              mirror.removeNodeFromMap(n);
            });
            break;
          }
          default:
            break;
        }
      });
      var isDropped = function (n) {
        var parentNode = n.parentNode;
        if (!parentNode) {
          return false;
        }
        if (dropped.some(function (d) { return d === parentNode; })) {
          return true;
        }
        return isDropped(parentNode);
      };
      var isRemoved = function (n) {
        var parentNode = n.parentNode;
        if (!parentNode) {
          return false;
        }
        var parentId = mirror.getId(parentNode);
        if (removes.some(function (r) { return r.id === parentId; })) {
          return true;
        }
        return isRemoved(parentNode);
      };
      Array.from(addsSet).forEach(function (n) {
        if (!isDropped(n) && !isRemoved(n)) {
          adds.push({
            parentId: mirror.getId(n.parentNode),
            previousId: !n.previousSibling
              ? n.previousSibling
              : mirror.getId(n.previousSibling),
            nextId: !n.nextSibling
              ? n.nextSibling
              : mirror.getId(n.nextSibling),
            node: serializeNodeWithId(n, document, mirror.map, true)
          });
        }
        else {
          dropped.push(n);
        }
      });
      var payload = {
        texts: texts
          .map(function (text) {
            return ({
              id: mirror.getId(text.node),
              value: text.value
            });
          })
          .filter(function (text) { return mirror.has(text.id); }),
        attributes: attributes
          .map(function (attribute) {
            return ({
              id: mirror.getId(attribute.node),
              attributes: attribute.attributes
            });
          })
          .filter(function (attribute) { return mirror.has(attribute.id); }),
        removes: removes,
        adds: adds
      };
      if (!payload.texts.length &&
        !payload.attributes.length &&
        !payload.removes.length &&
        !payload.adds.length) {
        return;
      }
      cb(payload);
    });
    observer.observe(document, {
      attributes: true,
      attributeOldValue: true,
      characterData: true,
      characterDataOldValue: true,
      childList: true,
      subtree: true
    });
    return observer;
  }
  function initMousemoveObserver(cb) {
    var positions = [];
    var timeBaseline;
    var wrappedCb = throttle(function () {
      var totalOffset = Date.now() - timeBaseline;
      cb(positions.map(function (p) {
        p.timeOffset -= totalOffset;
        return p;
      }));
      positions = [];
      timeBaseline = null;
    }, 500);
    var updatePosition = throttle(function (evt) {
      var clientX = evt.clientX, clientY = evt.clientY, target = evt.target;
      if (!timeBaseline) {
        timeBaseline = Date.now();
      }
      positions.push({
        x: clientX,
        y: clientY,
        id: mirror.getId(target),
        timeOffset: Date.now() - timeBaseline
      });
      wrappedCb();
    }, 20, {
        trailing: false
      });
    return on('mousemove', updatePosition);
  }
  function initMouseInteractionObserver(cb) {
    var handlers = [];
    var getHandler = function (eventKey) {
      return function (event) {
        if (isBlocked(event.target)) {
          return;
        }
        var id = mirror.getId(event.target);
        var clientX = event.clientX, clientY = event.clientY;
        cb({
          type: MouseInteractions[eventKey],
          id: id,
          x: clientX,
          y: clientY
        });
      };
    };
    Object.keys(MouseInteractions)
      .filter(function (key) { return Number.isNaN(Number(key)); })
      .forEach(function (eventKey) {
        var eventName = eventKey.toLowerCase();
        var handler = getHandler(eventKey);
        handlers.push(on(eventName, handler));
      });
    return function () {
      handlers.forEach(function (h) { return h(); });
    };
  }
  function initScrollObserver(cb) {
    var updatePosition = throttle(function (evt) {
      if (!evt.target || isBlocked(evt.target)) {
        return;
      }
      var id = mirror.getId(evt.target);
      if (evt.target === document) {
        var scrollEl = (document.scrollingElement || document.documentElement);
        cb({
          id: id,
          x: scrollEl.scrollLeft,
          y: scrollEl.scrollTop
        });
      }
      else {
        cb({
          id: id,
          x: evt.target.scrollLeft,
          y: evt.target.scrollTop
        });
      }
    }, 100);
    return on('scroll', updatePosition);
  }
  function initViewportResizeObserver(cb) {
    var updateDimension = throttle(function () {
      var height = getWindowHeight();
      var width = getWindowWidth();
      cb({
        width: Number(width),
        height: Number(height)
      });
    }, 200);
    return on('resize', updateDimension, window);
  }
  var INPUT_TAGS = ['INPUT', 'TEXTAREA', 'SELECT'];
  var HOOK_PROPERTIES = [
    [HTMLInputElement.prototype, 'value'],
    [HTMLInputElement.prototype, 'checked'],
    [HTMLSelectElement.prototype, 'value'],
    [HTMLTextAreaElement.prototype, 'value'],
  ];
  var IGNORE_CLASS = 'rr-ignore';
  var lastInputValueMap = new WeakMap();
  function initInputObserver(cb) {
    function eventHandler(event) {
      var target = event.target;
      if (!target ||
        !target.tagName ||
        INPUT_TAGS.indexOf(target.tagName) < 0 ||
        isBlocked(target)) {
        return;
      }
      var type = target.type;
      if (target.classList.contains(IGNORE_CLASS)) {
        return;
      }
      var text = target.value;
      var isChecked = false;
      if (type === 'radio' || type === 'checkbox') {
        isChecked = target.checked;
      }
      cbWithDedup(target, { text: text, isChecked: isChecked });
      var name = target.name;
      if (type === 'radio' && name && isChecked) {
        document
          .querySelectorAll("input[type=\"radio\"][name=\"" + name + "\"]")
          .forEach(function (el) {
            if (el !== target) {
              cbWithDedup(el, {
                text: el.value,
                isChecked: !isChecked
              });
            }
          });
      }
    }
    function cbWithDedup(target, v) {
      var lastInputValue = lastInputValueMap.get(target);
      if (!lastInputValue ||
        lastInputValue.text !== v.text ||
        lastInputValue.isChecked !== v.isChecked) {
        lastInputValueMap.set(target, v);
        var id = mirror.getId(target);
        cb(__assign({}, v, { id: id }));
      }
    }
    var handlers = [
      'input',
      'change',
    ].map(function (eventName) { return on(eventName, eventHandler); });
    var propertyDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    if (propertyDescriptor && propertyDescriptor.set) {
      handlers.push.apply(handlers, HOOK_PROPERTIES.map(function (p) {
        return hookSetter(p[0], p[1], {
          set: function () {
            eventHandler({ target: this });
          }
        });
      }));
    }
    return function () {
      handlers.forEach(function (h) { return h(); });
    };
  }
  function initObservers(o) {
    var mutationObserver = initMutationObserver(o.mutationCb);
    var mousemoveHandler = initMousemoveObserver(o.mousemoveCb);
    var mouseInteractionHandler = initMouseInteractionObserver(o.mouseInteractionCb);
    var scrollHandler = initScrollObserver(o.scrollCb);
    var viewportResizeHandler = initViewportResizeObserver(o.viewportResizeCb);
    var inputHandler = initInputObserver(o.inputCb);
    return function () {
      mutationObserver.disconnect();
      mousemoveHandler();
      mouseInteractionHandler();
      scrollHandler();
      viewportResizeHandler();
      inputHandler();
    };
  }

  function wrapEvent(e) {
    return __assign({}, e, { timestamp: Date.now() });
  }
  function record(options) {
    if (options === void 0) { options = {}; }
    var emit = options.emit, checkoutEveryNms = options.checkoutEveryNms, checkoutEveryNth = options.checkoutEveryNth;
    if (!emit) {
      throw new Error('emit function is required');
    }
    var lastFullSnapshotEvent;
    var incrementalSnapshotCount = 0;
    var wrappedEmit = function (e, isCheckout) {
      emit(e, isCheckout);
      if (e.type === EventType.FullSnapshot) {
        lastFullSnapshotEvent = e;
        incrementalSnapshotCount = 0;
      }
      else if (e.type === EventType.IncrementalSnapshot) {
        incrementalSnapshotCount++;
        var exceedCount = checkoutEveryNth && incrementalSnapshotCount >= checkoutEveryNth;
        var exceedTime = checkoutEveryNms &&
          e.timestamp - lastFullSnapshotEvent.timestamp > checkoutEveryNms;
        if (exceedCount || exceedTime) {
          takeFullSnapshot(true);
        }
      }
    };
    function takeFullSnapshot(isCheckout) {
      if (isCheckout === void 0) { isCheckout = false; }
      wrappedEmit(wrapEvent({
        type: EventType.Meta,
        data: {
          href: window.location.href,
          width: getWindowWidth(),
          height: getWindowHeight()
        }
      }), isCheckout);
      var _a = snapshot(document), node = _a[0], idNodeMap = _a[1];
      if (!node) {
        return console.warn('Failed to snapshot the document');
      }
      mirror.map = idNodeMap;
      wrappedEmit(wrapEvent({
        type: EventType.FullSnapshot,
        data: {
          node: node,
          initialOffset: {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
          }
        }
      }));
    }
    try {
      var handlers_1 = [];
      handlers_1.push(on('DOMContentLoaded', function () {
        wrappedEmit(wrapEvent({
          type: EventType.DomContentLoaded,
          data: {}
        }));
      }));
      var init_1 = function () {
        takeFullSnapshot();
        handlers_1.push(initObservers({
          mutationCb: function (m) {
            return wrappedEmit(wrapEvent({
              type: EventType.IncrementalSnapshot,
              data: __assign({ source: IncrementalSource.Mutation }, m)
            }));
          },
          mousemoveCb: function (positions) {
            return wrappedEmit(wrapEvent({
              type: EventType.IncrementalSnapshot,
              data: {
                source: IncrementalSource.MouseMove,
                positions: positions
              }
            }));
          },
          mouseInteractionCb: function (d) {
            return wrappedEmit(wrapEvent({
              type: EventType.IncrementalSnapshot,
              data: __assign({ source: IncrementalSource.MouseInteraction }, d)
            }));
          },
          scrollCb: function (p) {
            return wrappedEmit(wrapEvent({
              type: EventType.IncrementalSnapshot,
              data: __assign({ source: IncrementalSource.Scroll }, p)
            }));
          },
          viewportResizeCb: function (d) {
            return wrappedEmit(wrapEvent({
              type: EventType.IncrementalSnapshot,
              data: __assign({ source: IncrementalSource.ViewportResize }, d)
            }));
          },
          inputCb: function (v) {
            return wrappedEmit(wrapEvent({
              type: EventType.IncrementalSnapshot,
              data: __assign({ source: IncrementalSource.Input }, v)
            }));
          }
        }));
      };
      if (document.readyState === 'interactive' ||
        document.readyState === 'complete') {
        init_1();
      }
      else {
        handlers_1.push(on('load', function () {
          wrappedEmit(wrapEvent({
            type: EventType.Load,
            data: {}
          }));
          init_1();
        }, window));
      }
      return function () {
        handlers_1.forEach(function (h) { return h(); });
      };
    }
    catch (error) {
      console.warn(error);
    }
  }

  //      
  // An event handler can take an optional event argument
  // and should not return a value



  // An array of all currently registered event handlers for a type


  // A map of event types and their corresponding event handlers.





  /** Mitt: Tiny (~200b) functional event emitter / pubsub.
   *  @name mitt
   *  @returns {Mitt}
   */
  function mitt(all) {
    all = all || Object.create(null);

    return {
      /**
       * Register an event handler for the given type.
       *
       * @param  {String} type	Type of event to listen for, or `"*"` for all events
       * @param  {Function} handler Function to call in response to given event
       * @memberOf mitt
       */
      on: function on(type, handler) {
        (all[type] || (all[type] = [])).push(handler);
      },

      /**
       * Remove an event handler for the given type.
       *
       * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
       * @param  {Function} handler Handler function to remove
       * @memberOf mitt
       */
      off: function off(type, handler) {
        if (all[type]) {
          all[type].splice(all[type].indexOf(handler) >>> 0, 1);
        }
      },

      /**
       * Invoke all handlers for the given type.
       * If present, `"*"` handlers are invoked after type-matched handlers.
       *
       * @param {String} type  The event type to invoke
       * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
       * @memberOf mitt
       */
      emit: function emit(type, evt) {
        (all[type] || []).slice().map(function (handler) { handler(evt); });
        (all['*'] || []).slice().map(function (handler) { handler(type, evt); });
      }
    };
  }

  var mittProxy = /*#__PURE__*/Object.freeze({
    default: mitt
  });

  function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var smoothscroll = createCommonjsModule(function (module, exports) {
    /* smoothscroll v0.4.0 - 2018 - Dustan Kasten, Jeremias Menichelli - MIT License */
    (function () {

      // polyfill
      function polyfill() {
        // aliases
        var w = window;
        var d = document;

        // return if scroll behavior is supported and polyfill is not forced
        if (
          'scrollBehavior' in d.documentElement.style &&
          w.__forceSmoothScrollPolyfill__ !== true
        ) {
          return;
        }

        // globals
        var Element = w.HTMLElement || w.Element;
        var SCROLL_TIME = 468;

        // object gathering original scroll methods
        var original = {
          scroll: w.scroll || w.scrollTo,
          scrollBy: w.scrollBy,
          elementScroll: Element.prototype.scroll || scrollElement,
          scrollIntoView: Element.prototype.scrollIntoView
        };

        // define timing method
        var now =
          w.performance && w.performance.now
            ? w.performance.now.bind(w.performance)
            : Date.now;

        /**
         * indicates if a the current browser is made by Microsoft
         * @method isMicrosoftBrowser
         * @param {String} userAgent
         * @returns {Boolean}
         */
        function isMicrosoftBrowser(userAgent) {
          var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

          return new RegExp(userAgentPatterns.join('|')).test(userAgent);
        }

        /*
         * IE has rounding bug rounding down clientHeight and clientWidth and
         * rounding up scrollHeight and scrollWidth causing false positives
         * on hasScrollableSpace
         */
        var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

        /**
         * changes scroll position inside an element
         * @method scrollElement
         * @param {Number} x
         * @param {Number} y
         * @returns {undefined}
         */
        function scrollElement(x, y) {
          this.scrollLeft = x;
          this.scrollTop = y;
        }

        /**
         * returns result of applying ease math function to a number
         * @method ease
         * @param {Number} k
         * @returns {Number}
         */
        function ease(k) {
          return 0.5 * (1 - Math.cos(Math.PI * k));
        }

        /**
         * indicates if a smooth behavior should be applied
         * @method shouldBailOut
         * @param {Number|Object} firstArg
         * @returns {Boolean}
         */
        function shouldBailOut(firstArg) {
          if (
            firstArg === null ||
            typeof firstArg !== 'object' ||
            firstArg.behavior === undefined ||
            firstArg.behavior === 'auto' ||
            firstArg.behavior === 'instant'
          ) {
            // first argument is not an object/null
            // or behavior is auto, instant or undefined
            return true;
          }

          if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
            // first argument is an object and behavior is smooth
            return false;
          }

          // throw error when behavior is not supported
          throw new TypeError(
            'behavior member of ScrollOptions ' +
            firstArg.behavior +
            ' is not a valid value for enumeration ScrollBehavior.'
          );
        }

        /**
         * indicates if an element has scrollable space in the provided axis
         * @method hasScrollableSpace
         * @param {Node} el
         * @param {String} axis
         * @returns {Boolean}
         */
        function hasScrollableSpace(el, axis) {
          if (axis === 'Y') {
            return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
          }

          if (axis === 'X') {
            return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
          }
        }

        /**
         * indicates if an element has a scrollable overflow property in the axis
         * @method canOverflow
         * @param {Node} el
         * @param {String} axis
         * @returns {Boolean}
         */
        function canOverflow(el, axis) {
          var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

          return overflowValue === 'auto' || overflowValue === 'scroll';
        }

        /**
         * indicates if an element can be scrolled in either axis
         * @method isScrollable
         * @param {Node} el
         * @param {String} axis
         * @returns {Boolean}
         */
        function isScrollable(el) {
          var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
          var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

          return isScrollableY || isScrollableX;
        }

        /**
         * finds scrollable parent of an element
         * @method findScrollableParent
         * @param {Node} el
         * @returns {Node} el
         */
        function findScrollableParent(el) {
          var isBody;

          do {
            el = el.parentNode;

            isBody = el === d.body;
          } while (isBody === false && isScrollable(el) === false);

          isBody = null;

          return el;
        }

        /**
         * self invoked function that, given a context, steps through scrolling
         * @method step
         * @param {Object} context
         * @returns {undefined}
         */
        function step(context) {
          var time = now();
          var value;
          var currentX;
          var currentY;
          var elapsed = (time - context.startTime) / SCROLL_TIME;

          // avoid elapsed times higher than one
          elapsed = elapsed > 1 ? 1 : elapsed;

          // apply easing to elapsed time
          value = ease(elapsed);

          currentX = context.startX + (context.x - context.startX) * value;
          currentY = context.startY + (context.y - context.startY) * value;

          context.method.call(context.scrollable, currentX, currentY);

          // scroll more if we have not reached our destination
          if (currentX !== context.x || currentY !== context.y) {
            w.requestAnimationFrame(step.bind(w, context));
          }
        }

        /**
         * scrolls window or element with a smooth behavior
         * @method smoothScroll
         * @param {Object|Node} el
         * @param {Number} x
         * @param {Number} y
         * @returns {undefined}
         */
        function smoothScroll(el, x, y) {
          var scrollable;
          var startX;
          var startY;
          var method;
          var startTime = now();

          // define scroll context
          if (el === d.body) {
            scrollable = w;
            startX = w.scrollX || w.pageXOffset;
            startY = w.scrollY || w.pageYOffset;
            method = original.scroll;
          } else {
            scrollable = el;
            startX = el.scrollLeft;
            startY = el.scrollTop;
            method = scrollElement;
          }

          // scroll looping over a frame
          step({
            scrollable: scrollable,
            method: method,
            startTime: startTime,
            startX: startX,
            startY: startY,
            x: x,
            y: y
          });
        }

        // ORIGINAL METHODS OVERRIDES
        // w.scroll and w.scrollTo
        w.scroll = w.scrollTo = function () {
          // avoid action when no arguments are passed
          if (arguments[0] === undefined) {
            return;
          }

          // avoid smooth behavior if not required
          if (shouldBailOut(arguments[0]) === true) {
            original.scroll.call(
              w,
              arguments[0].left !== undefined
                ? arguments[0].left
                : typeof arguments[0] !== 'object'
                  ? arguments[0]
                  : w.scrollX || w.pageXOffset,
              // use top prop, second argument if present or fallback to scrollY
              arguments[0].top !== undefined
                ? arguments[0].top
                : arguments[1] !== undefined
                  ? arguments[1]
                  : w.scrollY || w.pageYOffset
            );

            return;
          }

          // LET THE SMOOTHNESS BEGIN!
          smoothScroll.call(
            w,
            d.body,
            arguments[0].left !== undefined
              ? ~~arguments[0].left
              : w.scrollX || w.pageXOffset,
            arguments[0].top !== undefined
              ? ~~arguments[0].top
              : w.scrollY || w.pageYOffset
          );
        };

        // w.scrollBy
        w.scrollBy = function () {
          // avoid action when no arguments are passed
          if (arguments[0] === undefined) {
            return;
          }

          // avoid smooth behavior if not required
          if (shouldBailOut(arguments[0])) {
            original.scrollBy.call(
              w,
              arguments[0].left !== undefined
                ? arguments[0].left
                : typeof arguments[0] !== 'object' ? arguments[0] : 0,
              arguments[0].top !== undefined
                ? arguments[0].top
                : arguments[1] !== undefined ? arguments[1] : 0
            );

            return;
          }

          // LET THE SMOOTHNESS BEGIN!
          smoothScroll.call(
            w,
            d.body,
            ~~arguments[0].left + (w.scrollX || w.pageXOffset),
            ~~arguments[0].top + (w.scrollY || w.pageYOffset)
          );
        };

        // Element.prototype.scroll and Element.prototype.scrollTo
        Element.prototype.scroll = Element.prototype.scrollTo = function () {
          // avoid action when no arguments are passed
          if (arguments[0] === undefined) {
            return;
          }

          // avoid smooth behavior if not required
          if (shouldBailOut(arguments[0]) === true) {
            // if one number is passed, throw error to match Firefox implementation
            if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
              throw new SyntaxError('Value could not be converted');
            }

            original.elementScroll.call(
              this,
              // use left prop, first number argument or fallback to scrollLeft
              arguments[0].left !== undefined
                ? ~~arguments[0].left
                : typeof arguments[0] !== 'object' ? ~~arguments[0] : this.scrollLeft,
              // use top prop, second argument or fallback to scrollTop
              arguments[0].top !== undefined
                ? ~~arguments[0].top
                : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop
            );

            return;
          }

          var left = arguments[0].left;
          var top = arguments[0].top;

          // LET THE SMOOTHNESS BEGIN!
          smoothScroll.call(
            this,
            this,
            typeof left === 'undefined' ? this.scrollLeft : ~~left,
            typeof top === 'undefined' ? this.scrollTop : ~~top
          );
        };

        // Element.prototype.scrollBy
        Element.prototype.scrollBy = function () {
          // avoid action when no arguments are passed
          if (arguments[0] === undefined) {
            return;
          }

          // avoid smooth behavior if not required
          if (shouldBailOut(arguments[0]) === true) {
            original.elementScroll.call(
              this,
              arguments[0].left !== undefined
                ? ~~arguments[0].left + this.scrollLeft
                : ~~arguments[0] + this.scrollLeft,
              arguments[0].top !== undefined
                ? ~~arguments[0].top + this.scrollTop
                : ~~arguments[1] + this.scrollTop
            );

            return;
          }

          this.scroll({
            left: ~~arguments[0].left + this.scrollLeft,
            top: ~~arguments[0].top + this.scrollTop,
            behavior: arguments[0].behavior
          });
        };

        // Element.prototype.scrollIntoView
        Element.prototype.scrollIntoView = function () {
          // avoid smooth behavior if not required
          if (shouldBailOut(arguments[0]) === true) {
            original.scrollIntoView.call(
              this,
              arguments[0] === undefined ? true : arguments[0]
            );

            return;
          }

          // LET THE SMOOTHNESS BEGIN!
          var scrollableParent = findScrollableParent(this);
          var parentRects = scrollableParent.getBoundingClientRect();
          var clientRects = this.getBoundingClientRect();

          if (scrollableParent !== d.body) {
            // reveal element inside parent
            smoothScroll.call(
              this,
              scrollableParent,
              scrollableParent.scrollLeft + clientRects.left - parentRects.left,
              scrollableParent.scrollTop + clientRects.top - parentRects.top
            );

            // reveal parent in viewport unless is fixed
            if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
              w.scrollBy({
                left: parentRects.left,
                top: parentRects.top,
                behavior: 'smooth'
              });
            }
          } else {
            // reveal element in viewport
            w.scrollBy({
              left: clientRects.left,
              top: clientRects.top,
              behavior: 'smooth'
            });
          }
        };
      }

      {
        // commonjs
        module.exports = { polyfill: polyfill };
      }

    }());
  });
  var smoothscroll_1 = smoothscroll.polyfill;

  var Timer = (function () {
    function Timer(config, actions) {
      if (actions === void 0) { actions = []; }
      this.timeOffset = 0;
      this.actions = actions;
      this.config = config;
    }
    Timer.prototype.addAction = function (action) {
      var index = this.findActionIndex(action);
      this.actions.splice(index, 0, action);
    };
    Timer.prototype.addActions = function (actions) {
      var _a;
      (_a = this.actions).push.apply(_a, actions);
    };
    Timer.prototype.start = function () {
      this.actions.sort(function (a1, a2) { return a1.delay - a2.delay; });
      this.timeOffset = 0;
      var lastTimestamp = performance.now();
      var _a = this, actions = _a.actions, config = _a.config;
      var self = this;
      function check(time) {
        self.timeOffset += (time - lastTimestamp) * config.speed;
        lastTimestamp = time;
        while (actions.length) {
          var action = actions[0];
          if (self.timeOffset >= action.delay) {
            actions.shift();
            action.doAction();
          }
          else {
            break;
          }
        }
        if (actions.length > 0) {
          self.raf = requestAnimationFrame(check);
        }
      }
      this.raf = requestAnimationFrame(check);
    };
    Timer.prototype.clear = function () {
      if (this.raf) {
        cancelAnimationFrame(this.raf);
      }
      this.actions.length = 0;
    };
    Timer.prototype.findActionIndex = function (action) {
      var start = 0;
      var end = this.actions.length - 1;
      while (start <= end) {
        var mid = Math.floor((start + end) / 2);
        if (this.actions[mid].delay < action.delay) {
          start = mid + 1;
        }
        else if (this.actions[mid].delay > action.delay) {
          end = mid - 1;
        }
        else {
          return mid;
        }
      }
      return start;
    };
    return Timer;
  }());

  var rules = [
    'iframe, .rr-block { background: #ccc }',
    'noscript { display: none !important; }',
  ];

  var SKIP_TIME_THRESHOLD = 10 * 1000;
  var SKIP_TIME_INTERVAL = 5 * 1000;
  smoothscroll_1();
  var mitt$1 = mitt || mittProxy;
  var REPLAY_CONSOLE_PREFIX = '[replayer]';
  var Replayer = (function () {
    function Replayer(events, config) {
      this.events = [];
      this.emitter = mitt$1();
      this.baselineTime = 0;
      this.noramlSpeed = -1;
      this.missingNodeRetryMap = {};
      if (events.length < 2) {
        throw new Error('Replayer need at least 2 events.');
      }
      this.events = events;
      this.handleResize = this.handleResize.bind(this);
      var defaultConfig = {
        speed: 1,
        root: document.body,
        loadTimeout: 0,
        skipInactive: false,
        showWarning: true
      };
      this.config = Object.assign({}, defaultConfig, config);
      this.timer = new Timer(this.config);
      this.setupDom();
      this.emitter.on('resize', this.handleResize);
    }
    Replayer.prototype.on = function (event, handler) {
      this.emitter.on(event, handler);
    };
    Replayer.prototype.setConfig = function (config) {
      var _this = this;
      Object.keys(config).forEach(function (key) {
        _this.config[key] = config[key];
      });
      if (!this.config.skipInactive) {
        this.noramlSpeed = -1;
      }
    };
    Replayer.prototype.getMetaData = function () {
      var firstEvent = this.events[0];
      var lastEvent = this.events[this.events.length - 1];
      return {
        totalTime: lastEvent.timestamp - firstEvent.timestamp
      };
    };
    Replayer.prototype.getTimeOffset = function () {
      return this.baselineTime - this.events[0].timestamp;
    };
    Replayer.prototype.play = function (timeOffset) {
      if (timeOffset === void 0) { timeOffset = 0; }
      this.timer.clear();
      this.baselineTime = this.events[0].timestamp + timeOffset;
      var actions = new Array();
      for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
        var event = _a[_i];
        var isSync = event.timestamp < this.baselineTime;
        var castFn = this.getCastFn(event, isSync);
        if (isSync) {
          castFn();
        }
        else {
          actions.push({ doAction: castFn, delay: this.getDelay(event) });
        }
      }
      this.timer.addActions(actions);
      this.timer.start();
    };
    Replayer.prototype.pause = function () {
      this.timer.clear();
      this.emitter.emit('pause');
    };
    Replayer.prototype.resume = function (timeOffset) {
      if (timeOffset === void 0) { timeOffset = 0; }
      this.timer.clear();
      this.baselineTime = this.events[0].timestamp + timeOffset;
      var actions = new Array();
      for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
        var event = _a[_i];
        if (event.timestamp <= this.lastPlayedEvent.timestamp ||
          event === this.lastPlayedEvent) {
          continue;
        }
        var castFn = this.getCastFn(event);
        actions.push({
          doAction: castFn,
          delay: this.getDelay(event)
        });
      }
      this.timer.addActions(actions);
      this.timer.start();
      this.emitter.emit('resume');
    };
    Replayer.prototype.setupDom = function () {
      this.wrapper = document.createElement('div');
      this.wrapper.classList.add('replayer-wrapper');
      this.config.root.appendChild(this.wrapper);
      this.mouse = document.createElement('div');
      this.mouse.classList.add('replayer-mouse');
      this.wrapper.appendChild(this.mouse);
      this.iframe = document.createElement('iframe');
      this.iframe.setAttribute('sandbox', 'allow-same-origin');
      this.iframe.setAttribute('scrolling', 'no');
      this.wrapper.appendChild(this.iframe);
    };
    Replayer.prototype.handleResize = function (dimension) {
      this.iframe.width = dimension.width + "px";
      this.iframe.height = dimension.height + "px";
    };
    Replayer.prototype.getDelay = function (event) {
      if (event.type === EventType.IncrementalSnapshot &&
        event.data.source === IncrementalSource.MouseMove) {
        var firstOffset = event.data.positions[0].timeOffset;
        var firstTimestamp = event.timestamp + firstOffset;
        event.delay = firstTimestamp - this.baselineTime;
        return firstTimestamp - this.baselineTime;
      }
      event.delay = event.timestamp - this.baselineTime;
      return event.timestamp - this.baselineTime;
    };
    Replayer.prototype.getCastFn = function (event, isSync) {
      var _this = this;
      if (isSync === void 0) { isSync = false; }
      var castFn;
      switch (event.type) {
        case EventType.DomContentLoaded:
        case EventType.Load:
          break;
        case EventType.Meta:
          castFn = function () {
            return _this.emitter.emit('resize', {
              width: event.data.width,
              height: event.data.height
            });
          };
          break;
        case EventType.FullSnapshot:
          castFn = function () {
            _this.rebuildFullSnapshot(event);
            _this.iframe.contentWindow.scrollTo(event.data.initialOffset);
          };
          break;
        case EventType.IncrementalSnapshot:
          castFn = function () {
            _this.applyIncremental(event, isSync);
            if (event === _this.nextUserInteractionEvent) {
              _this.nextUserInteractionEvent = null;
              _this.restoreSpeed();
            }
            if (_this.config.skipInactive && !_this.nextUserInteractionEvent) {
              for (var _i = 0, _a = _this.events; _i < _a.length; _i++) {
                var _event = _a[_i];
                if (_event.timestamp <= event.timestamp) {
                  continue;
                }
                if (_this.isUserInteraction(_event)) {
                  if (_event.delay - event.delay >
                    SKIP_TIME_THRESHOLD * _this.config.speed) {
                    _this.nextUserInteractionEvent = _event;
                  }
                  break;
                }
              }
              if (_this.nextUserInteractionEvent) {
                _this.noramlSpeed = _this.config.speed;
                var skipTime = _this.nextUserInteractionEvent.delay - event.delay;
                var payload = {
                  speed: Math.min(Math.round(skipTime / SKIP_TIME_INTERVAL), 360)
                };
                _this.setConfig(payload);
                _this.emitter.emit('skip-start', payload);
              }
            }
          };
          break;
        default:
      }
      var wrappedCastFn = function () {
        if (castFn) {
          castFn();
        }
        _this.lastPlayedEvent = event;
        if (event === _this.events[_this.events.length - 1]) {
          _this.restoreSpeed();
          _this.emitter.emit('finish');
        }
      };
      return wrappedCastFn;
    };
    Replayer.prototype.rebuildFullSnapshot = function (event) {
      if (Object.keys(this.missingNodeRetryMap).length) {
        console.warn('Found unresolved missing node map', this.missingNodeRetryMap);
      }
      this.missingNodeRetryMap = {};
      mirror.map = rebuild(event.data.node, this.iframe.contentDocument)[1];
      var styleEl = document.createElement('style');
      var _a = this.iframe.contentDocument, documentElement = _a.documentElement, head = _a.head;
      documentElement.insertBefore(styleEl, head);
      for (var idx = 0; idx < rules.length; idx++) {
        styleEl.sheet.insertRule(rules[idx], idx);
      }
      this.waitForStylesheetLoad();
    };
    Replayer.prototype.waitForStylesheetLoad = function () {
      var _this = this;
      var head = this.iframe.contentDocument.head;
      if (head) {
        var unloadSheets_1 = new Set();
        var timer_1;
        head
          .querySelectorAll('link[rel="stylesheet"]')
          .forEach(function (css) {
            if (!css.sheet) {
              if (unloadSheets_1.size === 0) {
                _this.pause();
                _this.emitter.emit('wait-stylesheet');
                timer_1 = window.setTimeout(function () {
                  _this.resume();
                  timer_1 = -1;
                }, _this.config.loadTimeout);
              }
              unloadSheets_1.add(css);
              css.addEventListener('load', function () {
                unloadSheets_1["delete"](css);
                if (unloadSheets_1.size === 0 && timer_1 !== -1) {
                  _this.resume();
                  _this.emitter.emit('stylesheet-loaded');
                  if (timer_1) {
                    window.clearTimeout(timer_1);
                  }
                }
              });
            }
          });
      }
    };
    Replayer.prototype.applyIncremental = function (e, isSync) {
      var _this = this;
      var d = e.data;
      switch (d.source) {
        case IncrementalSource.Mutation: {
          d.removes.forEach(function (mutation) {
            var target = mirror.getNode(mutation.id);
            if (!target) {
              return _this.warnNodeNotFound(d, mutation.id);
            }
            var parent = mirror.getNode(mutation.parentId);
            if (!parent) {
              return _this.warnNodeNotFound(d, mutation.parentId);
            }
            mirror.removeNodeFromMap(target);
            if (parent) {
              parent.removeChild(target);
            }
          });
          var missingNodeMap_1 = __assign({}, this.missingNodeRetryMap);
          d.adds.forEach(function (mutation) {
            var target = buildNodeWithSN(mutation.node, _this.iframe.contentDocument, mirror.map, true);
            var parent = mirror.getNode(mutation.parentId);
            if (!parent) {
              return _this.warnNodeNotFound(d, mutation.parentId);
            }
            var previous = null;
            var next = null;
            if (mutation.previousId) {
              previous = mirror.getNode(mutation.previousId);
            }
            if (mutation.nextId) {
              next = mirror.getNode(mutation.nextId);
            }
            if (mutation.previousId === -1 || mutation.nextId === -1) {
              missingNodeMap_1[mutation.node.id] = {
                node: target,
                mutation: mutation
              };
              return;
            }
            if (previous &&
              previous.nextSibling &&
              previous.nextSibling.parentNode) {
              parent.insertBefore(target, previous.nextSibling);
            }
            else if (next && next.parentNode) {
              parent.insertBefore(target, next);
            }
            else {
              parent.appendChild(target);
            }
            if (mutation.previousId || mutation.nextId) {
              _this.resolveMissingNode(missingNodeMap_1, parent, target, mutation);
            }
          });
          if (Object.keys(missingNodeMap_1).length) {
            Object.assign(this.missingNodeRetryMap, missingNodeMap_1);
          }
          d.texts.forEach(function (mutation) {
            var target = mirror.getNode(mutation.id);
            if (!target) {
              return _this.warnNodeNotFound(d, mutation.id);
            }
            target.textContent = mutation.value;
          });
          d.attributes.forEach(function (mutation) {
            var target = mirror.getNode(mutation.id);
            if (!target) {
              return _this.warnNodeNotFound(d, mutation.id);
            }
            for (var attributeName in mutation.attributes) {
              if (typeof attributeName === 'string') {
                var value = mutation.attributes[attributeName];
                if (value) {
                  target.setAttribute(attributeName, value);
                }
                else {
                  target.removeAttribute(attributeName);
                }
              }
            }
          });
          break;
        }
        case IncrementalSource.MouseMove:
          if (!isSync) {
            d.positions.forEach(function (p) {
              var action = {
                doAction: function () {
                  _this.mouse.style.left = p.x + "px";
                  _this.mouse.style.top = p.y + "px";
                  var target = mirror.getNode(p.id);
                  if (!target) {
                    return _this.warnNodeNotFound(d, p.id);
                  }
                  _this.hoverElements(target);
                },
                delay: p.timeOffset + e.timestamp - _this.baselineTime
              };
              _this.timer.addAction(action);
            });
          }
          break;
        case IncrementalSource.MouseInteraction: {
          if (d.id === -1) {
            break;
          }
          var event = new Event(MouseInteractions[d.type].toLowerCase());
          var target = mirror.getNode(d.id);
          if (!target) {
            return this.warnNodeNotFound(d, d.id);
          }
          switch (d.type) {
            case MouseInteractions.Blur:
              target.blur();
              break;
            case MouseInteractions.Focus:
              target.focus({
                preventScroll: true
              });
              break;
            case MouseInteractions.Click:
              if (!isSync) {
                this.mouse.classList.remove('active');
                void this.mouse.offsetWidth;
                this.mouse.classList.add('active');
              }
              break;
            default:
              target.dispatchEvent(event);
          }
          break;
        }
        case IncrementalSource.Scroll: {
          if (d.id === -1) {
            break;
          }
          var target = mirror.getNode(d.id);
          if (!target) {
            return this.warnNodeNotFound(d, d.id);
          }
          if (target === this.iframe.contentDocument) {
            this.iframe.contentWindow.scrollTo({
              top: d.y,
              left: d.x,
              behavior: isSync ? 'auto' : 'smooth'
            });
          }
          else {
            try {
              target.scrollTop = d.y;
              target.scrollLeft = d.x;
            }
            catch (error) {
            }
          }
          break;
        }
        case IncrementalSource.ViewportResize:
          this.emitter.emit('resize', {
            width: d.width,
            height: d.height
          });
          break;
        case IncrementalSource.Input: {
          if (d.id === -1) {
            break;
          }
          var target = mirror.getNode(d.id);
          if (!target) {
            return this.warnNodeNotFound(d, d.id);
          }
          try {
            target.checked = d.isChecked;
            target.value = d.text;
          }
          catch (error) {
          }
          break;
        }
        default:
      }
    };
    Replayer.prototype.resolveMissingNode = function (map, parent, target, targetMutation) {
      var previousId = targetMutation.previousId, nextId = targetMutation.nextId;
      var previousInMap = previousId && map[previousId];
      var nextInMap = nextId && map[nextId];
      if (previousInMap) {
        var _a = previousInMap, node = _a.node, mutation = _a.mutation;
        parent.insertBefore(node, target);
        delete map[mutation.node.id];
        delete this.missingNodeRetryMap[mutation.node.id];
        if (mutation.previousId || mutation.nextId) {
          this.resolveMissingNode(map, parent, node, mutation);
        }
      }
      if (nextInMap) {
        var _b = nextInMap, node = _b.node, mutation = _b.mutation;
        parent.insertBefore(node, target.nextSibling);
        delete map[mutation.node.id];
        delete this.missingNodeRetryMap[mutation.node.id];
        if (mutation.previousId || mutation.nextId) {
          this.resolveMissingNode(map, parent, node, mutation);
        }
      }
    };
    Replayer.prototype.hoverElements = function (el) {
      this.iframe
        .contentDocument.querySelectorAll('.\\:hover')
        .forEach(function (hoveredEl) {
          hoveredEl.classList.remove(':hover');
        });
      var currentEl = el;
      while (currentEl) {
        currentEl.classList.add(':hover');
        currentEl = currentEl.parentElement;
      }
    };
    Replayer.prototype.isUserInteraction = function (event) {
      if (event.type !== EventType.IncrementalSnapshot) {
        return false;
      }
      return (event.data.source > IncrementalSource.Mutation &&
        event.data.source <= IncrementalSource.Input);
    };
    Replayer.prototype.restoreSpeed = function () {
      if (this.noramlSpeed === -1) {
        return;
      }
      var payload = { speed: this.noramlSpeed };
      this.setConfig(payload);
      this.emitter.emit('skip-end', payload);
      this.noramlSpeed = -1;
    };
    Replayer.prototype.warnNodeNotFound = function (d, id) {
      if (!this.config.showWarning) {
        return;
      }
      console.warn(REPLAY_CONSOLE_PREFIX, "Node with id '" + id + "' not found in", d);
    };
    return Replayer;
  }());

  exports.record = record;
  exports.Replayer = Replayer;
  exports.mirror = mirror;

  return exports;

}({}));

class Record {
  constructor(options) {
    this.url = options.url;
    this.interval = options.interval || 10000;
    this.success = options.success || function () { };
    this.error = options.error || function () { };
    this.interval = options.interval || 10000;
    this.events = [];
    this.create = this.create.bind(this);
    this.ajax = this.ajax.bind(this);
    this.stop = this.stop.bind(this);
    this.timeOutFn = this.timeOutFn.bind(this);
    this.timeOut = null;
    this.create();
    this.timeOutFn();
  }
  timeOutFn() {
    this.ajax();
    if (this.timeOut !== null) {
      clearTimeout(this.timeOut);
    };
    this.timeOut = setTimeout(() => {
      this.timeOutFn();
    }, this.interval);
  }
  create() {
    const that = this;
    this.rrewb = rrweb.record({
      emit(event) {
        // 将 event 存入 events 数组中
        that.events.push(event);
      },
    });
  }
  ajax() {
    axios.post(this.url, {
      data: this.events
    }).then((res) => {
      this.success(res);
    }).catch((err) => {
      this.error(err);
    });
  }
  stop() {
    this.rrewb();
  }
};
