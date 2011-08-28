goog.provide('hw.ui.BaseComponent');

goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.DomHelper');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.math.Size');
goog.require('goog.style');
goog.require('hw.Logger');
goog.require('hw.async.Later');
goog.require('hw.msg');
goog.require('tpl.CSS_NAMES');


/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
hw.ui.BaseComponent = function() {
  goog.base(this);
  this.children_ = [];
  this.later_ = new hw.async.Later(this);
};
goog.inherits(hw.ui.BaseComponent, goog.events.EventTarget);

/**
 * @type {number}
 * @private
 */
hw.ui.BaseComponent.nextId_ = 0;

/**
 * @type {string}
 * @private
 */
hw.ui.BaseComponent.prototype.id_ = '';


/**
 * @type {boolean}
 * @private
 */
hw.ui.BaseComponent.prototype.bound_ = false;


/**
 * @type {hw.async.Later}
 * @private
 */
hw.ui.BaseComponent.prototype.later_ = null;


/**
 * @type {goog.dom.DomHelper}
 */
hw.ui.BaseComponent.prototype.dom_ = null;

/**
 * @type {hw.ui.BaseComponent}
 * @private
 */
hw.ui.BaseComponent.prototype.parent_ = null;


/**
 * @type {goog.events.EventHandler}
 */
hw.ui.BaseComponent.prototype.handler_ = null;

/**
 * @type {Array.<hw.ui.BaseComponent>}
 * @private
 */
hw.ui.BaseComponent.prototype.children_ = null;

/**
 * @type {Element}
 */
hw.ui.BaseComponent.prototype.element_ = null;


/**
 * @type {boolean}
 * @private
 */
hw.ui.BaseComponent.prototype.visible_ = true;

/**
 * @type {Array.<string>}
 * @private
 */
hw.ui.BaseComponent.prototype.cssNamesToAdd_ = null;

/**
 * @return {string}
 */
hw.ui.BaseComponent.prototype.generateId = function() {
  return 'x' + (hw.ui.BaseComponent.nextId_++).toString(16);
};


/**
 * @param {string} cssName
 */
hw.ui.BaseComponent.prototype.addCssName = function(cssName) {
  if (!this.element_) {
    if (!this.cssNamesToAdd_) {
      this.cssNamesToAdd_ = [];
    }
    this.cssNamesToAdd_.push(cssName);
  } else {
    goog.dom.classes.add(this.element_, cssName);
  }
};

/**
 * @param {number} delay
 * @param {...*} var_args
 * @protected
 */
hw.ui.BaseComponent.prototype.later = function(fn, delay, var_args) {
  var args = Array.prototype.slice.call(arguments, 0);
  this.later_.schedule.apply(this.later_, args);
};

/**
 * @return {goog.math.Size}
 */
hw.ui.BaseComponent.prototype.getSize = function() {
  if (!this.isVisible()) {
    return new goog.math.Size(0, 0);
  } else {
    return goog.style.getSize(this.getElement())
  }
};

/**
 * @return {goog.math.Size}
 */
hw.ui.BaseComponent.prototype.getViewportSize = function() {
  if (!this.getDom()) {
    return new goog.math.Size(0, 0);
  }
  // var statusBarHeight = hw.config.ENABLE_HIDE_ADDRESSBAR ? 0 : 20;
  var statusBarHeight = 0;
  var win = this.getDom().getWindow();
  return new goog.math.Size(
    win.innerWidth,
    win.innerHeight - statusBarHeight);
};


/**
 * @return {boolean}
 */
hw.ui.BaseComponent.prototype.isVisible = function() {
  return this.isInDocument() && this.visible_;
};

/**
 * @return {boolean}
 */
hw.ui.BaseComponent.prototype.isInDocument = function() {
  return !!this.dom_ &&
    !!this.element_ &&
    this.element_.id === this.getId() &&
    !!this.dom_.getElement(this.getId());
};


/**
 * @return {goog.dom.DomHelper}
 */
hw.ui.BaseComponent.prototype.getDom = function() {
  return this.dom_;
};

/**
 * @return {hw.ui.BaseComponent}
 */
hw.ui.BaseComponent.prototype.getParent = function() {
  return this.parent_;
};


/**
 * @return {Array.<hw.ui.BaseComponent>}
 */
hw.ui.BaseComponent.prototype.getChildren = function() {
  return this.children_;
};


/**
 * @param {hw.ui.BaseComponent} child
 * @param {...Function} var_args
 */
hw.ui.BaseComponent.prototype.assertChildTypes = function(child, var_args) {
  if (!COMPILED) {
    var types = Array.prototype.slice.call(arguments, 1);
    for (var i = 0, j = types.length; i < j; i++) {
      var type = types[i];
      if (child instanceof type) {
        return;
      }
    }
    hw.Logger.error(child, types);
    goog.asserts.assert(false, 'Invalid Child Type');
  }
};


/**
 * @inheritDoc
 */
hw.ui.BaseComponent.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  goog.array.forEach(this.children_, function(child) {
    (/** @type {hw.ui.BaseComponent} */ (child)).dispose();
  }, this);
  if (this.handler_) {
    this.handler_.dispose();
    this.handler_ = null;
  }
  if (this.element_ && this.bound_) {
    this.releaseElements();
  }
  this.later_.dispose();
  this.later_ = null;
  this.cssNamesToAdd_ = null;
  this.element_ = null;
  this.children_ = null;
  this.parent_ = null;
};


/**
 * Destroy.
 */
hw.ui.BaseComponent.prototype.destroy = function() {
  goog.dom.removeNode(this.getElement());
  this.dispose();
};


/**
 * @return {string}
 */
hw.ui.BaseComponent.prototype.getId = function() {
  var id = this.id_;
  if (id) {
    return id;
  }
  id = this.id_ = this.generateId();
  return id;
};

