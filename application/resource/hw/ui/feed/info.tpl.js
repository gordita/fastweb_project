// This file was automatically generated from info.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.feed.Info');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Info.result = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '_result">');
  tpl.ui.feed.Info.textItem_({label: 'Birthday', value: opt_data.data['birthday']}, output);
  tpl.ui.feed.Info.locationItem_({label: 'Location', value: opt_data.data['location']}, output);
  tpl.ui.feed.Info.objItem_({label: 'Hometown', value: opt_data.data['hometown']}, output);
  tpl.ui.feed.Info.textItem_({label: 'Web Site', value: opt_data.data['website']}, output);
  tpl.ui.feed.Info.workItem_({label: 'Work', value: opt_data.data['work']}, output);
  tpl.ui.feed.Info.eduItem_({label: 'Education', value: opt_data.data['education']}, output);
  tpl.ui.feed.Info.textItem_({label: 'Link', value: opt_data.data['link']}, output);
  tpl.ui.feed.Info.textItem_({label: 'Gender', value: opt_data.data['gender']}, output);
  output.append('</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Info.textItem_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.value) ? '<div class="' + CSS_INFO_FEED_ITEM + '"><strong class="' + CSS_INFO_FEED_ITEM_LABEL + '">' + soy.$$escapeHtml(opt_data.label) + '</strong><div>' + soy.$$escapeHtml(opt_data.value) + '</div></div>' : '');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Info.locationItem_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.value) ? '<div class="' + CSS_INFO_FEED_ITEM + '"><strong class="' + CSS_INFO_FEED_ITEM_LABEL + '">' + soy.$$escapeHtml(opt_data.label) + '</strong><div>' + ((opt_data.value['city']) ? soy.$$escapeHtml(opt_data.value['city']) : '') + ' ' + ((opt_data.value['state']) ? soy.$$escapeHtml(opt_data.value['state']) : '') + ' ' + ((opt_data.value['country']) ? soy.$$escapeHtml(opt_data.value['city']) : '') + '</div></div>' : '');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Info.objItem_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.value) ? '<div class="' + CSS_INFO_FEED_ITEM + '"><strong class="' + CSS_INFO_FEED_ITEM_LABEL + '">' + soy.$$escapeHtml(opt_data.label) + '</strong><div>' + soy.$$escapeHtml(opt_data.value['name']) + '</div></div>' : '');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Info.workItem_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.value) {
    if (opt_data.value.length > 0) {
      output.append('<div class="', CSS_INFO_FEED_ITEM, '"><strong class="', CSS_INFO_FEED_ITEM_LABEL, '">', soy.$$escapeHtml(opt_data.label), '</strong><div>');
      var workList89 = opt_data.value;
      var workListLen89 = workList89.length;
      for (var workIndex89 = 0; workIndex89 < workListLen89; workIndex89++) {
        var workData89 = workList89[workIndex89];
        output.append(soy.$$escapeHtml(workData89['employer']['name']), (! (workIndex89 == workListLen89 - 1)) ? ', ' : '');
      }
      output.append('</div></div>');
    }
  }
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Info.eduItem_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.value) {
    if (opt_data.value.length > 0) {
      output.append('<div class="', CSS_INFO_FEED_ITEM, '"><strong class="', CSS_INFO_FEED_ITEM_LABEL, '">', soy.$$escapeHtml(opt_data.label), '</strong><div>');
      var workList108 = opt_data.value;
      var workListLen108 = workList108.length;
      for (var workIndex108 = 0; workIndex108 < workListLen108; workIndex108++) {
        var workData108 = workList108[workIndex108];
        output.append(soy.$$escapeHtml(workData108['school']['name']), (! (workIndex108 == workListLen108 - 1)) ? ', ' : '');
      }
      output.append('</div></div>');
    }
  }
  if (!opt_sb) return output.toString();
};
