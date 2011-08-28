goog.provide('hw.layout.StackRows');
goog.provide('hw.layout.StackRows.Head');
goog.provide('hw.layout.StackRows.Body');
goog.provide('hw.layout.StackRows.Foot');

goog.require('goog.array');
goog.require('goog.math.Size');
goog.require('hw.ui.BaseComponent');
goog.require('hw.events.AppEventTarget');
goog.require('hw.events.EventType');
goog.require('hw.layout.Scroll');
goog.require('hw.ui.scroll.Options');
goog.require('hw.ui.scroll.Scrubber.Container');
goog.require('hw.ui.BaseComponent');
goog.require('tpl.CSS_NAMES');
goog.require('tpl.layout.StackRows');


/**
 * @param {hw.ui.scroll.Options=} opt_scrollOptions
 * @constructor
 * @implements {hw.ui.scroll.Scrubber.Container}
 * @extends {hw.ui.BaseComponent}
 */
hw.layout.StackRows = function(opt_scrollOptions) {
  goog.base(this);

  this.head_ = new hw.layout.StackRows.Head();
  this.addChild(this.head_);

  this.bodyFixHead_ = new hw.layout.StackRows.Head();
  this.addChild(this.bodyFixHead_);

  this.body_ = new hw.layout.StackRows.Body();
  this.addChild(this.body_);

  this.foot_ = new hw.layout.StackRows.Foot();
  this.addChild(this.foot_);

  this.scroll_ = new hw.layout.Scroll(opt_scrollOptions);
  this.body_.addChild(this.scroll_);
};
goog.inherits(hw.layout.StackRows, hw.ui.BaseComponent);


/**
 * @type {hw.ui.BaseComponent}
 * @private
 */
hw.layout.StackRows.prototype.head_ = null;


/**
 * @type {hw.ui.BaseComponent}
 * @private
 */
hw.layout.StackRows.prototype.body_ = null;


/**
 * @type {hw.ui.BaseComponent}
 * @private
 */
hw.layout.StackRows.prototype.foot_ = null;


/**
 * @type {hw.layout.Scroll}
 * @private
 */
hw.layout.StackRows.prototype.scroll_ = null;


/**
 * Impl.
 * @inheritDoc
 */
hw.layout.StackRows.prototype.getSrubberContainerSize = function() {
  return this.scroll_.getSize();
};

/**
 * Impl.
 * @inheritDoc
 */
hw.layout.StackRows.prototype.scrubberContainerScrolTo = function(y) {
  this.scroll_.scrollTo(0, -y, 0, false, true);
};


/** @inheritDoc */
hw.layout.StackRows.prototype.addChild = function(child) {
  this.assertChildTypes(child,
    hw.layout.StackRows.Head,
    hw.layout.StackRows.Body,
    hw.layout.StackRows.Foot);
  goog.base(this, 'addChild', child);
};


/** @inheritDoc */
hw.layout.StackRows.prototype.createTemplate = function(payload) {
  return tpl.layout.StackRows.element(payload).toString();
};


/** @inheritDoc */
hw.layout.StackRows.prototype.captureElement = function() {
  goog.base(this, 'captureElement');
  this.scroll_.refresh();
  this.getHandler().listen(
    hw.events.AppEventTarget.getInstance(),
    hw.events.EventType.LAYOUT_UPDATE,
    this.scroll_.refresh,
    false,
    this.scroll_);
};


/**
 * Refresh.
 */
hw.layout.StackRows.prototype.refresh = function() {
  if (this.scroll_) {
    this.scroll_.refresh();
  }
};

/**
 * @param {hw.ui.BaseComponent} child
 */
hw.layout.StackRows.prototype.addToHeader = function(child) {
  this.head_.addChild(child);
};


/**
 * @param {hw.ui.BaseComponent} child
 * @param {boolean=} opt_fixed
 */
hw.layout.StackRows.prototype.addToBody = function(child, opt_fixed) {
  if (opt_fixed) {
    this.bodyFixHead_.addChild(child);
  } else {
    this.scroll_.addChild(child);
  }
};

/**
 * @param {hw.ui.BaseComponent} child
 */
hw.layout.StackRows.prototype.addToFooter = function(child) {
  this.foot_.addChild(child);
};

/**
 * @constructor
 * @extends {hw.ui.BaseComponent}
 */
hw.layout.StackRows.Head = function Head() {
  goog.base(this);
};
goog.inherits(hw.layout.StackRows.Head, hw.ui.BaseComponent);


/** @inheritDoc */
hw.layout.StackRows.Head.prototype.createTemplate = function(payload) {
  return tpl.layout.StackRows.head(payload).toString();
};

/** @inheritDoc */
hw.layout.StackRows.Head.prototype.getContentElement = function() {
  return this.getInnerElement('content');
};


/**
 * @constructor
 * @extends {hw.ui.BaseComponent}
 */
hw.layout.StackRows.Body = function Body() {
  goog.base(this);
};
goog.inherits(hw.layout.StackRows.Body, hw.ui.BaseComponent);


/** @inheritDoc */
hw.layout.StackRows.Body.prototype.createTemplate = function(payload) {
  return tpl.layout.StackRows.body(payload).toString();
};

/** @inheritDoc */
hw.layout.StackRows.Body.prototype.getContentElement = function() {
  return this.getInnerElement('content');
};


/**
 * @constructor
 * @extends {hw.ui.BaseComponent}
 */
hw.layout.StackRows.Foot = function Foot() {
  goog.base(this);
};
goog.inherits(hw.layout.StackRows.Foot, hw.ui.BaseComponent);


/** @inheritDoc */
hw.layout.StackRows.Foot.prototype.createTemplate = function(payload) {
  return tpl.layout.StackRows.foot(payload).toString();
};

/** @inheritDoc */
hw.layout.StackRows.Foot.prototype.getContentElement = function() {
  return this.getInnerElement('content');
};