/*!
 * iScroll v4.1.8 ~ Copyright (c) 2011 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
goog.provide('hw.others.IScroll');

goog.require('goog.dom');
goog.require('hw.ui.scroll.Env');
goog.require('hw.ui.scroll.Options');

/**
 * @param {Element} el
 * @param {hw.ui.scroll.Options=} options
 * @param {Document=} opt_doc
 * @constructor
 */
hw.others.IScroll = function (el, options, opt_doc) {
  // Export this method to JSC.
  this['handleEvent'] = this.handleEvent;
  var that = this;
  var doc = opt_doc || document;
  this.doc_ = doc;
  this.win_ = (new goog.dom.DomHelper(doc)).getWindow();
  this.steps_ = [];
  that.wrapper_ = goog.dom.getElement(el);
  that.wrapper_.style.overflow = 'hidden';
  that.scroller_ = that.wrapper_.children[0];
  that.options_ = new hw.ui.scroll.Options();
  this.init_(el, options, opt_doc);
};


/**
 * @type {Document}
 * @private
 **/
hw.others.IScroll.prototype.doc_ = null;


/**
 * @type {Window}
 * @private
 **/
hw.others.IScroll.prototype.win_ = null;

/**
 * @type {boolean}
 * @private
 **/
hw.others.IScroll.prototype.disposed_ = false;


/**
 * @type {hw.ui.scroll.Options}
 * @private
 */
hw.others.IScroll.prototype.options_ = null;


/**
 * @type {Element}
 * @private
 **/
hw.others.IScroll.prototype.scroller_ = null;


/**
 * @type {boolean}
 * @private
 */
hw.others.IScroll.prototype.enabled_ = true;

/**
 * @type {number}
 * @private
 */
hw.others.IScroll.prototype.checkDOMTime_ = 0;

/**
 * @type {number}
 * @private
 */
hw.others.IScroll.prototype.x_ = 0;


/**
 * @type {number}
 * @private
 */
hw.others.IScroll.prototype.y_ = 0;


/**
 * @type {Element}
 * @private
 **/
hw.others.IScroll.prototype.wrapper_ = null;

/**
 * @type {boolean}
 * @private
 **/
hw.others.IScroll.prototype.animating_ = false;

/**
 * @type {Array}
 * @private
 */
hw.others.IScroll.prototype.steps_ = null;


/**
 * @type {boolean}
 * @private
 **/
hw.others.IScroll.prototype.hScroll_ = false;

/**
 * @type {boolean}
 * @private
 **/
hw.others.IScroll.prototype.hScrollbar_ = false;


/**
 * @type {boolean}
 * @private
 **/
hw.others.IScroll.prototype.moved_ = false;

/**
 * @type {boolean}
 * @private
 **/
hw.others.IScroll.prototype.vScroll_ = false;

/**
 * @type {boolean}
 * @private
 **/
hw.others.IScroll.prototype.vScrollbar_ = false;

/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.dirX_ = 0;

/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.dirY_ = 0;

/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.absDistX_ = 0;

/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.absDistY_ = 0;

/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.absStartX_ = 0;

/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.absStartY_ = 0;

/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.startX_ = 0;

/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.startY_ = 0;

/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.pointX_ = 0;

/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.pointY_ = 0;

/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.maxScrollX_ = 0;

/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.maxScrollY_ = 0;

/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.minScrollY_ = 0;

/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.scrollerH_ = 0;

/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.scrollerW_ = 0;

/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.wrapperH_ = 0;


/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.wrapperOffsetLeft = 0;

/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.wrapperOffsetTop = 0;

/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.wheelZoomCount_ = 0;

/**
 * @type {number}
 * @private
 **/
hw.others.IScroll.prototype.wrapperW_ = 0;

/**
 * @type {number}
 * @private
 */
hw.others.IScroll.prototype.scale_ = 1;

/**
 * @type {number}
 * @private
 */
hw.others.IScroll.prototype.currPageX_ = 0;

/**
 * @type {number}
 * @private
 */
hw.others.IScroll.prototype.currPageY_ = 0;

/**
 * @type {Array}
 * @private
 */
hw.others.IScroll.prototype.pagesX_ = [];

/**
 * @type {Array.<number>}
 * @private
 */
hw.others.IScroll.prototype.pagesY_ = [];

/**
 * @type {?number}
 * @private
 */
hw.others.IScroll.prototype.aniTime_ = null;

/**
 * @type {?number}
 * @private
 */
hw.others.IScroll.prototype.startTime_ = null;


/**
 * @return {number}
 */
hw.others.IScroll.prototype.getMaxScrollY = function() {
  return this.maxScrollY_;
};

/**
 * @return {number}
 */
hw.others.IScroll.prototype.getCurrentPageX = function() {
  return this.currPageX_;
};

/**
 * @return {number}
 */
hw.others.IScroll.prototype.getPagesXLength = function() {
  return this.pagesX_.length;
};

/**
 * @param {Event} e
 * @public
 */
hw.others.IScroll.prototype.handleEvent = function (e) {
  var that = this;
  switch (e.type) {
    case hw.ui.scroll.Env.START_EV:
      if (!hw.ui.scroll.Env.hasTouch && e.button !== 0) return;
      that.start_(e);
      break;
    case hw.ui.scroll.Env.MOVE_EV:
      that._move(e);
      break;
    case hw.ui.scroll.Env.END_EV:
    case hw.ui.scroll.Env.CANCEL_EV:
      that.end_(e);
      break;
    case hw.ui.scroll.Env.RESIZE_EV:
      that.resize_();
      break;
    case hw.ui.scroll.Env.WHEEL_EV:
      that.wheel_(e);
      break;
    case 'mouseout':
      that.mouseout_(e);
      break;
    case hw.ui.scroll.Env.TRANSITION_END_EV:
      that.transitionEnd_(e);
      break;
  }
};

/**
 * @param {Element} el
 * @param {hw.ui.scroll.Options=} options
 * @param {Document=} opt_doc
 */
