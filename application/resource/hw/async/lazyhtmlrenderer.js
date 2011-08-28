goog.provide('hw.async.LazyHtmlRenderer');

goog.require('goog.dispose');
goog.require('goog.events.EventTarget');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.DomHelper');
goog.require('hw.async.Later');
goog.require('tpl.CSS_NAMES');

/**
 * @param {Element} parentElement
 * @param {string} html
 * @constructor
 * @extends {goog.events.EventTarget}
 * @deprecated
 */
hw.async.LazyHtmlRenderer = function(parentElement, html) {
  goog.base(this);
  var doc = goog.dom.getOwnerDocument(parentElement);
  this.dom_ = new goog.dom.DomHelper(doc);
  this.html_ = html;
  this.fragment_ = this.dom_.htmlToDocumentFragment(html);
  this.parentElement_ = parentElement;
  this.elementsToShow_ = [];
  this.later_ = new hw.async.Later(this);
  this.render_();
};
goog.inherits(hw.async.LazyHtmlRenderer, goog.events.EventTarget);


/**
 * @type {Element}
 * @private
 */
hw.async.LazyHtmlRenderer.prototype.parentElement_ = null;


/**
 * @type {?string}
 * @private
 */
hw.async.LazyHtmlRenderer.prototype.html_ = null;

/**
 * @type {Node}
 * @private
 */
hw.async.LazyHtmlRenderer.prototype.fragment_ = null;

/**
 * @type {?string}
 * @private
 */
hw.async.LazyHtmlRenderer.prototype.html_ = null;

/**
 * @type {goog.dom.DomHelper}
 * @private
 */
hw.async.LazyHtmlRenderer.prototype.dom_ = null;


/**
 * @private
 */
hw.async.LazyHtmlRenderer.prototype.limit_ = 1;


/**
 * @type {Array.<Element>}
 */
hw.async.LazyHtmlRenderer.prototype.elementsToShow_ = null;


/** @inheritDoc */
hw.async.LazyHtmlRenderer.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  this.later_.dispose();
  this.later_ = null;
  this.html_ = null;
  this.fragment_ = null;
  this.parentElement_ = null;
};

/**
 * @private
 */
hw.async.LazyHtmlRenderer.prototype.render_ = function() {
  this.fragment_ = this.dom_.createDom('test');
  this.fragment_.innerHTML = this.html_;
  var els = this.fragment_.querySelectorAll('li[defer]');
  for (var i = this.limit_, j = els.length; i < j; i++) {
    var el = els[i];
    this.elementsToShow_.push(el);
    goog.dom.classes.add(el, tpl.CSS_NAMES.CSS_VISIBILITY_HIDDEN);
  }
  this.parentElement_.innerHTML = '';
  this.parentElement_.appendChild(this.fragment_);
  this.later_.schedule(this.renderMore_, 1000);
};

/**
 * @private
 */
hw.async.LazyHtmlRenderer.prototype.renderMore_ = function() {
  if (this.isDisposed()) {
    return;
  }
  var n = 0;
  var max = Math.min(this.elementsToShow_.length, this.limit_);
  this.elementsToShow_.reverse();
  while (n < max) {
    var el = this.elementsToShow_.pop();
    goog.dom.classes.remove(el, tpl.CSS_NAMES.CSS_VISIBILITY_HIDDEN);
    n++;
  }
  this.elementsToShow_.reverse();
  if (this.elementsToShow_.length) {
    this.later_.schedule(this.renderMore_, 1000);
  } else {
    this.dispose();
  }
};
