goog.provide('hw.ui.TabsView');

goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.dom.classes');
goog.require('hw.events.AppEventTarget');
goog.require('hw.events.EventType');
goog.require('hw.ui.BaseComponent');
goog.require('hw.ui.Tabs');
goog.require('tpl.ui.Tabs');

/**
 * @constructor
 * @extends {hw.ui.BaseComponent}
 */
hw.ui.TabsView = function() {
  goog.base(this);
  this.contents_ = [];
};
goog.inherits(hw.ui.TabsView, hw.ui.BaseComponent);

/**
 * @type {number}
 * @private
 */
hw.ui.TabsView.prototype.index_ = -1;


/**
 * @type {Array.<hw.ui.BaseComponent>}
 * @private
 */
hw.ui.TabsView.prototype.contents_ = null;


/** @inheritDoc */
hw.ui.TabsView.prototype.captureElement = function() {
  goog.base(this, 'captureElement');
  if (this.tabs_) {
    this.attach(this.tabs_);
  }
};


/**
 * @param {hw.ui.BaseComponent} content
 * @param {number} index
 */
hw.ui.TabsView.prototype.setContent = function(content, index) {
  goog.asserts.assert(!this.contents_[index]);
  this.contents_[index] = content;
};


/**
 * @param {hw.ui.Tabs} tabs
 */
hw.ui.TabsView.prototype.attach = function(tabs) {
  this.getHandler().removeAll();
  this.tabs_ = tabs;
  this.getHandler().listen(
    this.tabs_,
    hw.events.EventType.SELECTCHANGE,
    this.onTabsChange_);
};


/**
 * @param {Event} evt
 * @private
 */
hw.ui.TabsView.prototype.onTabsChange_ = function(evt) {
  var lastContent = this.contents_[this.index_];
  this.index_ = this.tabs_.getIndex();
  var content = this.contents_[this.index_];
  if (content) {
    if (!content.getParent()) {
      this.addChild(content);
    }
    content.setVisible(true);
  }

  if (lastContent) {
    lastContent.setVisible(false);
  }
  hw.events.AppEventTarget.updateLayout(this);
};

