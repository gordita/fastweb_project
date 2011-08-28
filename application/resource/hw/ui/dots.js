goog.provide('hw.ui.Dots');

goog.require('goog.array');
goog.require('hw.ui.BaseComponent');
goog.require('tpl.CSS_NAMES');
goog.require('tpl.ui.Dots');


/**
 * @constructor
 * @extends {hw.ui.BaseComponent}
 */
hw.ui.Dots = function() {
  goog.base(this);
};
goog.inherits(hw.ui.Dots, hw.ui.BaseComponent);

/** @inheritDoc */
hw.ui.Dots.prototype.createTemplate = function(payload) {
  return tpl.ui.Dots.element(payload).toString();
};

/**
 * @param {number} selectedIndex
 * @param {number} size
 */
hw.ui.Dots.prototype.update = function(selectedIndex, size) {
  if (this.getElement()) {
    var html = [];
    var index = 0;
    if (size > 1) {
      while (index < size) {
        var payload = {
          selected: selectedIndex === index
        };
        html[index ] = tpl.ui.Dots.dot(payload);
        index ++;
      }
    }
    this.getElement().innerHTML = html.join('');
  }
};