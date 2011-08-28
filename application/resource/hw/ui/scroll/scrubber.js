goog.provide('hw.ui.scroll.Scrubber');
goog.provide('hw.ui.scroll.Scrubber.Container');
goog.provide('hw.ui.scroll.Scrubber.Target');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.math');
goog.require('goog.Disposable');
goog.require('goog.dispose');
goog.require('hw.events.EventType');
goog.require('hw.events.TouchEvent');
goog.require('hw.ui.scroll.Env');
goog.require('tpl.CSS_NAMES');
goog.require('tpl.ui.scroll.Scrubber');


/**
 * @param {hw.ui.scroll.Scrubber.Container} container
 * @param {hw.ui.scroll.Scrubber.Target} target
 * @extends {hw.ui.BaseComponent}
 * @constructor
 */
hw.ui.scroll.Scrubber = function(container, target) {
  goog.base(this);
  this.container_ = container;
  this.target_ = target;
};
goog.inherits(hw.ui.scroll.Scrubber, hw.ui.BaseComponent);


/**
 * @type {Object}
 * @private
 */
hw.ui.scroll.Scrubber.prototype.touchContext_ = null;


/**
 * @type {number}
 * @private
 */
hw.ui.scroll.Scrubber.prototype.y_ = 0;


/**
 * @type {number}
 * @private
 */
hw.ui.scroll.Scrubber.prototype.value_ = 0;

/**
 * @type {Element}
 * @private
 */
hw.ui.scroll.Scrubber.prototype.label_ = null;

/**
 * @type {number}
 * @private
 */
hw.ui.scroll.Scrubber.prototype.iconHeight_ = 0;


/**
 * @inheritDoc
 */
hw.ui.scroll.Scrubber.prototype.createTemplate = function(payload) {
  return tpl.ui.scroll.Scrubber.element(payload).toString();
};

/**
 * @inheritDoc
 */
hw.ui.scroll.Scrubber.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};


/**
 * @param {number} value
 */
hw.ui.scroll.Scrubber.prototype.setValue = function(value) {
  this.value_ = value;
  var h = this.container_.getSrubberContainerSize().height;
  var y = Math.round(h - this.iconHeight_);
  this.moveTo_(y);
};


/**
 * @inheritDoc
 */
hw.ui.scroll.Scrubber.prototype.captureElement = function() {
  goog.base(this, 'captureElement');

  this.iconHeight_ = this.getInnerElement('icon').offsetHeight;

  var el = this.getDom().htmlToDocumentFragment(
    tpl.ui.scroll.Scrubber.label().toString());
  this.label_ = /** @type {Element} */ (el);

  this.getHandler().listen(
    this.getElement(),
    hw.events.EventType.TOUCHSTART,
    this.onTouchStart_);
};

/**
 * @inheritDoc
 */
hw.ui.scroll.Scrubber.prototype.releaseElement = function() {
  goog.base(this, 'releaseElement');
  this.setVisible(false);
};


/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
hw.ui.scroll.Scrubber.prototype.onTouchStart_ = function(evt) {
  this.getHandler().removeAll();
  var doc = this.getDom().getDocument();

  var size = this.container_.getSrubberContainerSize();

  var touch = hw.events.TouchEvent.getTouch(evt);

  if (!this.label_.parentNode) {
    this.getElement().parentNode.appendChild(this.label_);
  }

  this.label_.style.top = Math.round((size.height - 30) / 2) + 'px';
  this.label_.style.visibility = 'visible';

  this.touchContext_ = {
    minY: 0,
    maxY: size.height - this.iconHeight_,
    startClientY: touch.clientY,
    startY : this.y_
  };

  goog.dom.classes.enable(this.getElement(), tpl.CSS_NAMES.CSS_TOUCHED, true);

  this.getHandler().listen(
    doc,
    hw.events.EventType.TOUCHMOVE,
    this.onTouchMove_);

  this.getHandler().listen(
    doc,
    [hw.events.EventType.TOUCHEND, hw.events.EventType.TOUCHCANCEL],
    this.onTouchEnd_);

  evt.preventDefault();
};

/**
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
hw.ui.scroll.Scrubber.prototype.onTouchMove_ = function(evt) {
  var touch = hw.events.TouchEvent.getTouch(evt);

  var deltaY = touch.clientY - this.touchContext_.startClientY;
  var newY = this.touchContext_.startY + deltaY;
  if (newY < this.touchContext_.minY) {
    newY = this.touchContext_.minY;
  } else if (newY > this.touchContext_.maxY) {
    newY = this.touchContext_.maxY;
  }
  this.moveTo_(newY);
  var value = Math.round((newY / this.touchContext_.maxY) * 100) / 100;
  if (value > 1) {
    value = 1;
  }

  if (value != this.value_) {
    this.value_ = value;
    var containerY = this.target_.onScrubberValueChange(value, this.label_);
    if (this.containerY_ != containerY) {
      this.containerY_ = containerY;
      this.container_.scrubberContainerScrolTo(containerY);
    }
  }

  evt.preventDefault();
};


/**
 * @param evt
 * @private
 */
hw.ui.scroll.Scrubber.prototype.onTouchEnd_ = function(evt) {
  this.label_.style.visibility = '';
  this.label_.style.top = 0;

  goog.dom.classes.enable(this.getElement(), tpl.CSS_NAMES.CSS_TOUCHED, false);

  this.getHandler().removeAll();
  this.getHandler().listen(
    this.getElement(),
    hw.events.EventType.TOUCHSTART,
    this.onTouchStart_);
};

/**
 * @param {number} y
 * @private
 */
hw.ui.scroll.Scrubber.prototype.moveTo_ = function(y) {
  if (hw.ui.scroll.Env.has3d) {
    this.getElement().style[hw.ui.scroll.Env.vendor + 'Transform'] =
      hw.ui.scroll.Env.trnOpen + ( '0,' + y + 'px') +
        hw.ui.scroll.Env.trnClose;
  } else {
    this.getElement().style.top = y + 'px';
  }
  this.y_ = y;
};


/**
 * @interface
 */
hw.ui.scroll.Scrubber.Container = function() {
};

/**
 * @return {goog.math.Size}
 */
hw.ui.scroll.Scrubber.Container.prototype.getSrubberContainerSize =
  goog.abstractMethod;


/**
 * @param {number} y
 */
hw.ui.scroll.Scrubber.Container.prototype.scrubberContainerScrolTo =
  goog.abstractMethod;


/**
 * @interface
 */
hw.ui.scroll.Scrubber.Target = function() {
};

/**
 * @param {number} value
 * @param {Element} label
 * @return {number}
 */
hw.ui.scroll.Scrubber.Target.prototype.onScrubberValueChange =
  goog.abstractMethod;
