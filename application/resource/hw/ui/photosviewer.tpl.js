// This file was automatically generated from photosviewer.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.PhotosViewer');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.PhotosViewer.element = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '" class="', CSS_PHOTOS_VIEWER, '"><div id="', soy.$$escapeHtml(opt_data.id), '_content" class="', CSS_PHOTOS_VIEWER_CONTENT, '"></div><div class="', CSS_PHOTOS_VIEWER_BOTTOM_BAR, '" id="', soy.$$escapeHtml(opt_data.id), '_bottom"><i id="', soy.$$escapeHtml(opt_data.id), '_prev" class="', CSS_PHOTOS_VIEWER_NAV, '" tabindex="1">&larr;</i><i id="', soy.$$escapeHtml(opt_data.id), '_next" class="', CSS_PHOTOS_VIEWER_NAV, '" tabindex="1">&rarr;</i></div></div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.PhotosViewer.empty = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '_empty" class="', CSS_PHOTOS_VIEWER_EMPTY, '">No content available for now.</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.PhotosViewer.error = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '_error" class="', CSS_PHOTOS_VIEWER_ERROR, '">Oops. Something went wrong. Try again and reload later.', (opt_data.error) ? '<div class="' + CSS_PHOTOS_VIEWER_ERROR_REASON + '">' + ((opt_data.type) ? soy.$$escapeHtml(opt_data.type) + '<br/>' : '') + soy.$$escapeHtml(opt_data.error) + '</div>' : '', '</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.PhotosViewer.photo = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '_', soy.$$escapeHtml(opt_data.elementId), '" style="width:', soy.$$escapeHtml(opt_data.width), 'px;height:', soy.$$escapeHtml(opt_data.height), 'px;left:', soy.$$escapeHtml(opt_data.left), 'px;top:', soy.$$escapeHtml(opt_data.top), ';" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" class="', CSS_PHOTOS_VIEWER_PHOTO, '"></div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.PhotosViewer.img = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<img src="', soy.$$escapeHtml(opt_data.src), '" class="', CSS_PHOTOS_VIEWER_IMG, '" />');
  if (!opt_sb) return output.toString();
};
