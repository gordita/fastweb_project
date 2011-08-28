goog.provide('hw.module.FriendsPage');

goog.require('hw.async.ModuleLoader');
goog.require('hw.config');
goog.require('hw.module.BasePage');
goog.require('hw.ui.BaseComponent');
goog.require('hw.ui.BlueBar');
goog.require('hw.layout.StackRows');
goog.require('hw.ui.SearchBox');
goog.require('hw.others.IScroll');
goog.require('hw.ui.feed.Friends');
goog.require('hw.ui.scroll.Options');
goog.require('hw.ui.scroll.Scrubber');
goog.require('hw.url.Dispatcher');


/**
 * @constructor
 * @extends {hw.module.BasePage}
 */
hw.module.FriendsPage = function() {
  goog.base(this);

  var uri = hw.url.Dispatcher.getWindowUri(true);
  var userId = /** @type {string} */ (uri.getQueryData().get('id'));

  var options = new hw.ui.scroll.Options();
  options.hScroll = false;
  options.vScrollbar = false;

  if (hw.config.ENABLE_SCRUBBER) {
    // Hack.
    // TODO(hedger): There should be a better way to bind Scrubber with Scroll.
    options.onScrollStart = goog.bind(function() {
      if (this.scrubber_) {
        this.scrubber_.setVisible(false);
      }
    }, this);

    options.onScrollEnd = goog.bind(function(iscroll) {
      if (this.scrubber_) {
        var value = this.friends_.calculateScrubberValue(-iscroll.y);
        this.scrubber_.setVisible(true);
      }
    }, this);
  }

  var layout = new hw.layout.StackRows(options);

  var bluebar = new hw.ui.BlueBar();
  layout.addToHeader(bluebar);

  var searchBox = new hw.ui.SearchBox();
  layout.addToHeader(searchBox);

  var friends = new hw.ui.feed.Friends(userId);
  layout.addToBody(friends);

  var scrubber = null;
  if (hw.config.ENABLE_SCRUBBER) {
    scrubber = new hw.ui.scroll.Scrubber(layout, friends);
    layout.addToBody(scrubber, true);
  }
  this.friends_ = friends;
  this.scrubber_ = scrubber;
  this.addChild(layout);
};
goog.inherits(hw.module.FriendsPage, hw.module.BasePage);


/**
 * @type {hw.ui.feed.Friends}
 * @private
 */
hw.module.FriendsPage.prototype.friends_ = null;

/**
 * @type {hw.ui.scroll.Scrubber}
 * @private
 */
hw.module.FriendsPage.prototype.scrubber_ = null;

hw.async.ModuleLoader.setLoaded(
  hw.Module.Names.FriendsPage,
  hw.module.FriendsPage);