hw.others.IScroll.prototype.init_ = function (el, options, opt_doc) {
  var that = this;
  // User defined options
  if (options) {
    for (var i in options) {
      that.options_[i] = options[i];
    }
  }

  // Normalize options
  that.options_.useTransform = hw.ui.scroll.Env.hasTransform ?
    that.options_.useTransform :
    false;

  that.options_.hScrollbar = that.options_.hScroll && that.options_.hScrollbar;
  that.options_.vScrollbar = that.options_.vScroll && that.options_.vScrollbar;
  that.options_.zoom = that.options_.useTransform && that.options_.zoom;
  that.options_.useTransition =
    hw.ui.scroll.Env.hasTransitionEnd && that.options_.useTransition;

  // Set some default styles
  that.scroller_.style[hw.ui.scroll.Env.transitionProperty] =
    that.options_.useTransform ?
      '-' + hw.ui.scroll.Env.vendor.toLowerCase() + '-transform' :
      'top left';

  that.scroller_.style[hw.ui.scroll.Env.transitionDuration] = '0';
  that.scroller_.style[hw.ui.scroll.Env.transformOrigin] = '0 0';

  if (that.options_.useTransition) {
    that.scroller_.style[hw.ui.scroll.Env.transitionTimingFunction ] =
      'cubic-bezier(0.33,0.66,0.66,1)';
  }

  if (that.options_.useTransform) {
    that.scroller_.style[hw.ui.scroll.Env.transform] =
      hw.ui.scroll.Env.trnOpen + '0,0' + hw.ui.scroll.Env.trnClose;
  } else {
    that.scroller_.style.cssText += ';position:absolute;top:0;left:0';
  }

  if (that.options_.useTransition) {
    that.options_.fixedScrollbar = true;
  }

  that.refresh();
  that.bind_(hw.ui.scroll.Env.RESIZE_EV, this.win_);
  that.bind_(hw.ui.scroll.Env.START_EV);
  if (!hw.ui.scroll.Env.hasTouch) {
    that.bind_('mouseout', that.wrapper_);
    that.bind_(hw.ui.scroll.Env.WHEEL_EV);
  }

  if (that.options_.checkDOMChanges) {
    that.checkDOMTime_ = this.win_.setInterval(function () {
      that.checkDOMChanges_();
    }, 500);
  }
};

/**
 * @private
 */
hw.others.IScroll.prototype.checkDOMChanges_ = function () {
  if (this.moved_ ||
    this.zoomed_ ||
    this.animating_ ||
    ((this.scrollerW_ == this.scroller_.offsetWidth * this.scale_) &&
      (this.scrollerH_ == this.scroller_.offsetHeight * this.scale_))) {
    return;
  }
  this.refresh();
};


/**
 * @private
 * @param {string} dir
 */
hw.others.IScroll.prototype.scrollbar_ = function (dir) {
  var that = this;
  var doc = this.doc_;
  var m = Math;
  var bar;
  var isH = (dir == 'h');
  var isV = !isH;

  var elScrollbarWrapper = isH ?
    that.hScrollbarWrapper_ : that.vScrollbarWrapper_;

  var elScrollbarIndicator = isH ?
    that.hScrollbarIndicator_ : that.vScrollbarIndicator_;

  if ((isH && !that.hScrollbar_) || (isV && !that.vScrollbar_)) {
    if (elScrollbarWrapper) {
      if (hw.ui.scroll.Env.hasTransform) {
        elScrollbarIndicator.style[hw.ui.scroll.Env.transform] = '';
      }
      elScrollbarWrapper.parentNode.removeChild(elScrollbarWrapper);
      if (isV) {
        that.vScrollbarWrapper_ = null;
        that.vScrollbarIndicator_ = null;
      } else if (isH) {
        that.hScrollbarWrapper_ = null;
        that.hScrollbarIndicator_ = null;
      }
    }
    return;
  }

  if (!elScrollbarWrapper) {
    // Create the scrollbar wrapper_
    bar = doc.createElement('div');

    if (that.options_.scrollbarClass) {
      bar.className = that.options_.scrollbarClass + dir.toUpperCase();
    }
    else {
      bar.style.cssText = 'position:absolute;z-index:100;' +
        (dir == 'h' ? 'height:7px;bottom:1px;left:2px;right:' +
          (that.vScrollbar_ ? '7' : '2') +
          'px' : 'width:7px;bottom:' +
          (that.hScrollbar_ ? '7' : '2') +
          'px;top:2px;right:1px');
    }

    bar.style.cssText += ';pointer-events:none;-' + hw.ui.scroll.Env.vendor +
      '-transition-property:opacity;-' + hw.ui.scroll.Env.vendor +
      '-transition-duration:' +
      (that.options_.fadeScrollbar ? '350ms' : '0') +
      ';overflow:hidden;opacity:' +
      (that.options_.hideScrollbar ? '0' : '1');

    that.wrapper_.appendChild(bar);
    elScrollbarWrapper = bar;

    // Create the scrollbar indicator
    bar = doc.createElement('div');
    if (!that.options_.scrollbarClass) {
      bar.style.cssText = 'position:absolute;z-index:100;' +
        'background:rgba(0,0,0,0.5);' +
        'border:1px solid rgba(255,255,255,0.9);-' +
        hw.ui.scroll.Env.vendor +
        '-background-clip:padding-box;-' +
        hw.ui.scroll.Env.vendor +
        '-box-sizing:border-box;' +
        (dir == 'h' ? 'height:100%' : 'width:100%') +
        ';-' +
        hw.ui.scroll.Env.vendor + '-border-radius:3px;border-radius:3px';
    }

    bar.style.cssText += ';pointer-events:none;-' + hw.ui.scroll.Env.vendor +
      '-transition-property:-' + hw.ui.scroll.Env.vendor + '-transform;-' +
      hw.ui.scroll.Env.vendor +
      '-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-' +
      hw.ui.scroll.Env.vendor +
      '-transition-duration:0;-' + hw.ui.scroll.Env.vendor + '-transform:' +
      hw.ui.scroll.Env.trnOpen + '0,0' + hw.ui.scroll.Env.trnClose;

    if (that.options_.useTransition) {
      bar.style.cssText += ';-' +
        hw.ui.scroll.Env.vendor +
        '-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)';
    }

    elScrollbarWrapper.appendChild(bar);
    elScrollbarIndicator = bar;
  }
  if (isH) {
    that.hScrollbarWrapper_ = elScrollbarWrapper;
    that.hScrollbarIndicator_ = elScrollbarIndicator;
    that.hScrollbarSize_ = that.hScrollbarWrapper_.clientWidth;
    that.hScrollbarIndicatorSize_ = Math.max(
      Math.round(that.hScrollbarSize_ * that.hScrollbarSize_ / that.scrollerW_),
      8);
    that.hScrollbarIndicator_.style.width =
      that.hScrollbarIndicatorSize_ + 'px';
    that.hScrollbarMaxScroll_ =
      that.hScrollbarSize_ - that.hScrollbarIndicatorSize_;
    that.hScrollbarProp_ = that.hScrollbarMaxScroll_ / that.maxScrollX_;
  } else {
    that.vScrollbarWrapper_ = elScrollbarWrapper;
    that.vScrollbarIndicator_ = elScrollbarIndicator;
    that.vScrollbarSize_ = that.vScrollbarWrapper_.clientHeight;
    that.vScrollbarIndicatorSize_ = Math.max(
      Math.round(that.vScrollbarSize_ * that.vScrollbarSize_ / that.scrollerH_),
      8);
    that.vScrollbarIndicator_.style.height =
      that.vScrollbarIndicatorSize_ + 'px';
    that.vScrollbarMaxScroll_ =
      that.vScrollbarSize_ - that.vScrollbarIndicatorSize_;
    that.vScrollbarProp_ = that.vScrollbarMaxScroll_ / that.maxScrollY_;
  }

  // Reset position
  that._scrollbarPos(dir, true);
};


