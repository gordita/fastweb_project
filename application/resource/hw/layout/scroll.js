goog.provide('hw.layout.Scroll');

goog.require('goog.Throttle');
goog.require('goog.dispose');
goog.require('hw.events.AppEventTarget');
goog.require('hw.events.EventType');
goog.require('hw.others.IScroll');
goog.require('hw.ui.BaseComponent');
goog.require('hw.ui.scroll.Options');
goog.require('tpl.CSS_NAMES');
goog.require('tpl.layout.Scroll');


/**
 * @param {hw.ui.scroll.Options=} opt_options
 * @constructor
 * @extends {hw.ui.BaseComponent}
 */
hw.layout.Scroll = function(opt_options) {
  goog.base(this);

  this.refreshThrottle_ = new goog.async.Throttle(
    this.refresh_, 50, this);

  this.options_ = opt_options || new hw.ui.scroll.Options();

//  var onScrollMove = this.options_.onScrollMove;
//  this.options_.onScrollMove = goog.bind()
};
goog.inherits(hw.layout.Scroll, hw.ui.BaseComponent);


/**
 * @private
 */
hw.layout.Scroll.prototype.refreshThrottle_ = null;

/**
 * @type {hw.others.IScroll}
 * @private
 */
hw.layout.Scroll.prototype.scroll_ = null;

/**
 * @type {hw.ui.scroll.Options}
 * @private
 */
hw.layout.Scroll.prototype.options_ = null;


/** @inheritDoc */
hw.layout.Scroll.prototype.createTemplate = function(payload) {
  return tpl.layout.Scroll.element(payload).toString();
};

/** @inheritDoc */
hw.layout.Scroll.prototype.getContentElement = function() {
  return this.getInnerElement('body');
};

/** @inheritDoc */
hw.layout.Scroll.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  goog.dispose(this.refreshThrottle_);
};

/** @inheritDoc */
hw.layout.Scroll.prototype.captureElement = function() {
  goog.base(this, 'captureElement');
  this.scroll_ = new hw.others.IScroll(
    this.getElement(),
    this.options_,
    this.getDom().getDocument());
  this.refresh();
  this.getHandler().listen(
    hw.events.AppEventTarget.getInstance(),
    hw.events.EventType.LAYOUT_UPDATE,
    this.refresh)
};


/** @inheritDoc */
hw.layout.Scroll.prototype.releaseElement = function() {
  goog.base(this, 'releaseElement');
  this.scroll_.destroy();
  this.scroll_ = null;
};


/**
 * Refresh.
 * @param {Event=} opt_evt
 */
hw.layout.Scroll.prototype.refresh = function(opt_evt) {
  if (this.scroll_) {
    if (opt_evt && opt_evt.type == hw.events.EventType.LAYOUT_UPDATE) {
      this.scroll_.scrollTo(0, 0);
    }
    this.refreshThrottle_.fire();
  }
};


/**
 * refreshHard
 */
hw.layout.Scroll.prototype.refreshHard = function() {
  this.refreshThrottle_.stop();
  this.refresh_();
};


/**
 *
 * @param {number} x
 * @param {number} y
 * @param {number=} time
 * @param {boolean=} relative
 * @param {boolean=} limitY
 */
hw.layout.Scroll.prototype.scrollTo = function (x, y, time, relative, limitY) {
  if (limitY) {
		var scrollY = this.scroll_.getMaxScrollY(); 
    if (y < scrollY) {
      y = scrollY;
    } else if (y > 0) {
      y = 0;
    }
  }
  this.scroll_.scrollTo(x, y, time);
};

/**
 * Refresh.
 * @private
 */
hw.layout.Scroll.prototype.refresh_ = function() {
  if (this.isInDocument() && this.scroll_) {
    this.scroll_.refresh();
  }
};
