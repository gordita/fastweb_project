goog.provide('hw.ui.Chrome');

goog.require('goog.dispose');
goog.require('goog.dom.classes');
goog.require('hw.Logger');
goog.require('hw.async.Fb');
goog.require('hw.async.ModuleLoader');
goog.require('hw.events.AppEventTarget');
goog.require('hw.events.EventType');
goog.require('hw.layout.FullView');
goog.require('hw.ui.BaseComponent');
goog.require('hw.ui.StartScreen');
goog.require('hw.url.Dispatcher');
goog.require('hw.url.DispatcherEvent');
goog.require('tpl.CSS_NAMES');
goog.require('tpl.ui.Chrome');


/**
 * @constructor
 * @extends {hw.layout.FullView}
 */
hw.ui.Chrome = function() {
  goog.base(this);

};
goog.inherits(hw.ui.Chrome, hw.layout.FullView);

/**
 * @type {number}
 * @private
 */
hw.ui.Chrome.MIN_START_SCREEN_TIME_ = COMPILED ? 1000 : 10;

/**
 * @type {number}
 * @private
 */
hw.ui.Chrome.prototype.startScreenTime_ = 0;


/**
 * @type {hw.ui.BaseComponent}
 * @private
 */
hw.ui.Chrome.prototype.page_ = null;


/**
 * @type {string}
 * @private
 */
hw.ui.Chrome.prototype.pageCssName_ = '';

/**
 * @type {hw.ui.StartScreen}
 * @private
 */
hw.ui.Chrome.prototype.startScreen_ = null;

/**
 * @type {hw.url.Dispatcher}
 * @private
 */
hw.ui.Chrome.prototype.urlDispatcher_ = null;


/** @inheritDoc */
hw.ui.Chrome.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  goog.dispose(this.urlDispatcher_);
};


/** @inheritDoc */
hw.ui.Chrome.prototype.captureElement = function() {
  goog.base(this, 'captureElement');

  this.getHandler().listen(
    hw.events.AppEventTarget.getInstance(),
    hw.events.EventType.LOGIN,
    this.onLogin_);

  this.restart_();
};

/**
 * @private
 */
hw.ui.Chrome.prototype.onLogin_ = function() {
  this.start_();
};


/**
 * @param {boolean} enabled
 */
hw.ui.Chrome.prototype.setStartScreenEnabled_ = function(enabled) {
  if (enabled) {
    if (this.startScreen_) {
      this.removeChild(this.startScreen_);
      this.startScreen_.destroy();
    }
    this.startScreen_ = new hw.ui.StartScreen();
    this.addChild(this.startScreen_);
    this.startScreenTime_ = goog.now();
    this.startScreen_.open();
  } else {
    if (this.startScreen_) {
      this.startScreenTime_ = 0;
      this.removeChild(this.startScreen_);
      this.startScreen_.close();
      this.startScreen_ = null;
    }
  }
};


/**
 * @private
 */
hw.ui.Chrome.prototype.restart_ = function() {
  if (this.page_) {
    this.removeChild(this.page_);
    this.page_.destroy();
    this.page_ = null;
  }
  this.setStartScreenEnabled_(true);
};


/**
 * @private
 */
hw.ui.Chrome.prototype.start_ = function() {
  hw.Logger.log('hw.ui.Chrome#start_');

  this.urlDispatcher_ = new hw.url.Dispatcher(this.getDom().getWindow());

  var urls = [
    hw.Module.Names.ProfilePage, /^\/profile/g,
    hw.Module.Names.HomePage,  /^\/home/g,
    hw.Module.Names.ProfilePage, /^\/profile/g,
    hw.Module.Names.HomePage, /^\/home/g,
    hw.Module.Names.AlbumsPage, /^\/albums/g,
    hw.Module.Names.PhotosPage, /^\/album/g,
    hw.Module.Names.PhotoPage, /^\/photo/g,
    hw.Module.Names.FriendsPage, /^\/friends/g,
    hw.Module.Names.GroupsPage, /^\/groups/g,
    // TBDs.
    hw.Module.Names.TbdPage, /^\/places/g,
    hw.Module.Names.TbdPage, /^\/events/g,
    hw.Module.Names.TbdPage, /^\/chat/g,
    hw.Module.Names.TbdPage, /^\/messages/g,
    hw.Module.Names.TbdPage, /^\/notes/g,
    hw.Module.Names.DockPage, /.*/g
  ];

  for (var i = 0,j = urls.length - 1; i < j; i++) {
    var name = urls[i];
    var re = urls[i + 1];
    this.urlDispatcher_.register(name, re);
  }

  this.getHandler().listen(
    this.urlDispatcher_,
    hw.events.EventType.URL_DISPATCH,
    this.onUrlDispatch_);

  this.urlDispatcher_.startWatch();
};


