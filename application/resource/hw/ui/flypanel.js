goog.provide('hw.ui.FlyPanel');

goog.require('goog.array');
goog.require('goog.async.Deferred');
goog.require('goog.events.EventHandler');
goog.require('goog.style');
goog.require('hw.dom.ViewportSizeMonitor');
goog.require('hw.ui.BaseComponent');
goog.require('hw.events.EventType');
goog.require('hw.events.TouchEvent');
goog.require('hw.layout.Scroll');
goog.require('hw.ui.scroll.Env');
goog.require('hw.ui.feed.Notifications');
goog.require('tpl.CSS_NAMES');
goog.require('tpl.ui.FlyPanel');


/**
 * TODO(hedger): Make this widget more generic (not just for notifications).
 * @constructor
 * @extends {hw.ui.feed.Notifications}
 */
hw.ui.FlyPanel = function(caption) {
  // TODO(hedger): Use dynamic UserId.
  goog.base(this, 'me');
  this.caption_ = caption;
  this.touchHandler_ = new goog.events.EventHandler(this);
};
goog.inherits(hw.ui.FlyPanel, hw.ui.feed.Notifications);


/**
 * @type {string}
 * @private
 */
hw.ui.FlyPanel.prototype.caption_ = '';

/**
 * @type {Element}
 * @private
 */
hw.ui.FlyPanel.prototype.panel_ = null;


/**
 * @type {Element}
 * @private
 */
hw.ui.FlyPanel.prototype.panelCaption_ = null;

/**
 * @type {Element}
 * @private
 */
hw.ui.FlyPanel.prototype.panelBody_ = null;


/**
 * @type {boolean}
 * @private
 */
hw.ui.FlyPanel.prototype.opened_ = false;


/**
 * @type {Element}
 * @private
 */
hw.ui.FlyPanel.prototype.feedContentElement_ = null;

/**
 * @type {number}
 * @private
 */
hw.ui.FlyPanel.prototype.y_ = 0;

/**
 * @type {hw.layout.Scroll}
 * @private
 */
hw.ui.FlyPanel.prototype.scroll_ = null;


/**
 * @type {Object}
 * @private
 */
hw.ui.FlyPanel.prototype.touchContext_ = null;


/**
 * @type {Function}
 * @private
 */
hw.ui.FlyPanel.prototype.renderSuccessFeed_ = null;

/** @inheritDoc */
hw.ui.FlyPanel.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  goog.dom.removeNode(this.panel_);
  goog.dom.removeNode(this.panelBody_);
};


/** @inheritDoc */
hw.ui.FlyPanel.prototype.getContentElement = function() {
  if (!this.feedContentElement_) {
    this.feedContentElement_ = this.getDom().createDom('div');
  }
  return this.feedContentElement_;
};


/** @inheritDoc */
hw.ui.FlyPanel.prototype.createTemplate = function(payload) {
  return tpl.ui.FlyPanel.element(payload).toString();
};


/** @inheritDoc */
hw.ui.FlyPanel.prototype.getFeed = function() {
  var deferred = new goog.async.Deferred();
  hw.async.Fb.getNotificationsFeed(this.getUserId()).
    addCallback(function(results) {
      if (this.isDisposed()) {
        return;
      }
      this.createPanel_();
      this.renderSuccessFeed_ = goog.bind(deferred.callback, deferred, results);
    }, this);

  return deferred;
};


/** @inheritDoc */
hw.ui.FlyPanel.prototype.releaseElement = function() {
  goog.base(this, 'releaseElement');
  if (this.scroll_) {
    this.scroll_.dispose();
  }
  this.touchHandler_.removeAll();
};

/**
 * @private
 */
hw.ui.FlyPanel.prototype.createPanel_ = function() {
  var payload = {
    id: this.getId(),
    caption: this.caption_
  };

  var panel = this.getDom().htmlToDocumentFragment(
    tpl.ui.FlyPanel.panel(payload).toString());

  goog.dom.insertSiblingBefore(
    panel,
    this.getDom().getDocument().body.firstChild);

  this.panel_ = /** @type {Element} */ (panel);
  this.panelCaption_ = this.getInnerElement('panelCaption', true);
  this.panelBody_ = this.getInnerElement('panelBody', true);

  this.getHandler().listen(
    hw.dom.ViewportSizeMonitor.getInstance(),
    hw.events.EventType.VIEWPORT_SIZE_CHANGE,
    this.updateLayout_);

  this.updateLayout_();
  this.initTouch_();
};


/**
 * @private
 */
hw.ui.FlyPanel.prototype.initTouch_ = function() {
  this.touchHandler_.removeAll();
  this.touchHandler_.listen(
    this.panelCaption_,
    hw.events.EventType.TOUCHSTART,
    this.onTouchStart_);
};

/**
 * @private
 */
hw.ui.FlyPanel.prototype.updateLayout_ = function() {
  var viewportSize = hw.dom.ViewportSizeMonitor.getInstance().getSize();
  var bodySize = viewportSize.clone();
  bodySize.height -= (this.panelCaption_.offsetHeight - 1);
  goog.style.setSize(this.panel_, viewportSize);
  goog.style.setSize(this.getInnerElement('panelBody', true), bodySize);

  var y = this.opened_ ? 0 : bodySize.height;
  this.moveTo_(y);
  if (this.scroll_) {
    this.scroll_.refresh();
  }
};


