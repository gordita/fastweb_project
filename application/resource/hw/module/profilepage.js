goog.provide('hw.module.ProfilePage');

goog.require('goog.Uri');
goog.require('hw.events.EventType');
goog.require('hw.async.ModuleLoader');
goog.require('hw.layout.StackRows');
goog.require('hw.msg');
goog.require('hw.ui.BaseComponent');
goog.require('hw.ui.BlueBar');
goog.require('hw.ui.feed.Albums');
goog.require('hw.ui.feed.Info');
goog.require('hw.ui.ProfileCard');
goog.require('hw.ui.ShareBox');
goog.require('hw.ui.Tabs');
goog.require('hw.ui.TabsView');
goog.require('hw.ui.feed.Profile');
goog.require('hw.url.Dispatcher');


/**
 * @constructor
 * @extends {hw.module.BasePage}
 */
hw.module.ProfilePage = function() {
  goog.base(this);

  var uri = hw.url.Dispatcher.getWindowUri(true);
  var userId = /** @type {string} */ (uri.getQueryData().get('id'));
  var layout = new hw.layout.StackRows();

  var bluebar = new hw.ui.BlueBar();
  layout.addToHeader(bluebar);

  var card = new hw.ui.ProfileCard(userId);
  layout.addToBody(card);

  // TODO(hedger): Don't show this unless use can actually share msg with
  // this profile.
  var sharebox = new hw.ui.ShareBox();
  layout.addToBody(sharebox);

  var tabs = (new hw.ui.Tabs()).
    addTab(hw.msg.Wall()).
    addTab(hw.msg.Info()).
    addTab(hw.msg.Photos());

  layout.addToFooter(tabs);

  var tabsView = new hw.ui.TabsView();
  layout.addToBody(tabsView);

  var profileFeed = new hw.ui.feed.Profile(userId);
  tabsView.setContent(profileFeed, 0);

  var infoFeed = new hw.ui.feed.Info(userId);
  tabsView.setContent(infoFeed, 1);

  var albumsFeed = new hw.ui.feed.Albums(userId);
  tabsView.setContent(albumsFeed, 2);

  tabsView.attach(tabs);

  this.addChild(layout);
};
goog.inherits(hw.module.ProfilePage, hw.module.BasePage);

hw.async.ModuleLoader.setLoaded(
  hw.Module.Names.ProfilePage,
  hw.module.ProfilePage);