/**
 * @private
 */
hw.others.IScroll.prototype.resize_ = function () {
  var that = this;
  that.win_.setTimeout(function () {
    that.refresh();
  }, hw.ui.scroll.Env.isAndroid ? 200 : 0);
};


/**
 * @param {number} x
 * @param {number} y
 * @private
 */
hw.others.IScroll.prototype.pos_ = function (x, y) {
  x = this.hScroll_ ? x : 0;
  y = this.vScroll_ ? y : 0;
  if (this.options_.useTransform) {
    this.scroller_.style[hw.ui.scroll.Env.transform] =
      hw.ui.scroll.Env.trnOpen + x + 'px,' + y + 'px' +
        hw.ui.scroll.Env.trnClose + ' scale(' + this.scale_ + ')';
  } else {
    x = Math.round(x);
    y = Math.round(y);
    this.scroller_.style.left = x + 'px';
    this.scroller_.style.top = y + 'px';
  }

  this.x_ = x;
  this.y_ = y;

  this._scrollbarPos('h');
  this._scrollbarPos('v');
};


/**
 * @param {string} dir
 * @param {boolean=} hidden
 */
hw.others.IScroll.prototype._scrollbarPos = function (dir, hidden) {
  var that = this;
  var isH = (dir == 'h');
  var pos = isH ? that.x_ : that.y_;
  var size;
  var elScrollbarWrapper = isH ?
    that.hScrollbarWrapper_ : that.vScrollbarWrapper_;
  var elScrollbarIndicator = isH ?
    that.hScrollbarIndicator_ : that.vScrollbarIndicator_;
  var bScrollbar = isH ?
    that.hScrollbar_ : that.vScrollbar_;
  var nScrollbarProp = isH ?
    that.hScrollbarProp_ : that.vScrollbarProp_;
  var nScrollbarIndicatorSize = isH ?
    that.hScrollbarIndicatorSize_ : that.vScrollbarIndicatorSize_;
  var nScrollbarMaxScroll = isH ?
    that.hScrollbarMaxScroll_ : that.vScrollbarMaxScroll_;
  if (!bScrollbar) {
    return;
  }

  pos = nScrollbarProp * pos;

  if (pos < 0) {
    if (!that.options_.fixedScrollbar) {
      size = nScrollbarIndicatorSize + Math.round(pos * 3);
      if (size < 8) size = 8;
      elScrollbarIndicator.style[dir == 'h' ? 'width' : 'height'] = size + 'px';
    }
    pos = 0;
  } else if (pos > nScrollbarMaxScroll) {
    if (!that.options_.fixedScrollbar) {
      size = nScrollbarIndicatorSize -
        Math.round((pos - nScrollbarMaxScroll) * 3);
      if (size < 8) {
        size = 8;
      }
      elScrollbarIndicator.style[dir == 'h' ? 'width' : 'height'] = size + 'px';
      pos = nScrollbarMaxScroll + (nScrollbarIndicatorSize - size);
    } else {
      pos = nScrollbarMaxScroll;
    }
  }

  elScrollbarWrapper.style[hw.ui.scroll.Env.vendor + 'TransitionDelay'] = '0';

  elScrollbarWrapper.style.opacity =
    hidden && that.options_.hideScrollbar ? '0' : '1';

  elScrollbarIndicator.style[hw.ui.scroll.Env.transform] =
    hw.ui.scroll.Env.trnOpen +
      (dir == 'h' ? pos + 'px,0' : '0,' + pos + 'px') +
      hw.ui.scroll.Env.trnClose;
};


/**
 * @param {Event} e
 * @private
 */
hw.others.IScroll.prototype.start_ = function (e) {
  var win = this.win_;
  var touches = e.touches;
  var that = this,
    point = hw.ui.scroll.Env.hasTouch ? touches[0] : e,
    matrix, x, y,
    c1, c2;

  if (!that.enabled_) {
    return;
  }

  if (that.options_.onBeforeScrollStart) {
    that.options_.onBeforeScrollStart.call(that, e);
  }

  if (that.options_.useTransition || that.options_.zoom) {
    that.transitionTime_(0);
  }

  that.moved_ = false;
  that.animating_ = false;
  that.zoomed_ = false;
  that.distX_ = 0;
  that.distY_ = 0;
  that.absDistX_ = 0;
  that.absDistY_ = 0;
  that.dirX_ = 0;
  that.dirY_ = 0;

  // Gesture start
  if (that.options_.zoom && hw.ui.scroll.Env.hasTouch && touches.length > 1) {
    c1 = Math.abs(touches[0].pageX - touches[1].pageX);
    c2 = Math.abs(touches[0].pageY - touches[1].pageY);
    that.touchesDistStart = Math.sqrt(c1 * c1 + c2 * c2);

    that.originX = Math.abs(
      touches[0].pageX + touches[1].pageX - that.wrapperOffsetLeft * 2) / 2 -
      that.x_;

    that.originY = Math.abs(
      touches[0].pageY + touches[1].pageY - that.wrapperOffsetTop * 2) / 2 -
      that.y_;

    if (that.options_.onZoomStart) that.options_.onZoomStart.call(that, e);
  }

  if (that.options_.momentum) {
    if (that.options_.useTransform) {
      // Very lame general purpose alternative to CSSMatrix
      var transform = win.getComputedStyle(that.scroller_, null);
      matrix = transform[hw.ui.scroll.Env.transform].replace(/[^0-9-.,]/g, '').split(',');
      x = matrix[4] * 1;
      y = matrix[5] * 1;
    } else {
      var oComputedStyle = win.getComputedStyle(that.scroller_, null);
      var reNum = /[^0-9-]/g;
      var sEmpty = '';
      x = oComputedStyle.left.replace(reNum, sEmpty) * 1;
      y = oComputedStyle.top.replace(reNum, sEmpty) * 1;
    }

    if (x != that.x_ || y != that.y_) {
      if (that.options_.useTransition) {
        that.unbind_(hw.ui.scroll.Env.TRANSITION_END_EV);
      } else {
        hw.ui.scroll.Env.cancelFrame(that.aniTime_);
      }
      that.steps_ = [];
      that.pos_(x, y);
    }
  }

  that.absStartX_ = that.x_;	// Needed by snap threshold
  that.absStartY_ = that.y_;

  that.startX_ = that.x_;
  that.startY_ = that.y_;
  that.pointX_ = point.pageX;
  that.pointY_ = point.pageY;

  that.startTime_ = e.timeStamp || (new Date()).getTime();

  if (that.options_.onScrollStart) {
    that.options_.onScrollStart.call(that, e, that);
  }

  that.bind_(hw.ui.scroll.Env.MOVE_EV);
  that.bind_(hw.ui.scroll.Env.END_EV);
  that.bind_(hw.ui.scroll.Env.CANCEL_EV);
};