/** @inheritDoc */
hw.ui.Chrome.prototype.releaseElement = function() {
  goog.base(this, 'releaseElement');
  this.urlDispatcher_.dispose();
  this.urlDispatcher_ = null;
};


/**
 * @param {hw.url.DispatcherEvent} evt
 * @private
 */
hw.ui.Chrome.prototype.onUrlDispatch_ = function(evt) {
  var name = evt.name || hw.Module.Names.HomePage;
  this.loadPage_(/** @type {string} */ (name));
};


/**
 * TODO(hedger): Page transition.
 * @param {string} name
 */
hw.ui.Chrome.prototype.loadPage_ = function(name) {
  hw.Logger.log('hw.ui.Chrome:loadPage_', name);

  var delay = Math.max(0, goog.now() - this.startScreenTime_);
  if (delay < hw.ui.Chrome.MIN_START_SCREEN_TIME_) {
    // Unsure that the screens shows at least for N secs.
    // Also preload module.
    hw.async.ModuleLoader.load(name, goog.nullFunction);
    this.later(
      this.loadPage_,
      hw.ui.Chrome.MIN_START_SCREEN_TIME_ - delay,
      name);
    return;
  }

  this.setStartScreenEnabled_(false);

  var loadingMask;
  if (this.page_) {
    loadingMask = this.lockPage_();
  }

  var callback = goog.bind(function(module, name) {
    if (loadingMask) {
      goog.dom.removeNode(loadingMask);
      loadingMask = null;
    }

    if (this.isDisposed()) {
      return;
    }

    this.setStartScreenEnabled_(false);

    if (this.page_) {
      this.unloadPage_();
    }

    this.pageCssName_ = 'chrome-' + name;
    goog.dom.classes.enable(this.getElement(), this.pageCssName_, true);
    var cs = /** @constructor */ (module);
    this.page_ = /** @type {hw.ui.BaseComponent} */ (new cs());
    this.addChild(this.page_);

    hw.events.AppEventTarget.updateLayout(this);

  }, this);


  // TODO: Show loading.
  hw.async.ModuleLoader.load(name, callback);
};


/**
 * @return {Element}
 * @private
 */
hw.ui.Chrome.prototype.lockPage_ = function() {
  var viewportSize = this.getViewportSize();
  var pageMask = this.getDom().createDom(
    'div',
    tpl.CSS_NAMES.CSS_PAGE_TO_EXIT_MASK);
  goog.style.setSize(pageMask, viewportSize);
  this.page_.releaseElements();
  goog.dom.appendChild(this.page_.getElement(), pageMask);
  this.later(function() {
    var loading = this.getDom().createDom(
      'div',
      tpl.CSS_NAMES.CSS_PAGE_TO_EXIT_MASK_LOADING);
    pageMask.appendChild(loading);
  }, 2000);
  return pageMask;
};

/**
 * @private
 */
hw.ui.Chrome.prototype.unloadPage_ = function() {
  if (!hw.config.USE_CSS_TRANSITION) {
    this.destroyPage_();
    return;
  }

  var viewportSize = this.getViewportSize();
  var pageWrapper = this.getDom().createDom(
    'div',
    tpl.CSS_NAMES.CSS_PAGE_TO_EXIT_START,
    this.page_.getElement().cloneNode(true),
    this.getDom().createDom('div', tpl.CSS_NAMES.CSS_PAGE_TO_EXIT_MASK));

  goog.dom.classes.add(pageWrapper, this.pageCssName_);
  goog.style.setSize(pageWrapper, viewportSize);
  pageWrapper.style.webkitTransition =
    '-webkit-transform 300ms ease-out';

  var killPageWrapper = function() {
    goog.dom.removeNode(pageWrapper);
    pageWrapper = null;
  };

  this.getHandler().listenOnce(
    pageWrapper,
    'webkitTransitionEnd',
    killPageWrapper);

  // Just in case transition breaks.
  this.later(killPageWrapper, 2000);

  this.getElement().appendChild(pageWrapper);
  this.destroyPage_();

  this.later(function() {
    pageWrapper.style.webkitTransform =
      'translate3d(-' + viewportSize.width + 'px,  0, 0)';
  }, 1);
};

/**
 * @private
 */
hw.ui.Chrome.prototype.destroyPage_ = function() {
  hw.Logger.log('hw.ui.Chrome#destroyPage', this.page_, this.pageCssName_);
  goog.dom.classes.enable(this.getElement(), this.pageCssName_, false);
  this.removeChild(this.page_);
  this.page_.destroy();
  this.page_ = null;
  this.pageCssName_ = '';
};