// This file was automatically generated from base.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.feed.Base');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Base.element = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '">');
  tpl.ui.feed.Base.loading_(null, output);
  output.append('</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Base.error = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '_error" class="', CSS_FEED_ERROR, '">Oops. Something went wrong. Try again and reload later.', (opt_data.error) ? '<div class="' + CSS_FEED_ERROR_REASON + '">' + ((opt_data.type) ? soy.$$escapeHtml(opt_data.type) + '<br />' : '') + soy.$$escapeHtml(opt_data.error) + '</div>' : '', '</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Base.empty = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '_empty" class="', CSS_FEED_ITEM_EMPTY, '">No content available for now.</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Base.result = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '_result">');
  tpl.ui.feed.Base.listItems_({items: opt_data.data['data']}, output);
  output.append('</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Base.loading_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="', CSS_FEED_LOADING, '"><div class="', CSS_LOADING_INDICATIOR, '"><i class="', CSS_LOADING_INDICATIOR_L, '"></i><i class="', CSS_LOADING_INDICATIOR_M, '"></i><i class="', CSS_LOADING_INDICATIOR_R, '"></i></div></div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Base.listItems_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul>');
  var itemList58 = opt_data.items;
  var itemListLen58 = itemList58.length;
  for (var itemIndex58 = 0; itemIndex58 < itemListLen58; itemIndex58++) {
    var itemData58 = itemList58[itemIndex58];
    tpl.ui.feed.Base.listitem_({item: itemData58}, output);
  }
  output.append('</ul>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Base.listitem_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<li class="', CSS_FEED_LIST_ITEM, '"><div class="', CSS_FEED_LIST_ITEM_GRID, '"><div class="', CSS_FEED_LIST_ITEM_ROW, '"><div class="', CSS_FEED_LIST_ITEM_SIDE, '">');
  tpl.ui.feed.Base.icon_(opt_data, output);
  output.append('</div><div class="', CSS_FEED_LIST_ITEM_CONTEXT, '">');
  tpl.ui.feed.Base.likeOrComment_(opt_data, output);
  tpl.ui.feed.Base.namelink_(opt_data, output);
  tpl.ui.feed.Base.itemContent_(opt_data, output);
  output.append('</div></div></div></li>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Base.likeOrComment_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.item['actions']) {
    if (opt_data.item['actions'].length == 2) {
      output.append('<div tabindex="1" cmd="like_or_comment" class="', CSS_FEED_LIST_ITEM_LIKE_OR_RESPOND, '">');
      tpl.ui.feed.Base.likeOrCommentActions_(opt_data, output);
      output.append('</div>');
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
tpl.ui.feed.Base.likeOrCommentActions_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="', CSS_FEED_LIST_ITEM_LIKE_OR_RESPOND_POPUP, '"><a cmd="', soy.$$escapeHtml(opt_data.item['actions'][1]['name']), '" nohref="', soy.$$escapeHtml(opt_data.item['actions'][1]['link']), '" class="', LIKE_BUTTON, ' ', ICON_BUTTON, '">Like</a><a cmd="', soy.$$escapeHtml(opt_data.item['actions'][0]['name']), '" nohref="', soy.$$escapeHtml(opt_data.item['actions'][0]['link']), '" class="', ICON_BUTTON, '">Comment</a><i class="', CSS_SHADOW_LEFT, '"></i><i class="', CSS_SHADOW_RIGHT, '"></i></div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Base.namelink_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.item['from']) ? '<a href="//www.facebook.com/profile.php?id=' + soy.$$escapeHtml(opt_data.item['from']['id']) + '" class="' + CSS_FEED_LIST_ITEM_NAME_LINK + '">' + soy.$$escapeHtml(opt_data.item['from']['name']) + '</a>' : '');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Base.icon_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.item['from']) ? '<img class="' + CSS_FEED_LIST_ITEM_ICON + '" src="//graph.facebook.com/' + soy.$$escapeHtml(opt_data.item['from']['id']) + '/picture" alt=""/>' : (opt_data.item['icon']) ? '<img class="' + CSS_FEED_LIST_ITEM_ICON + '" src="' + soy.$$escapeHtml(opt_data.item['icon']) + '" alt=""/>' : '');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Base.cssImage_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class="', CSS_IMAGE, '" style="background-image:url(', soy.$$escapeHtml(opt_data.src), ')"></span>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Base.itemContent_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  switch (opt_data.item['type']) {
    case 'video':
      tpl.ui.feed.Base.videoItem_(opt_data, output);
      break;
    case 'status':
      tpl.ui.feed.Base.statusItem_(opt_data, output);
      break;
    case 'link':
      tpl.ui.feed.Base.linkItem_(opt_data, output);
      break;
    case 'photo':
      tpl.ui.feed.Base.photoItem_(opt_data, output);
      break;
    default:
      output.append('### ', soy.$$escapeHtml(opt_data.item['type']), ' ###');
  }
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Base.videoItem_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="', CSS_FEED_LIST_ITEM_VIDEO, '"><h4><a href="', soy.$$escapeHtml(opt_data.item['source']), '">', soy.$$escapeHtml(opt_data.item['name']), '</a></h4>', (opt_data.item['caption']) ? '<div class="' + CSS_FEED_LIST_ITEM_MINOR_TEXT + '">' + soy.$$escapeHtml(opt_data.item['caption']) + '</div>' : '', (opt_data.item['description']) ? '<div class="' + CSS_FEED_LIST_ITEM_VIDEO_DESCRIPTION + '">' + soy.$$escapeHtml(opt_data.item['description']) + '</div>' : '', '</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Base.statusItem_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="', CSS_FEED_LIST_ITEM_STATUS, '">', (opt_data.item['message']) ? soy.$$escapeHtml(opt_data.item['message']) : '', '</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Base.linkItem_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.item['message']) ? '<div class="' + CSS_FEED_LIST_ITEM_LINK_MESSAGE + '">' + soy.$$escapeHtml(opt_data.item['message']) + '</div>' : '', (opt_data.item['description']) ? (opt_data.item['link']) ? '<div><a href="' + soy.$$escapeHtml(opt_data.item['link']) + '">' + soy.$$escapeHtml(opt_data.item['description']) + '</a></div>' : '' : '', (opt_data.item['caption']) ? '<div class="' + CSS_FEED_LIST_ITEM_MINOR_TEXT + '">' + soy.$$escapeHtml(opt_data.item['caption']) + '</div>' : '');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Base.photoItem_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.item['link']) {
    if (opt_data.item['name']) {
      output.append('<div><a href="', soy.$$escapeHtml(opt_data.item['link']), '">', soy.$$escapeHtml(opt_data.item['name']), '</a></div>');
      if (opt_data.item['properties']) {
        var propertyList230 = opt_data.item['properties'];
        var propertyListLen230 = propertyList230.length;
        for (var propertyIndex230 = 0; propertyIndex230 < propertyListLen230; propertyIndex230++) {
          var propertyData230 = propertyList230[propertyIndex230];
          output.append((propertyData230['text']) ? ((propertyData230['name']) ? '<span>' + soy.$$escapeHtml(propertyData230['name']) + ' : </span>' : '') + ((propertyData230['href']) ? '<a href="' + soy.$$escapeHtml(propertyData230['href']) + '">' + soy.$$escapeHtml(propertyData230['text']) + '</a>' : soy.$$escapeHtml(propertyData230['text'])) + '<br />' : '');
        }
      }
    }
    output.append((opt_data.item['picture']) ? '<a href="' + soy.$$escapeHtml(opt_data.item['link']) + '" class="' + CSS_FEED_LIST_ITEM_PHOTO_LINK + '"><img src="' + soy.$$escapeHtml(opt_data.item['picture']) + '" class="' + CSS_FEED_LIST_ITEM_PHOTO_IMG + '" /></a>' : '');
  }
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.feed.Base.actions_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.item['actions']) ? (opt_data.item['actions'].length > 0) ? soy.$$escapeHtml(opt_data.item['actions'][opt_data.item['actions'].length - 1]) : '' : '');
  if (!opt_sb) return output.toString();
};