hw.others.IScroll.prototype._move = function (e) {
  var touches = e.touches;
  var that = this,
    point = hw.ui.scroll.Env.hasTouch ? touches[0] : e,
    deltaX = point.pageX - that.pointX_,
    deltaY = point.pageY - that.pointY_,
    newX = that.x_ + deltaX,
    newY = that.y_ + deltaY,
    c1, c2, scale,
    timestamp = e.timeStamp || (new Date()).getTime();

  if (that.options_.onBeforeScrollMove) {
    that.options_.onBeforeScrollMove.call(that, e);
  }

  // Zoom
  if (that.options_.zoom && hw.ui.scroll.Env.hasTouch && touches.length > 1) {
    c1 = Math.abs(touches[0].pageX - touches[1].pageX);
    c2 = Math.abs(touches[0].pageY - touches[1].pageY);
    that.touchesDist = Math.sqrt(c1 * c1 + c2 * c2);

    that.zoomed_ = true;

    scale = 1 / that.touchesDistStart * that.touchesDist * this.scale_;

    if (scale < that.options_.zoomMin) {
      scale = 0.5 * that.options_.zoomMin *
        Math.pow(2.0, scale / that.options_.zoomMin);
    } else if (scale > that.options_.zoomMax) {
      scale = 2.0 * that.options_.zoomMax *
        Math.pow(0.5, that.options_.zoomMax / scale);
    }

    that.lastScale = scale / this.scale_;

    newX = this.originX - this.originX * that.lastScale + this.x_,
      newY = this.originY - this.originY * that.lastScale + this.y_;

    this.scroller_.style[hw.ui.scroll.Env.transform] =
      hw.ui.scroll.Env.trnOpen + newX + 'px,' +
        newY + 'px' + hw.ui.scroll.Env.trnClose + ' scale(' + scale + ')';

    if (that.options_.onZoom) that.options_.onZoom.call(that, e);
    return;
  }

  that.pointX_ = point.pageX;
  that.pointY_ = point.pageY;

  // Slow down if outside of the boundaries
  if (newX > 0 || newX < that.maxScrollX_) {
    newX = that.options_.bounce ?
      that.x_ + (deltaX / 2) :
      newX >= 0 || that.maxScrollX_ >= 0 ? 0 : that.maxScrollX_;
  }
  if (newY > that.minScrollY_ || newY < that.maxScrollY_) {
    newY = that.options_.bounce ?
      that.y_ + (deltaY / 2) :
      newY >= that.minScrollY_ || that.maxScrollY_ >= 0 ?
        that.minScrollY_ :
        that.maxScrollY_;
  }

  if (that.absDistX_ < 6 && that.absDistY_ < 6) {
    that.distX_ += deltaX;
    that.distY_ += deltaY;
    that.absDistX_ = Math.abs(that.distX_);
    that.absDistY_ = Math.abs(that.distY_);

    return;
  }

  // Lock direction
  if (that.options_.lockDirection) {
    if (that.absDistX_ > that.absDistY_ + 5) {
      newY = that.y_;
      deltaY = 0;
    } else if (that.absDistY_ > that.absDistX_ + 5) {
      newX = that.x_;
      deltaX = 0;
    }
  }

  that.moved_ = true;
  that.pos_(newX, newY);
  that.dirX_ = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
  that.dirY_ = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

  if (timestamp - that.startTime_ > 300) {
    that.startTime_ = timestamp;
    that.startX_ = that.x_;
    that.startY_ = that.y_;
  }

  if (that.options_.onScrollMove) {
    that.options_.onScrollMove.call(that, e, that);
  }
};


/**
 * @param {Event} e
 * @private
 */
