goog.provide('hw.async.ModuleLoader');

goog.require('goog.array');
goog.require('hw.Logger');
goog.require('hw.Module');
goog.require('hw.config');


/**
 * @type {Object}
 * @private
 */
hw.async.ModuleLoader.modules_ = {};


/**
 * @type {Element}
 * @private
 */
hw.async.ModuleLoader.head_ = document.getElementsByTagName('head')[0];


/**
 * @type {Array}
 * @private
 */
hw.async.ModuleLoader.queues_ = [];


/**
 * @type {string}
 * @private
 */
hw.async.ModuleLoader.loadingModuleName_ = '';


/**
 * @param {string} name
 * @param {Function} callback
 */
hw.async.ModuleLoader.load = function(name, callback) {
  hw.Logger.log('hw.async.ModuleLoader.load', name);

  if (hw.async.ModuleLoader.isLoaded(name)) {
    callback(hw.async.ModuleLoader.modules_[name], name);
    return;
  }

  if (hw.async.ModuleLoader.loadingModuleName_) {
    hw.Logger.log('hw.async.ModuleLoader.load:busy', name);
    hw.async.ModuleLoader.queues_.push({
      name: name,
      callback: callback
    });
    return;
  }


  var depNames = hw.Module.Deps[name];
  var exit = goog.array.some(depNames, function(depName) {
    if (!hw.async.ModuleLoader.isLoaded(depName)) {
      var depCallback = function() {
        hw.async.ModuleLoader.load(name, callback);
      };
      hw.async.ModuleLoader.load(depName, depCallback);
      return true;
    }
  });

  if (exit) {
    hw.Logger.log('hw.async.ModuleLoader.load:exit', name);
    return;
  }

  hw.async.ModuleLoader.loadingModuleName_ = name;
  hw.async.ModuleLoader.addScript_(name);

  var checkLoadedTimer;
  var checkCancelTimer;

  var onLoad = function() {
    window.clearInterval(checkLoadedTimer);
    window.clearTimeout(checkCancelTimer);
    if (!checkLoadedTimer) {
      return;
    }
    hw.Logger.log('hw.async.ModuleLoader.load:onload', name);
    hw.async.ModuleLoader.loadingModuleName_ = '';
    callback(hw.async.ModuleLoader.modules_[name], name);
    callback = null;
    checkLoadedTimer = 0;
    var next = hw.async.ModuleLoader.queues_.shift();
    if (next) {
      hw.async.ModuleLoader.load(next.name, next.callback);
    }
  };

  var checkLoaded = function() {
    hw.Logger.log('hw.async.ModuleLoader.load:check', name);
    if (onLoad && hw.async.ModuleLoader.isLoaded(name)) {
      onLoad();
      onLoad = null;
    }
  };
  checkLoadedTimer = window.setInterval(checkLoaded, 100);
  checkCancelTimer = window.setTimeout(function() {
    window.clearInterval(checkLoadedTimer);
    window.clearTimeout(checkCancelTimer);
    hw.Logger.log('hw.async.ModuleLoader.load:timeout', name);
    throw new Error(name);
  }, 5000);
};

/**
 * @param {string} name
 * @param {Object} module
 */
hw.async.ModuleLoader.setLoaded = function(name, module) {
  hw.Logger.log('hw.async.ModuleLoader.setLoaded', name);
  hw.async.ModuleLoader.modules_[name] = module;
};


/**
 * @param {string} name
 * @return {boolean}
 */
hw.async.ModuleLoader.isLoaded = function(name) {
  return !!(name && hw.async.ModuleLoader.modules_[name]);
};

/**
 * @param {string} name
 * @return {boolean}
 */
hw.async.ModuleLoader.isLoading = function(name) {
  return !!(name && hw.async.ModuleLoader.loadingModuleName_ === name);
};


/**
 * @param {string} name
 * @private
 */
hw.async.ModuleLoader.addScript_ = function(name) {
  var script = document.createElement('script');
  script.setAttribute('src', hw.Module.Url[name]);
  script.setAttribute('data-module', name);
  script.setAttribute('async', 'async');
  script.setAttribute('defer', 'defer');
  hw.async.ModuleLoader.head_.appendChild(script);
  hw.Logger.log('hw.async.ModuleLoader.load:src', name, script.src);
};