/**
 * @return {goog.events.EventHandler}
 */
hw.ui.BaseComponent.prototype.getHandler = function() {
  return this.handler_ ||
    (this.handler_ = new goog.events.EventHandler(this));
};

/**
 * @return {Element}
 */
hw.ui.BaseComponent.prototype.getElement = function() {
  return this.element_;
};

/**
 * @return {Element}
 */
hw.ui.BaseComponent.prototype.getContentElement = function() {
  return this.getElement();
};


/**
 * @param {Element} element
 */
hw.ui.BaseComponent.prototype.appendElement = function(element) {
  var parentEl = this.getContentElement();
  if (parentEl != element.parentNode) {
    parentEl.appendChild(element);
  }
};


/**
 * createElement
 */
hw.ui.BaseComponent.prototype.createElement = function() {
  var el = this.dom_.createDom('div');
  var payload = this.createPayload();
  el.innerHTML = this.createTemplate(payload);
  this.element_ = /** @type {Element} */ (el.firstChild);
  this.setVisible(this.visible_);
};


/**
 * @param {boolean} visible
 */
hw.ui.BaseComponent.prototype.setVisible = function(visible) {
  if (this.visible_ == visible) {
    return;
  }
  this.visible_ = visible;

  if (this.getElement()) {
    goog.dom.classes.enable(
      this.getElement(),
      tpl.CSS_NAMES.CSS_DISPLAY_NONE,
      !visible);
  }
};


/**
 * hideDeferElements.
 * @deprecated
 */
hw.ui.BaseComponent.prototype.hideDeferElementsAndShowLater = function() {
//  if (!this.visible_) {
//    return;
//  }
//
//  goog.dom.classes.enable(
//    this.getElement(),
//    tpl.CSS_NAMES.CSS_HIDE_DEFER_ELEMENTS,
//    true);
//
//  this.later(function() {
//    if (this.isVisible()) {
//      goog.dom.classes.enable(
//        this.getElement(),
//        tpl.CSS_NAMES.CSS_HIDE_DEFER_ELEMENTS,
//        false);
//      hw.events.AppEventTarget.updateLayout(this);
//    }
//  }, 1500);
};

/**
 * @param {string|number} suffix
 * @param {boolean=} opt_inDocument
 */
hw.ui.BaseComponent.prototype.getInnerElement = function(suffix,
                                                         opt_inDocument) {
  if (opt_inDocument) {
    return this.getDom().getDocument().
      getElementById(this.getId() + '_' + suffix);
  }
  var el = this.getElement();
  goog.asserts.assert(el);
  var selector = '#' + this.getId() + '_' + suffix;
  return el.querySelector(selector);
};


/**
 * @param {hw.ui.BaseComponent} child
 */
hw.ui.BaseComponent.prototype.addChild = function(child) {
  goog.asserts.assert(!child.parent_);
  this.children_.push(child);
  child.parent_ = this;
  if (this.getElement() && this.getContentElement()) {
    child.render(this.getContentElement());
  }
};


/**
 * @param {hw.ui.BaseComponent} child
 */
hw.ui.BaseComponent.prototype.removeChild = function(child) {
  goog.asserts.assert(child.parent_ == this);
  goog.array.remove(this.children_, child);
  child.parent_ = null;
};


/**
 * @protected
 */
hw.ui.BaseComponent.prototype.createPayload = function() {
  return {
    id : this.getId()
  };
};


/**
 * @param {Object} payload
 * @return {string}
 * @protected
 */
hw.ui.BaseComponent.prototype.createTemplate = function(payload) {
  return '<div id="' + this.getId() + '"></div>';
};


/**
 * @param {Element} parentEl
 * @param {goog.dom.DomHelper=} opt_dom
 */
hw.ui.BaseComponent.prototype.render = function(parentEl, opt_dom) {
  if (!this.element_) {
    if (!opt_dom) {
      // TODO(hedger): Ensure that dom helper uses the same document.
      var doc = goog.dom.getOwnerDocument(parentEl);
      opt_dom = new goog.dom.DomHelper(doc);
    }
    this.dom_ = opt_dom;
    this.createElement();
  }

  if (parentEl != this.element_.parentNode) {
    parentEl.appendChild(this.element_);
  }

  var contentEl = this.getContentElement();
  goog.array.forEach(this.children_, function(child) {
    child.render(contentEl, opt_dom);
  });

  this.captureElements();
};

/**
 * bindEvents.
 */
hw.ui.BaseComponent.prototype.captureElements = function() {
  if (!this.bound_) {
    goog.array.forEach(this.children_, function(child) {
      (/** @type {hw.ui.BaseComponent} */ (child)).captureElements();
    });
    this.captureElement();
  }
};

/**
 * bindEvents.
 */
hw.ui.BaseComponent.prototype.releaseElements = function() {
  if (this.bound_) {
    goog.array.forEach(this.children_, function(child) {
      (/** @type {hw.ui.BaseComponent} */ (child)).releaseElements();
    });
    if (this.handler_) {
      this.handler_.removeAll();
    }
    this.releaseElement();
  }
};

/**
 * Method.
 * @protected
 */
hw.ui.BaseComponent.prototype.captureElement = function() {
  goog.asserts.assert(!this.bound_);
  this.bound_ = true;
  if (this.cssNamesToAdd_) {
    this.getElement().className += ' ' + this.cssNamesToAdd_.join(' ');
    this.cssNamesToAdd_ = null;
  }
};


/**
 * Method.
 * @protected
 */
hw.ui.BaseComponent.prototype.releaseElement = function() {
  goog.asserts.assert(this.bound_);
  this.bound_ = false;
  if (this.handler_) {
    this.handler_.removeAll();
  }
};