hw.others.IScroll.prototype.end_ = function (e) {
  var touches = e.touches;
  if (hw.ui.scroll.Env.hasTouch && touches.length != 0) {
    return;
  }

  var that = this,
    point = hw.ui.scroll.Env.hasTouch ? e.changedTouches[0] : e,
    target, ev,
    momentumX = { dist:0, time:0 },
    momentumY = { dist:0, time:0 },
    duration = (e.timeStamp || (new Date()).getTime()) - that.startTime_,
    newPosX = that.x_,
    newPosY = that.y_,
    distX, distY,
    newDuration,
    scale;

  that.unbind_(hw.ui.scroll.Env.MOVE_EV);
  that.unbind_(hw.ui.scroll.Env.END_EV);
  that.unbind_(hw.ui.scroll.Env.CANCEL_EV);

  if (that.options_.onBeforeScrollEnd) that.options_.onBeforeScrollEnd.call(that, e);

  if (that.zoomed_) {
    scale = that.scale_ * that.lastScale;
    scale = Math.max(that.options_.zoomMin, scale);
    scale = Math.min(that.options_.zoomMax, scale);
    that.lastScale = scale / that.scale_;
    that.scale_ = scale;

    that.x_ = that.originX - that.originX * that.lastScale + that.x_;
    that.y_ = that.originY - that.originY * that.lastScale + that.y_;
    var oScrollerStyle = that.scroller_.style;
    oScrollerStyle[hw.ui.scroll.Env.transitionDuration] = '200ms';
    oScrollerStyle[hw.ui.scroll.Env.transform] =
      hw.ui.scroll.Env.trnOpen + that.x_ + 'px,' +
        that.y_ + 'px' + hw.ui.scroll.Env.trnClose + ' scale(' + that.scale_ + ')';

    that.zoomed_ = false;
    that.refresh();

    if (that.options_.onZoomEnd) that.options_.onZoomEnd.call(that, e);
    return;
  }

  if (!that.moved_) {
    if (hw.ui.scroll.Env.hasTouch) {
      if (that.doubleTapTimer && that.options_.zoom) {
        // Double tapped
        that.win_.clearTimeout(that.doubleTapTimer);
        that.doubleTapTimer = null;
        if (that.options_.onZoomStart) {
          that.options_.onZoomStart.call(that, e);
        }
        that.zoom(
          that.pointX_,
          that.pointY_,
          that.scale_ == 1 ? that.options_.doubleTapZoom : 1);

        if (that.options_.onZoomEnd) {
          that.win_.setTimeout(function() {
            that.options_.onZoomEnd.call(that, e);
          }, 200); // 200 is default zoom duration
        }
      } else {
        that.doubleTapTimer = that.win_.setTimeout(function () {
          that.doubleTapTimer = null;

          // Find the last touched element
          target = point.target;
          while (target.nodeType != 1) {
            target = target.parentNode;
          }

          if (target.tagName != 'SELECT' &&
            target.tagName != 'INPUT' &&
            target.tagName != 'TEXTAREA') {
            ev = document.createEvent('MouseEvents');
            ev.initMouseEvent('click', true, true, e.view, 1,
              point.screenX, point.screenY, point.clientX, point.clientY,
              e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
              0, null);
            ev._fake = true;
            target.dispatchEvent(ev);
          }
        }, that.options_.zoom ? 250 : 0);
      }
    }

    that.resetPos_(200);

    if (that.options_.onTouchEnd) {
      that.options_.onTouchEnd.call(that, e);
    }
    return;
  }

  if (duration < 300 && that.options_.momentum) {
    momentumX = newPosX ?
      that.momentum_(
        newPosX - that.startX_,
        duration, -that.x_,
        that.scrollerW_ - that.wrapperW_ + that.x_,
        that.options_.bounce ? that.wrapperW_ : 0) :
      momentumX;

    momentumY = newPosY ?
      that.momentum_(
        newPosY - that.startY_,
        duration,
        -that.y_,
        (that.maxScrollY_ < 0 ?
          that.scrollerH_ - that.wrapperH_ + that.y_ - that.minScrollY_ :
          0),
        that.options_.bounce ?
          that.wrapperH_ :
          0) :
      momentumY;

    newPosX = that.x_ + momentumX.dist;
    newPosY = that.y_ + momentumY.dist;

    if ((that.x_ > 0 && newPosX > 0) ||
      (that.x_ < that.maxScrollX_ && newPosX < that.maxScrollX_)) {
      momentumX = { dist:0, time:0 };
    }

    if ((that.y_ > that.minScrollY_ && newPosY > that.minScrollY_) ||
      (that.y_ < that.maxScrollY_ && newPosY < that.maxScrollY_)) {
      momentumY = { dist:0, time:0 };
    }
  }

  if (momentumX.dist || momentumY.dist) {
    var m = Math;
    newDuration = Math.max(Math.max(momentumX.time, momentumY.time), 10);

    // Do we need to snap?
    if (that.options_.snap) {
      distX = newPosX - that.absStartX_;
      distY = newPosY - that.absStartY_;
      if (Math.abs(distX) < that.options_.snapThreshold &&
        Math.abs(distY) < that.options_.snapThreshold) {
        that.scrollTo(that.absStartX_, that.absStartY_, 200);
      }
      else {
        var snap = that.snap_(newPosX, newPosY);
        newPosX = snap.x;
        newPosY = snap.y;
        newDuration = Math.max(snap.time, newDuration);
      }
    }

    that.scrollTo(newPosX, newPosY, newDuration);

    if (that.options_.onTouchEnd) that.options_.onTouchEnd.call(that, e);
    return;
  }

  // Do we need to snap?
  if (that.options_.snap) {
    distX = newPosX - that.absStartX_;
    distY = newPosY - that.absStartY_;
    if (Math.abs(distX) < that.options_.snapThreshold &&
      Math.abs(distY) < that.options_.snapThreshold) {
      that.scrollTo(that.absStartX_, that.absStartY_, 200);
    } else {
      snap = that.snap_(that.x_, that.y_);
      if (snap.x != that.x_ || snap.y != that.y_) {
        that.scrollTo(snap.x, snap.y, snap.time);
      }
    }

    if (that.options_.onTouchEnd) {
      that.options_.onTouchEnd.call(that, e);
    }
    return;
  }

  that.resetPos_(200);
  if (that.options_.onTouchEnd) {
    that.options_.onTouchEnd.call(that, e);
  }
};


/**
 * @param {number} time
 * @private
 */
hw.others.IScroll.prototype.resetPos_ = function (time) {
  var that = this,
    resetX = that.x_ >= 0 ?
      0 : that.x_ < that.maxScrollX_ ?
      that.maxScrollX_ :
      that.x_;

  var resetY = that.y_ >= that.minScrollY_ || that.maxScrollY_ > 0 ?
    that.minScrollY_ :
    that.y_ < that.maxScrollY_ ?
      that.maxScrollY_ :
      that.y_;

  if (resetX == that.x_ && resetY == that.y_) {
    if (that.moved_) {
      that.moved_ = false;
      if (that.options_.onScrollEnd) {
        // Execute custom code on scroll end
        that.options_.onScrollEnd.call(that, that);
      }
    }

    if (that.hScrollbar_ && that.options_.hideScrollbar) {
      if (hw.ui.scroll.Env.vendor == 'webkit') {
        that.hScrollbarWrapper_.style[hw.ui.scroll.Env.transitionDelay] =
          '300ms';
      }
      that.hScrollbarWrapper_.style.opacity = '0';
    }
    if (that.vScrollbar_ && that.options_.hideScrollbar) {
      if (hw.ui.scroll.Env.vendor == 'webkit') {
        that.vScrollbarWrapper_.style[hw.ui.scroll.Env.transitionDelay] =
          '300ms';
      }
      that.vScrollbarWrapper_.style.opacity = '0';
    }

    return;
  }

  that.scrollTo(resetX, resetY, time || 0);
};

