// This file was automatically generated from stackrows.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.layout.StackRows');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.layout.StackRows.element = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '" class="', CSS_STACK_ROWS_LAYOUT, '"></div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.layout.StackRows.head = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="', CSS_STACK_ROWS_LAYOUT_HEAD, '"><div class="', CSS_STACK_ROWS_LAYOUT_CELL, '"><div id="', soy.$$escapeHtml(opt_data.id), '_content" class="', CSS_STACK_ROWS_LAYOUT_CONTENT, '"></div></div></div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.layout.StackRows.body = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="', CSS_STACK_ROWS_LAYOUT_BODY, '"><div class="', CSS_STACK_ROWS_LAYOUT_CELL, '"><div id="', soy.$$escapeHtml(opt_data.id), '_content" class="', CSS_STACK_ROWS_LAYOUT_CONTENT, '"></div></div></div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.layout.StackRows.foot = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="', CSS_STACK_ROWS_LAYOUT_FOOT, '"><div class="', CSS_STACK_ROWS_LAYOUT_CELL, '"><div id="', soy.$$escapeHtml(opt_data.id), '_content" class="', CSS_STACK_ROWS_LAYOUT_CONTENT, '"></div></div></div>');
  if (!opt_sb) return output.toString();
};
