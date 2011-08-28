goog.provide('hw.ui.Tabs');
goog.provide('hw.ui.Tabs.Tab');

goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.dom.NodeType');
goog.require('goog.dom.classes');
goog.require('hw.events.EventType');
goog.require('hw.ui.BaseComponent');
goog.require('tpl.CSS_NAMES');
goog.require('tpl.ui.Tabs');

/**
 * @constructor
 * @extends {hw.ui.BaseComponent}
 */
hw.ui.Tabs = function() {
  goog.base(this);
};
goog.inherits(hw.ui.Tabs, hw.ui.BaseComponent);

/**
 * @type {number}
 * @private
 */
hw.ui.Tabs.prototype.index_ = -1;

/**
 * @return {number}
 */
hw.ui.Tabs.prototype.getIndex = function() {
  return this.index_;
};


/** @inheritDoc */
hw.ui.Tabs.prototype.createTemplate = function(payload) {
  return tpl.ui.Tabs.element(payload).toString();
};

/** @inheritDoc */
hw.ui.Tabs.prototype.addChild = function(child) {
  this.assertChildTypes(child, hw.ui.Tabs.Tab);
  goog.base(this, 'addChild', child);
};


/**
 * @param {string=} text
 * @return {hw.ui.Tabs}
 */
hw.ui.Tabs.prototype.addTab = function(text) {
  var tab = new hw.ui.Tabs.Tab(String(text));
  this.addChild(tab);
  return this;
};


/** @inheritDoc */
hw.ui.Tabs.prototype.captureElement = function() {
  goog.base(this, 'captureElement');
  this.setIndex(0);
  this.getHandler().listen(
    this.getElement(),
    hw.events.EventType.TOUCHSTART,
    this.onTabTouch_);
};

/**
 * @param {number} index
 */
hw.ui.Tabs.prototype.setIndex = function(index) {
  if (index === this.index_) {
    return;
  }

  var tabs = this.getChildren();
  this.setTabSelected_(this.index_, false);
  var max = tabs.length - 1;
  var min = max > 0 ? 0 : -1;
  index = Math.min(max, index);
  index = Math.max(min, index);
  this.index_ = index;
  this.setTabSelected_(index, true);
  this.dispatchEvent(hw.events.EventType.SELECTCHANGE);
};


/**
 * @param {number} index
 * @param {boolean} selected
 */
hw.ui.Tabs.prototype.setTabSelected_ = function(index, selected) {
  if (index < 0) {
    return;
  }
  var tabs = this.getChildren();
  var tab = tabs[index];
  if (tab && tab.getElement()) {
    goog.dom.classes.enable(
      tab.getElement(),
      tpl.CSS_NAMES.CSS_BLUE_GRADIENT_BOX_INSET_REVERSE,
      selected);
  }
};


/**
 * @param {Event} evt
 */
hw.ui.Tabs.prototype.onTabTouch_ = function(evt) {
  var el = /** @type {Element} */ (evt.target);
  if (el.nodeType == goog.dom.NodeType.TEXT) {
    el = el.parentNode;
  }
  goog.array.some(this.getChildren(), function(child, index) {
    if (child.getElement() == el) {
      el.focus && el.focus();
      this.setIndex(index);
      evt.preventDefault();
      return true;
    }
  }, this);
};

/**
 * @param {string} text
 * @constructor
 * @extends {hw.ui.BaseComponent}
 */
hw.ui.Tabs.Tab = function(text) {
  goog.base(this);
  this.text_ = text;
};
goog.inherits(hw.ui.Tabs.Tab, hw.ui.BaseComponent);


/** @inheritDoc */
hw.ui.Tabs.Tab.prototype.createTemplate = function(payload) {
  payload.text = this.text_;
  return tpl.ui.Tabs.tab(payload).toString();
};