/**
 * @private
 * @param {Event} e
 */
hw.others.IScroll.prototype.wheel_ = function (e) {
  var that = this,
    wheelDeltaX, wheelDeltaY,
    deltaX, deltaY,
    deltaScale;

  if ('wheelDeltaX' in e) {
    wheelDeltaX = e.wheelDeltaX / 12;
    wheelDeltaY = e.wheelDeltaY / 12;
  } else if ('detail' in e) {
    wheelDeltaX = wheelDeltaY = -e.detail * 3;
  } else {
    wheelDeltaX = wheelDeltaY = -e.wheelDelta;
  }

  if (that.options_.wheelAction == 'zoom') {
    deltaScale = that.scale_ * Math.pow(
      2,
      1 / 3 * (wheelDeltaY ? wheelDeltaY / Math.abs(wheelDeltaY) : 0));
    if (deltaScale < that.options_.zoomMin) deltaScale = that.options_.zoomMin;
    if (deltaScale > that.options_.zoomMax) deltaScale = that.options_.zoomMax;

    if (deltaScale != that.scale_) {
      if (!that.wheelZoomCount_ && that.options_.onZoomStart) {
        that.options_.onZoomStart.call(that, e);
      }
      that.wheelZoomCount_++;
      that.zoom(e.pageX, e.pageY, deltaScale, 400);
      that.win_.setTimeout(function() {
        that.wheelZoomCount_--;
        if (!that.wheelZoomCount_ && that.options_.onZoomEnd) {
          that.options_.onZoomEnd.call(that, e);
        }
      }, 400);
    }

    return;
  }

  deltaX = that.x_ + wheelDeltaX;
  deltaY = that.y_ + wheelDeltaY;

  if (deltaX > 0) {
    deltaX = 0;
  } else if (deltaX < that.maxScrollX_) {
    deltaX = that.maxScrollX_;
  }

  if (deltaY > that.minScrollY_) {
    deltaY = that.minScrollY_;
  } else if (deltaY < that.maxScrollY_) {
    deltaY = that.maxScrollY_;
  }

  that.scrollTo(deltaX, deltaY, 0);
};


/**
 * @param {Event} e
 * @private
 */
hw.others.IScroll.prototype.mouseout_ = function (e) {
  var t = e.relatedTarget;

  if (!t) {
    this.end_(e);
    return;
  }

  while (t = t.parentNode) if (t == this.wrapper_) return;

  this.end_(e);
};


/**
 * @private
 * @param {Event} e
 */
hw.others.IScroll.prototype.transitionEnd_ = function (e) {
  var that = this;
  if (e.target != that.scroller_) {
    return;
  }
  that.unbind_(hw.ui.scroll.Env.TRANSITION_END_EV);
  that.startAni_();
};


/**
 * @private
 */
hw.others.IScroll.prototype.startAni_ = function () {
  var that = this,
    startX = that.x_, startY = that.y_,
    startTime = (new Date).getTime(),
    step, easeOut;

  if (that.animating_) return;

  if (!that.steps_.length) {
    that.resetPos_(400);
    return;
  }

  step = that.steps_.shift();

  if (step.x == startX && step.y == startY) {
    step.time = 0;
  }

  that.animating_ = true;
  that.moved_ = true;

  if (that.options_.useTransition) {
    that.transitionTime_(step.time);
    that.pos_(step.x, step.y);
    that.animating_ = false;
    if (step.time) that.bind_(hw.ui.scroll.Env.TRANSITION_END_EV);
    else that.resetPos_(0);
    return;
  }

  var animate = function () {
    var now = (new Date).getTime(),
      newX, newY;

    if (now >= startTime + step.time) {
      that.pos_(step.x, step.y);
      that.animating_ = false;
      if (that.options_.onAnimationEnd) that.options_.onAnimationEnd.call(that);			// Execute custom code on animation end
      that.startAni_();
      return;
    }

    now = (now - startTime) / step.time - 1;
    easeOut = Math.sqrt(1 - now * now);
    newX = (step.x - startX) * easeOut + startX;
    newY = (step.y - startY) * easeOut + startY;
    that.pos_(newX, newY);
    if (that.animating_) {
      that.aniTime_ = hw.ui.scroll.Env.nextFrame(animate);
    }
  };
  animate();
};


/**
 * @param {number} time
 * @private
 */
hw.others.IScroll.prototype.transitionTime_ = function (time) {
  time += 'ms';
  this.scroller_.style[hw.ui.scroll.Env.transitionDuration] = time;
  if (this.hScrollbar) {
    this.hScrollbarIndicator_.style[hw.ui.scroll.Env.transitionDuration] = time;
  }
  if (this.vScrollbar) {
    this.vScrollbarIndicator_.style[hw.ui.scroll.Env.transitionDuration] = time;
  }
};


/**
 *
 * @param {number} dist
 * @param {number} time
 * @param {number} maxDistUpper
 * @param {number} maxDistLower
 * @param {number} size
 * @return {Object}
 * @private
 */
hw.others.IScroll.prototype.momentum_ = function (dist, time, maxDistUpper,
                                                  maxDistLower, size) {
  var deceleration = 0.0006,
    speed = Math.abs(dist) / time,
    newDist = (speed * speed) / (2 * deceleration),
    newTime = 0, outsideDist = 0;

  // Proportinally reduce speed if we are outside of the boundaries
  if (dist > 0 && newDist > maxDistUpper) {
    outsideDist = size / (6 / (newDist / speed * deceleration));
    maxDistUpper = maxDistUpper + outsideDist;
    speed = speed * maxDistUpper / newDist;
    newDist = maxDistUpper;
  } else if (dist < 0 && newDist > maxDistLower) {
    outsideDist = size / (6 / (newDist / speed * deceleration));
    maxDistLower = maxDistLower + outsideDist;
    speed = speed * maxDistLower / newDist;
    newDist = maxDistLower;
  }

  newDist = newDist * (dist < 0 ? -1 : 1);
  newTime = speed / deceleration;

  return { dist: newDist, time: Math.round(newTime) };
};


/**
 * @param {Element} el
 * @private
 */
hw.others.IScroll.prototype.offset_ = function (el) {
  var left = -el.offsetLeft,
    top = -el.offsetTop;

  while (el = el.offsetParent) {
    left -= el.offsetLeft;
    top -= el.offsetTop;
  }

  if (el != this.wrapper_) {
    left *= this.scale_;
    top *= this.scale_;
  }

  return { left: left, top: top };
};


