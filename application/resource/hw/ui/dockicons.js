goog.provide('hw.ui.DockIcons');

goog.require('goog.dom');
goog.require('goog.math.Size');
goog.require('goog.style');
goog.require('hw.Logger');
goog.require('hw.ui.CommandSurface');
goog.require('hw.events.AppEventTarget');
goog.require('hw.events.EventType');
goog.require('tpl.CSS_NAMES');
goog.require('tpl.ui.DockIcons');


/**
 * @constructor
 * @extends {hw.ui.CommandSurface}
 */
hw.ui.DockIcons = function() {
  goog.base(this);

};
goog.inherits(hw.ui.DockIcons, hw.ui.CommandSurface);

/** @inheritDoc */
hw.ui.DockIcons.prototype.createTemplate = function(payload) {
  return tpl.ui.DockIcons.element(payload).toString();
};

/** @inheritDoc */
hw.ui.DockIcons.prototype.captureElement = function() {
  goog.base(this, 'captureElement');

  var els = goog.dom.getElementsByClass(
    tpl.CSS_NAMES.CSS_DOCK_ICON,
    this.getElement());

  this.iconsElement_ = /** @type {Array.<Element>} */ (els);

  this.redrawIcons_();

  var win = this.getDom().getWindow();
  this.getHandler().listen(
    win, [
      goog.events.EventType.RESIZE,
      hw.events.EventType.ORIENTATION_CHANGE
    ],
    this.redrawIcons_);
};

/**
 * @type {Array.<Element>}
 * @private
 */
hw.ui.DockIcons.prototype.iconsElement_ = null;


/**
 * @private
 * @return {goog.math.Size}
 */
hw.ui.DockIcons.prototype.getIconSize_ = function() {
  if (!this.isVisible() ||
    !this.iconsElement_ ||
    !this.iconsElement_.length) {
    return new goog.math.Size(0, 0);
  }
  return goog.style.getSize(this.iconsElement_[0]);
};

/**
 * @private
 * @return {number}
 */
hw.ui.DockIcons.prototype.getIconsCount_ = function() {
  return this.iconsElement_ ? this.iconsElement_.length : 0;
};


/**
 * @private
 * @param {number} index
 * @param {number} x
 * @param {number} y
 */
hw.ui.DockIcons.prototype.setIconPosition_ = function(index, x, y) {
  // hw.Logger.log('hw.ui.DockIcons.setIconPosition_', index, x, y);
  goog.style.setStyle(this.iconsElement_[index], {
    'left': x + 'px',
    'top': y + 'px'
  });
};


/**
 * @private
 */
hw.ui.DockIcons.prototype.redrawIcons_ = function() {
  if (!this.iconsElement_ || !this.iconsElement_.length) {
    return;
  }
  var viewportSize = this.getViewportSize();
  // hw.Logger.log('hw.ui.DockIcons.redrawIcons_:viewportSize', viewportSize);
  var iconSize = this.getIconSize_();
  var maxRows;
  if (viewportSize.width >= viewportSize.height) {
    // Landscape.
    maxRows = 2;
  } else {
    // Portrait.
    maxRows = 3;
  }
  var colsLength = Math.floor(viewportSize.width / iconSize.width);
  var gapWidth = colsLength > 1 ?
    (viewportSize.width - (iconSize.width * colsLength)) / (colsLength - 1) :
    0;
  gapWidth = Math.round(gapWidth);
  var r = 1;
  var j = this.getIconsCount_();
  var x = 0;
  var y = 0;
  for (var i = 0; i < j; i++) {
    this.setIconPosition_(i, x, y);
    r++;
    if (r > maxRows) {
      r = 1;
      y = 0;

      x += iconSize.width;
      if ((viewportSize.width % x) != 0) {
        x += gapWidth;
      }

    } else {
      y += iconSize.height;
    }
  }
  var elWidth = Math.ceil((x + iconSize.width) / viewportSize.width) *
    viewportSize.width;
  var elHeight = viewportSize.height; //maxRows * iconSize.height;
  goog.style.setSize(this.getElement(), elWidth, elHeight);
  hw.events.AppEventTarget.updateLayout(this);
};
