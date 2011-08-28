// This file was automatically generated from msg.tpl.
// Please don't edit this file by hand.

goog.provide('hw.msg');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
hw.msg.Wall = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('Wall');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
hw.msg.Info = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('Info');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
hw.msg.Photos = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('Photos');
  if (!opt_sb) return output.toString();
};