/**
 * @param {number} x
 * @param {number} y
 * @private
 */
hw.others.IScroll.prototype.snap_ = function (x, y) {
  var that = this,
    i, l,
    page, time,
    sizeX, sizeY;

  // Check page X
  page = that.pagesX_.length - 1;
  for (i = 0,l = that.pagesX_.length; i < l; i++) {
    if (x >= that.pagesX_[i]) {
      page = i;
      break;
    }
  }
  if (page == that.currPageX_ && page > 0 && that.dirX_ < 0) page--;
  x = that.pagesX_[page];
  sizeX = Math.abs(x - that.pagesX_[that.currPageX_]);
  sizeX = sizeX ? Math.abs(that.x_ - x) / sizeX * 500 : 0;
  that.currPageX_ = page;

  // Check page Y
  page = that.pagesY_.length - 1;
  for (i = 0; i < page; i++) {
    if (y >= that.pagesY_[i]) {
      page = i;
      break;
    }
  }
  if (page == that.currPageY_ && page > 0 && that.dirY_ < 0) page--;
  y = that.pagesY_[page];
  sizeY = Math.abs(y - that.pagesY_[that.currPageY_]);
  sizeY = sizeY ? Math.abs(that.y_ - y) / sizeY * 500 : 0;
  that.currPageY_ = page;

  // Snap with constant speed (proportional duration)
  var m = Math;
  time = Math.round(Math.max(sizeX, sizeY)) || 200;

  return {
    x: x,
    y: y,
    time: time
  };
};


/**
 * @param {string} type
 * @param {EventTarget=} el
 * @param {boolean=} bubble
 */
hw.others.IScroll.prototype.bind_ = function (type, el, bubble) {
  // TODO(hedger): Resolve JSC warning.
  (el || this.scroller_)['addEventListener'](type, this, !!bubble);
};


/**
 * @param {string} type
 * @param {EventTarget=} el
 * @param {boolean=} bubble
 */
hw.others.IScroll.prototype.unbind_ = function (type, el, bubble) {
  // TODO(hedger): Resolve JSC warning.
  (el || this.scroller_)['removeEventListener'](type, this, !!bubble);
};


/**
 * Public methods
 */
hw.others.IScroll.prototype.destroy = function () {
  if (this.disposed_) {
    return;
  }
  this.disposed_ = true;
  var that = this;

  that.scroller_.style[hw.ui.scroll.Env.transform] = '';

  // Remove the scrollbars
  that.hScrollbar_ = false;
  that.vScrollbar_ = false;
  that.scrollbar_('h');
  that.scrollbar_('v');

  // Remove the event listeners
  that.unbind_(hw.ui.scroll.Env.RESIZE_EV, that.win_);
  that.unbind_(hw.ui.scroll.Env.START_EV);
  that.unbind_(hw.ui.scroll.Env.MOVE_EV);
  that.unbind_(hw.ui.scroll.Env.END_EV);
  that.unbind_(hw.ui.scroll.Env.CANCEL_EV);

  if (that.options_.hasTouch) {
    that.unbind_('mouseout', that.wrapper_);
    that.unbind_(hw.ui.scroll.Env.WHEEL_EV);
  }

  if (that.options_.useTransition) {
    that.unbind_(hw.ui.scroll.Env.TRANSITION_END_EV);
  }

  if (that.options_.checkDOMChanges) {
    that.win_.clearInterval(that.checkDOMTime_);
  }

  if (that.options_.onDestroy) {
    that.options_.onDestroy.call(that);
  }
};


/**
 * refresh.
 */
hw.others.IScroll.prototype.refresh = function () {
  if (this.disposed_) {
    return;
  }

  var that = this;
  var offset;
  var pos = 0;
  var page = 0;

  if (that.scale_ < that.options_.zoomMin) that.scale_ = that.options_.zoomMin;
  that.wrapperW_ = that.wrapper_.clientWidth || 1;
  that.wrapperH_ = that.wrapper_.clientHeight || 1;

  that.minScrollY_ = -that.options_.topOffset || 0;
  that.scrollerW_ = Math.round(that.scroller_.offsetWidth * that.scale_);
  that.scrollerH_ =
    Math.round((that.scroller_.offsetHeight + that.minScrollY_) * that.scale_);
  that.maxScrollX_ = that.wrapperW_ - that.scrollerW_;
  that.maxScrollY_ = that.wrapperH_ - that.scrollerH_ + that.minScrollY_;
  that.dirX_ = 0;
  that.dirY_ = 0;

  if (that.options_.onRefresh) {
    that.options_.onRefresh.call(that);
  }

  that.hScroll_ = that.options_.hScroll && that.maxScrollX_ < 0;
  that.vScroll_ = that.options_.vScroll &&
    (!that.options_.bounceLock && !that.hScroll_ ||
      that.scrollerH_ > that.wrapperH_);


  that.hScrollbar_ = that.hScroll_ && that.options_.hScrollbar;
  that.vScrollbar_ = that.vScroll_ && that.options_.vScrollbar &&
    that.scrollerH_ > that.wrapperH_;

  offset = that.offset_(that.wrapper_);
  that.wrapperOffsetLeft = -offset.left;
  that.wrapperOffsetTop = -offset.top;

  // Prepare snap
  if (typeof that.options_.snap == 'string') {
    that.pagesX_ = [];
    that.pagesY_ = [];
    var els = that.scroller_.querySelectorAll(that.options_.snap);
    for (var i = 0,l = els.length; i < l; i++) {
      pos = that.offset_(els[i]);
      pos.left += that.wrapperOffsetLeft;
      pos.top += that.wrapperOffsetTop;
      that.pagesX_[i] = pos.left < that.maxScrollX_ ?
        that.maxScrollX_ :
        pos.left * that.scale_;
      that.pagesY_[i] = pos.top < that.maxScrollY_ ?
        that.maxScrollY_ :
        pos.top * that.scale_;
    }
  } else if (that.options_.snap) {
    that.pagesX_ = [];
    while (pos >= that.maxScrollX_) {
      that.pagesX_[page] = pos;
      pos = pos - that.wrapperW_;
      page++;
    }
    if (that.maxScrollX_ % that.wrapperW_) {
      that.pagesX_[that.pagesX_.length] =
        that.maxScrollX_ - that.pagesX_[that.pagesX_.length - 1] +
          that.pagesX_[that.pagesX_.length - 1];
    }

    pos = 0;
    page = 0;
    that.pagesY_ = [];

    while (pos >= that.maxScrollY_) {
      that.pagesY_[page] = pos;
      pos = pos - that.wrapperH_;
      page++;
    }

    if (that.maxScrollY_ % that.wrapperH_) {
      that.pagesY_[that.pagesY_.length] =
        that.maxScrollY_ - that.pagesY_[that.pagesY_.length - 1] +
          that.pagesY_[that.pagesY_.length - 1];
    }
  }
  // Prepare the scrollbars
  that.scrollbar_('h');
  that.scrollbar_('v');

  if (!that.zoomed_) {
    that.scroller_.style[hw.ui.scroll.Env.transitionDuration] = '0';
    that.resetPos_(200);
  }
};