/**
 * @private
 * @param {goog.events.BrowserEvent} evt
 */
hw.ui.FlyPanel.prototype.onTouchStart_ = function(evt) {
  this.touchHandler_.removeAll();

  goog.dom.classes.enable(
    this.panelCaption_,
    tpl.CSS_NAMES.CSS_BLUE_GRADIENT_BOX_INSET,
    true);

  this.touchHandler_.listen(
    this.getDom().getDocument(),
    hw.events.EventType.TOUCHMOVE,
    hw.ui.FlyPanel.prototype.onTouchMove_);

  this.touchHandler_.listen(
    this.getDom().getDocument(),
    hw.events.EventType.TOUCHEND,
    hw.ui.FlyPanel.prototype.onTouchEnd_);

  var touch = hw.events.TouchEvent.getTouch(evt);
  var size = hw.dom.ViewportSizeMonitor.getInstance().getSize();

  this.touchContext_ = {
    minY: 0,
    maxY: size.height - this.panelCaption_.offsetHeight + 1,
    startClientY: touch.clientY,
    startY : this.y_,
    moved: false,
    lastTouchY1 : touch.clientY,
    lastTouchY2 : touch.clientY,
    startTime: goog.now()
  };

  evt.preventDefault();
};

/**
 * @private
 * @param {goog.events.BrowserEvent} evt
 */
hw.ui.FlyPanel.prototype.onTouchMove_ = function(evt) {
  var touch = hw.events.TouchEvent.getTouch(evt);
  this.touchContext_.moved = true;
  this.touchContext_.lastTime = goog.now();
  this.touchContext_.lastTouchY2 = this.touchContext_.lastTouchY1;
  this.touchContext_.lastTouchY1 = touch.clientY;

  var deltaY = touch.clientY - this.touchContext_.startClientY;
  var newY = this.touchContext_.startY + deltaY;
  if (newY < this.touchContext_.minY) {
    newY = this.touchContext_.minY;
  } else if (newY > this.touchContext_.maxY) {
    newY = this.touchContext_.maxY;
  }
  this.moveTo_(newY);
  evt.preventDefault();
};


/**
 * @private
 * @param {goog.events.BrowserEvent} evt
 */
hw.ui.FlyPanel.prototype.onTouchEnd_ = function(evt) {
  this.touchHandler_.removeAll();
  // evt.preventDefault();


  if (!this.touchContext_.moved) {
    if ((goog.now() - this.touchContext_.startTime) < 500) {
      // Treat as CLICK.
      this.opened_ = !this.opened_;
    } else {
      // Nothing happen (such as long touch-press), exit.
      this.initTouch_();
      return;
    }
  } else {
    var speed = (
      this.touchContext_.lastTouchY1 - this.touchContext_.lastTouchY2) /
      (goog.now() - this.touchContext_.lastTime);
    if (Math.abs(speed) > 2) {
      this.opened_ = speed < 0;
    } else {
      this.opened_ = (this.y_ < this.touchContext_.maxY / 2);
    }
  }

  var endY = this.opened_ ? 0 : this.touchContext_.maxY;

  if (hw.ui.scroll.Env.has3d) {
    // TODO(hedger): Create hw.fx.WebkitTransition.
    this.panel_.style.webkitTransition =
      '-webkit-transform 300ms ease-' +
        (this.opened_ ? 'in' : 'out');
    this.touchHandler_.listenOnce(
      this.panel_,
      hw.ui.scroll.Env.TRANSITION_END_EV,
      this.onTransitionEnd_);
    this.later(this.onTransitionEnd_, 1000);
    this.later(this.moveTo_, 1, endY);
  } else {
    this.later(this.moveTo_, 1, endY);
    this.later(this.onTransitionEnd_, 2);
  }
};


/**
 * @private
 */
hw.ui.FlyPanel.prototype.onTransitionEnd_ = function() {
  if (!this.touchContext_) {
    return;
  }

  goog.dom.classes.enable(
    this.panelCaption_,
    tpl.CSS_NAMES.CSS_BLUE_GRADIENT_BOX_INSET,
    false);

  this.panel_.style.webkitTransition = '';
  this.touchContext_ = null;
  this.touchHandler_.removeAll();
  this.initTouch_();

  if (this.opened_ && !this.scroll_ && this.renderSuccessFeed_) {
    // Hack!
    this.scroll_ = new hw.layout.Scroll();
    this.scroll_.render(this.panelBody_);
    this.scroll_.getContentElement().appendChild(this.getContentElement());
    this.renderSuccessFeed_();
    this.renderSuccessFeed_ = null;
    this.scroll_.refresh();
  }
};


/**
 * @param {number} y
 * @private
 */
hw.ui.FlyPanel.prototype.moveTo_ = function(y) {
  if (this.y_ === y) {
    return;
  }
  if (hw.ui.scroll.Env.has3d) {
    this.panel_.style[hw.ui.scroll.Env.vendor + 'Transform'] =
      hw.ui.scroll.Env.trnOpen + ( '0,' + y + 'px') +
        hw.ui.scroll.Env.trnClose;
  } else {
    this.panel_.style.top = y + 'px';
  }
  this.y_ = y;
};
