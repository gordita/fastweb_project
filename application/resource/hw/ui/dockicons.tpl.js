// This file was automatically generated from dockicons.tpl.
// Please don't edit this file by hand.

goog.provide('tpl.ui.DockIcons');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.DockIcons.element = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '" class="', CSS_DOCK_ICONS, '"><ul class="', CSS_DOCK_ICONS_LIST, '">');
  tpl.ui.DockIcons.icon_({text: 'News Feed', type: 'newsfeed', href: '/home'}, output);
  tpl.ui.DockIcons.icon_({text: 'Profile', type: 'profile', href: '/profile'}, output);
  tpl.ui.DockIcons.icon_({text: 'Friends', type: 'friends', href: '/friends'}, output);
  tpl.ui.DockIcons.icon_({text: 'Messages', type: 'messages', href: '/messages'}, output);
  tpl.ui.DockIcons.icon_({text: 'Places', type: 'places', href: '/places'}, output);
  tpl.ui.DockIcons.icon_({text: 'Groups', type: 'groups', href: '/groups'}, output);
  tpl.ui.DockIcons.icon_({text: 'Events', type: 'events', href: '/events'}, output);
  tpl.ui.DockIcons.icon_({text: 'Photos', type: 'photos', href: '/albums'}, output);
  tpl.ui.DockIcons.icon_({text: 'Chat', type: 'chat', href: '/chat'}, output);
  tpl.ui.DockIcons.icon_({text: 'Notes', type: 'notes', href: '/notes'}, output);
  output.append('</ul></div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
tpl.ui.DockIcons.icon_ = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<li class="', CSS_DOCK_ICON, '"><a href="', soy.$$escapeHtml(opt_data.href), '?id=me" class="', CSS_DOCK_ICON_LINK, '"><span class="icon-', soy.$$escapeHtml(opt_data.type), ' ', CSS_DOCK_ICON_IMG, '"></span><strong class="', CSS_DOCK_ICON_TEXT, '">', soy.$$escapeHtml(opt_data.text), '</strong></a></li>');
  if (!opt_sb) return output.toString();
};