/**
 *
 * @param {number} x
 * @param {number} y
 * @param {number=} time
 * @param {boolean=} relative
 */
hw.others.IScroll.prototype.scrollTo = function (x, y, time, relative) {
  var that = this,
    step = x,
    i, l;

  that.stop();

  if (!step.length) step = [
    { x: x, y: y, time: time, relative: relative }
  ];

  for (i = 0,l = step.length; i < l; i++) {
    if (step[i].relative) {
      step[i].x = that.x_ - step[i].x;
      step[i].y = that.y_ - step[i].y;
    }
    that.steps_.push({
      x: step[i].x,
      y: step[i].y,
      time: step[i].time || 0
    });
  }

  that.startAni_();
};


/**
 * @param {Element} el
 * @param {number=} time
 */
hw.others.IScroll.prototype.scrollToElement = function (el, time) {
  var that = this, pos;
  var m = Math;
  el = el.nodeType ?
    el :
    that.scroller_.querySelector(/** @type {string} */ (el));

  if (!el) {
    return;
  }

  pos = that.offset_(el);
  pos.left += that.wrapperOffsetLeft;
  pos.top += that.wrapperOffsetTop;

  pos.left = pos.left > 0 ?
    0 :
    pos.left < that.maxScrollX_ ?
      that.maxScrollX_ :
      pos.left;
  pos.top = pos.top > that.minScrollY_ ?
    that.minScrollY_ :
    pos.top < that.maxScrollY_ ?
      that.maxScrollY_ :
      pos.top;
  time = time === undefined ?
    Math.max(Math.abs(pos.left) * 2, Math.abs(pos.top) * 2) :
    time;

  that.scrollTo(pos.left, pos.top, time);
};


/**
 * @param {number} pageX
 * @param {number} pageY
 * @param {number} time
 */
hw.others.IScroll.prototype.scrollToPage = function (pageX, pageY, time) {
  var that = this, x, y;

  if (that.options_.snap) {
    pageX = pageX == 'next' ?
      that.currPageX_ + 1 :
      pageX == 'prev' ? that.currPageX_ - 1 : pageX;

    pageY = pageY == 'next' ?
      that.currPageY_ + 1 :
      pageY == 'prev' ? that.currPageY_ - 1 : pageY;

    pageX = pageX < 0 ?
      0 :
      pageX > that.pagesX_.length - 1 ? that.pagesX_.length - 1 : pageX;

    pageY = pageY < 0 ?
      0 :
      pageY > that.pagesY_.length - 1 ? that.pagesY_.length - 1 : pageY;

    that.currPageX_ = pageX;
    that.currPageY_ = pageY;
    x = that.pagesX_[pageX];
    y = that.pagesY_[pageY];
  } else {
    x = -that.wrapperW_ * pageX;
    y = -that.wrapperH_ * pageY;
    if (x < that.maxScrollX_) {
      x = that.maxScrollX_;
    }
    if (y < that.maxScrollY_) {
      y = that.maxScrollY_;
    }
  }

  that.scrollTo(x, y, time || 400);
};


/**
 * Disable.
 */
hw.others.IScroll.prototype.disable = function () {
  this.stop();
  this.resetPos_(0);
  this.enabled_ = false;

  // If disabled after touchstart we make sure that there are no left over
  // events
  this.unbind_(hw.ui.scroll.Env.MOVE_EV);
  this.unbind_(hw.ui.scroll.Env.END_EV);
  this.unbind_(hw.ui.scroll.Env.CANCEL_EV);
};


/**
 * enable.
 */
hw.others.IScroll.prototype.enable = function () {
  this.enabled_ = true;
};


/**
 * Stop.
 */
hw.others.IScroll.prototype.stop = function () {
  if (this.options_.useTransition) {
    this.unbind_('webkitTransitionEnd');
  } else if (this.aniTime_) {
    hw.ui.scroll.Env.cancelFrame(this.aniTime_);
    this.aniTime_ = 0;
  }
  this.steps_ = [];
  this.moved_ = false;
  this.animating_ = false;
};


/**
 * @param {number} x
 * @param {number} y
 * @param {number} scale
 * @param {number=} time
 */
hw.others.IScroll.prototype.zoom = function (x, y, scale, time) {
  var that = this,
    relScale = scale / that.scale_;

  if (!that.options_.useTransform) {
    return;
  }

  that.zoomed_ = true;
  time = time === undefined ? 200 : time;
  x = x - that.wrapperOffsetLeft - that.x_;
  y = y - that.wrapperOffsetTop - that.y_;
  that.x_ = x - x * relScale + that.x_;
  that.y_ = y - y * relScale + that.y_;

  that.scale_ = scale;
  that.refresh();

  that.x_ = that.x_ > 0 ?
    0 :
    that.x_ < that.maxScrollX_ ? that.maxScrollX_ : that.x_;

  that.y_ = that.y_ > that.minScrollY_ ?
    that.minScrollY_ :
    that.y_ < that.maxScrollY_ ? that.maxScrollY_ : that.y_;

  that.scroller_.style[hw.ui.scroll.Env.transitionDuration] = time + 'ms';
  that.scroller_.style[hw.ui.scroll.Env.transform] =
    hw.ui.scroll.Env.trnOpen + that.x_ + 'px,' + that.y_ +
      'px' + hw.ui.scroll.Env.trnClose + ' scale(' + scale + ')';
  that.zoomed_ = false;
};


/**
 * isReady
 * @return {boolean}
 */
hw.others.IScroll.prototype.isReady = function () {
  return !this.moved_ && !this.zoomed_ && !this.animating_;
};