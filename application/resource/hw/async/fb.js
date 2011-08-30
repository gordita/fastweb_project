goog.provide('hw.async.Fb');

goog.require('goog.Uri');
goog.require('goog.async.Deferred');
goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.net.Cookies');
goog.require('goog.json');
goog.require('hw.Logger');
goog.require('hw.config');
goog.require('hw.mock.AlbumsFeed');
goog.require('hw.mock.CheckInsFeed');
goog.require('hw.mock.InfoFeed');
goog.require('hw.mock.FriendsFeed');
goog.require('hw.mock.GroupsFeed');
goog.require('hw.mock.NewsFeed');
goog.require('hw.mock.NotificationsFeed');
goog.require('hw.mock.PhotoFeed');
goog.require('hw.mock.PhotosFeed');
goog.require('hw.mock.ProfileFeed');
goog.require('hw.mock.User');


/**
 * @type {number}
 */
hw.async.Fb.PERMISSIONS_VERSION = hw.config.BUILD_TIME;


/**
 * @type {string}
 * @const
 */
hw.async.Fb.PERMISSIONS_VERSION_NAME = 'permv';


/**
 * @type {FbApi}
 * @private
 */
hw.async.Fb.fbApi_ = null;


/**
 * @type {string|null}
 * @private
 */
hw.async.Fb.localStorageId_ = null;


/**
 * @type {string|null}
 * @private
 */
hw.async.Fb.accessToken_ = null;


/**
 * @const
 * @type {string}
 */
hw.async.Fb.API_SRC = 'http://connect.facebook.net/en_US/all.js';


/**
 * @const
 * @type {string}
 */
hw.async.Fb.API_ID = '133383393415225';


/**
 * @const
 * @type {string}
 */
hw.async.Fb.API_SECRET = 'c4e4973212ec8cc85ed33fdbade7c324';


/**
 * @const
 * @type {Array.<string>}
 */
hw.async.Fb.permissions_ = [
  'create_event',
  'create_note',
  'export_stream',
  'friends_about_me',
  'friends_activities',
  'friends_birthday',
  'friends_checkins',
  'friends_education_history',
  'friends_events',
  'friends_groups',
  'friends_hometown',
  'friends_interests',
  'friends_likes',
  'friends_location',
  'friends_notes',
  'friends_online_presence',
  'friends_photo_video_tags',
  'friends_photos',
  'friends_relationship_details',
  'friends_relationships',
  'friends_religion_politics',
  'friends_status',
  'friends_videos',
  'friends_website',
  'friends_work_history',
  'manage_friendlists',
  'manage_notifications',
  'manage_pages',
  'photo_upload',
  'publish_checkins',
  'publish_stream',
  'read_friendlists',
  'read_insights',
  'read_mailbox',
  'read_requests',
  'read_stream',
  'rsvp_event',
  'share_item',
  'status_update',
  'user_about_me',
  'user_activities',
  'user_birthday',
  'user_checkins',
  'user_education_history',
  'user_events',
  'user_groups',
  'user_hometown',
  'user_interests',
  'user_likes',
  'user_location',
  'user_notes',
  'user_online_presence',
  'user_photo_video_tags',
  'user_photos',
  'user_relationship_details',
  'user_relationships',
  'user_religion_politics',
  'user_status',
  'user_videos',
  'user_website',
  'user_work_history',
  'video_upload'
];


/**
 * @param {string} id
 * @return {goog.async.Deferred}
 */
hw.async.Fb.getUser = function(id) {
  hw.Logger.log('hw.async.Fb.getUser', id);
  if (hw.config.USE_MOCK_DATA) {
    return hw.async.Fb.getMockData_(hw.mock.User);
  }

  var deferred = new goog.async.Deferred();
  var path = '/' + id;
  hw.async.Fb.query_(path).addCallback(function(results) {
    hw.Logger.log('hw.async.Fb.getUser:results', results);
    if (results['id']) {
      deferred.callback(results);
    } else {
      deferred.errback(results);
    }
  });
  return deferred;
};


/**
 * @param {string} id
 * @return {goog.async.Deferred}
 */
hw.async.Fb.getNotificationsFeed = function(id) {
  hw.Logger.log('hw.async.Fb.getNotificationsFeed', id);
  if (hw.config.USE_MOCK_DATA) {
    return hw.async.Fb.getMockData_(hw.mock.NotificationsFeed);
  }
  var deferred = new goog.async.Deferred();
  var path = '/' + id + '/notifications/?include_read=1';
  hw.async.Fb.query_(path).addCallback(function(results) {
    if (results['data'] && goog.isArray(results['data'])) {
      hw.Logger.log('hw.async.Fb.getNotificationsFeed:success', results);
      deferred.callback(results);
    } else {
      hw.Logger.log('hw.async.Fb.getNotificationsFeed:error', results);
      deferred.errback(results);
    }
  });
  return deferred;
};

/**
 * @param {string} id
 * @return {goog.async.Deferred}
 */
hw.async.Fb.getPhotoFeed = function(id) {
  hw.Logger.log('hw.async.Fb.getPhotoFeed', id);
  if (hw.config.USE_MOCK_DATA) {
    return hw.async.Fb.getMockData_(hw.mock.PhotoFeed);
  }
  var deferred = new goog.async.Deferred();
  var path = '/' + id;
  hw.async.Fb.query_(path).addCallback(function(results) {
    if (results['images'] && goog.isArray(results['images'])) {
      hw.Logger.log('hw.async.Fb.getPhotoFeed:pass', results);
      deferred.callback(results);
    } else {
      hw.Logger.log('hw.async.Fb.getPhotoFeed:error', results);
      deferred.errback(results);
    }
  });
  return deferred;
};

/**
 * @param {string} id
 * @return {goog.async.Deferred}
 */
hw.async.Fb.getPlacesFeed = function(id) {
  hw.Logger.log('hw.async.Fb.getPlacesFeed', id);
  if (hw.config.USE_MOCK_DATA) {
    return hw.async.Fb.getMockData_(hw.mock.CheckInsFeed);
  }
  var deferred = new goog.async.Deferred();
  var path = '/' + id + '/checkins';
  hw.async.Fb.query_(path).addCallback(function(results) {
    if (results['data'] && goog.isArray(results['data'])) {
      hw.Logger.log('hw.async.Fb.getPlacesFeed:pass', results);
      deferred.callback(results);
    } else {
      hw.Logger.log('hw.async.Fb.getPlacesFeed:error', results);
      deferred.errback(results);
    }
  });
  return deferred;
};


/**
 * @param {string} id
 * @return {goog.async.Deferred}
 */
hw.async.Fb.getPhotosFeed = function(id) {
  hw.Logger.log('hw.async.Fb.getPhotosFeed', id);
  if (hw.config.USE_MOCK_DATA) {
    return hw.async.Fb.getMockData_(hw.mock.PhotosFeed);
  }
  var deferred = new goog.async.Deferred();
  var path = '/' + id + '/photos';
  hw.async.Fb.query_(path).addCallback(function(results) {
    if (results['data'] && goog.isArray(results['data'])) {
      hw.Logger.log('hw.async.Fb.getPhotosFeed:pass', results);
      deferred.callback(results);
    } else {
      hw.Logger.log('hw.async.Fb.getPhotosFeed:error', results);
      deferred.errback(results);
    }
  });
  return deferred;
};


/**
 * @param {string} id
 * @return {goog.async.Deferred}
 */
hw.async.Fb.getGroupsFeed = function(id) {
  hw.Logger.log('hw.async.Fb.getGroupsFeed', id);
  if (hw.config.USE_MOCK_DATA) {
    return hw.async.Fb.getMockData_(hw.mock.GroupsFeed);
  }
  var deferred = new goog.async.Deferred();
  var path = '/' + id + '/groups';
  hw.async.Fb.query_(path).addCallback(function(results) {
    if (results['data'] && goog.isArray(results['data'])) {
      hw.Logger.log('hw.async.Fb.getGroupsFeed:pass', results);
      deferred.callback(results);
    } else {
      hw.Logger.log('hw.async.Fb.getGroupsFeed:error', results);
      deferred.errback(results);
    }
  });
  return deferred;
};

/**
 * @param {string} id
 * @return {goog.async.Deferred}
 */
hw.async.Fb.getAlbumsFeed = function(id) {
  hw.Logger.log('hw.async.Fb.getAlbumsFeed', id);
  if (hw.config.USE_MOCK_DATA) {
    return hw.async.Fb.getMockData_(hw.mock.AlbumsFeed);
  }
  var deferred = new goog.async.Deferred();
  var path = '/' + id + '/albums';
  hw.async.Fb.query_(path).addCallback(function(results) {
    if (results['data'] && goog.isArray(results['data'])) {
      hw.Logger.log('hw.async.Fb.getAlbumsFeed:pass', results);
      deferred.callback(results);
    } else {
      hw.Logger.log('hw.async.Fb.getAlbumsFeed:error', results);
      deferred.errback(results);
    }
  });
  return deferred;
};

/**
 * @return {goog.async.Deferred}
 */
hw.async.Fb.getNewsFeed = function() {
  hw.Logger.log('hw.async.Fb.getNewsFeed');
  if (hw.config.USE_MOCK_DATA) {
    return hw.async.Fb.getMockData_(hw.mock.NewsFeed);
  }

  var deferred = new goog.async.Deferred();
  var path = '/me/home';
  hw.async.Fb.query_(path).addCallback(
    function(results) {
      if (results['data'] && !results['error']) {
        hw.Logger.log('hw.async.Fb.getNewsFeed:pass', results);
        deferred.callback(results);
      } else {
        hw.Logger.log('hw.async.Fb.getNewsFeed:error', results);
        deferred.errback(results);
      }
    });
  return deferred;
};


/**
 * @param {string} id
 * @return {goog.async.Deferred}
 */
hw.async.Fb.getProfileFeed = function(id) {
  hw.Logger.log('hw.async.Fb.getProfileFeed');
  if (hw.config.USE_MOCK_DATA) {
    return hw.async.Fb.getMockData_(hw.mock.ProfileFeed);
  }

  var deferred = new goog.async.Deferred();
  var path = '/' + id + '/feed';
  hw.async.Fb.query_(path).addCallback(function(results) {
    if (results['data']) {
      deferred.callback(results);
    } else {
      deferred.errback(results);
    }
  });
  return deferred;
};


/**
 * @param {string} id
 * @return {goog.async.Deferred}
 */
hw.async.Fb.getInfoFeed = function(id) {
  hw.Logger.log('hw.async.Fb.getInfoFeed');
  return hw.async.Fb.getUser(id);
};


/**
 * @return {goog.async.Deferred}
 */
hw.async.Fb.addNewFriendList = function(name) {
  var deferred = new goog.async.Deferred();

  hw.async.Fb.getFbApi_().addCallback(function() {
    var params = {
      'name': name
    };

    hw.async.Fb.fbApi_.api(
      '/me/friendlists',
      'POST',
      params,
      function(result) {
        hw.Logger.log('hw.async.Fb.addNewFriendList:response', result, params);
        if (result && result['id']) {
          deferred.callback(result['id']);
        } else if (result && result['error']) {
          deferred.errback(result['error']['message']);
        } else {
          deferred.errback(result);
        }
      });
  });
  return deferred;
};


/**
 * TODO(hedger): This seem to be very slow process to check (not sure why).
 * We should cache the result aggressively or use {@link #checkLoginStatus}
 * instead.
 * @return {goog.async.Deferred}
 */
hw.async.Fb.checkPermissions = function() {
  hw.Logger.log('hw.async.Fb.checkPermissions');

  var deferred = new goog.async.Deferred();

  if (hw.config.USE_MOCK_DATA) {
    hw.Logger.log('hw.async.Fb.checkPermissions:mock', true);
    return hw.async.Fb.invokeDeferred_(deferred, true);
  }

  var cookies = new goog.net.Cookies(document);
  var cookieName = hw.async.Fb.PERMISSIONS_VERSION_NAME;
  if (cookies.get(cookieName) != hw.async.Fb.PERMISSIONS_VERSION) {
    hw.Logger.log(
      'hw.async.Fb.checkPermissions:version error',
      cookieName,
      hw.async.Fb.PERMISSIONS_VERSION);
    return hw.async.Fb.invokeDeferred_(deferred, false);
  }

  if (hw.config.CHECK_FB_PERMISSIONS_STRICT) {
    var path = '/me/permissions';
    hw.async.Fb.query_(path).addCallback(function(results) {
      if (!results ||
        results['error'] ||
        !results['data']) {
        hw.Logger.log('hw.async.Fb.checkPermissions:error', results);
        deferred.errback(results);
        return;
      }
      var perms = results['data'][0];
      if (!goog.isObject(perms)) {
        hw.Logger.log('hw.async.Fb.checkPermissions:invalid', perms);
        return;
      }

      var failure = goog.array.some(hw.async.Fb.permissions_, function(perm) {
        if (!perms[perm]) {
          hw.Logger.log('hw.async.Fb.checkPermissions:perm fail', perm, perms);
          return true
        }
      });

      if (failure) {
        deferred.errback(results);
        return;
      }

      hw.Logger.log('hw.async.Fb.checkPermissions:pass', results);
      deferred.callback(results);
    });
    return deferred;
  }
  return hw.async.Fb.invokeDeferred_(deferred, true);
};


/**
 * redirectToLogin.
 */
hw.async.Fb.redirectToLogin = function() {
  var uri = new goog.Uri('https://graph.facebook.com/oauth/authorize');
  uri.setParameterValue('response_type', 'token');
  uri.setParameterValue('client_id', hw.config.APP_ID);
  uri.setParameterValue('scope', hw.async.Fb.permissions_.join(','));
  uri.setParameterValue('redirect_uri', top.location.href);
  top.location.href = uri.toString();
};


/**
 * @param {string} id
 * @return {goog.async.Deferred}
 */
hw.async.Fb.getFriends = function(id) {
  hw.Logger.log('hw.async.Fb.getFriends', id);
  if (hw.config.USE_MOCK_DATA) {
    return hw.async.Fb.getMockData_(hw.mock.FriendsFeed);
  }
  var deferred = new goog.async.Deferred();
  hw.async.Fb.checkPermissions().addCallback(
    function(response) {
      var path = '/me/friends?fields=id,name,picture';
      hw.async.Fb.query_(path).
        addCallback(
        function(results) {
          hw.Logger.log('hw.async.Fb.getFriends:results', results);
          if (results && results['data']) {
            deferred.callback(results);
          } else {
            deferred.errback(results);
          }
        }).addErrback(
        deferred.errback, deferred);
    }).addErrback(deferred.errback, deferred);
  return deferred;
};


/**
 * @return {goog.async.Deferred}
 */
hw.async.Fb.getLoginStatus = function() {
  hw.Logger.log('hw.async.Fb.getLoginStatus');
  var deferred = new goog.async.Deferred();

  var cookies = new goog.net.Cookies(document);
  var cookieName = hw.async.Fb.PERMISSIONS_VERSION_NAME;
  if (cookies.get(cookieName) != hw.async.Fb.PERMISSIONS_VERSION) {
    window.setTimeout(function() {
      hw.Logger.log('hw.async.Fb.getLoginStatus:PERMISSIONS_VERSION error');
      hw.async.Fb.localStorageId_ = null;
      hw.async.Fb.accessToken_ = null;
      deferred.errback(null);
    }, 1000);
  } else {
    hw.async.Fb.getFbApi_().addCallback(function() {
      hw.async.Fb.fbApi_.getLoginStatus(function(response) {
        hw.Logger.log('hw.async.Fb.getLoginStatus:response', response);
        hw.async.Fb.localStorageId_ =
          String(goog.getObjectByName('session.sig', response));
        hw.async.Fb.accessToken_ =
          String(goog.getObjectByName('session.access_token', response));
        if (hw.async.Fb.accessToken_) {
          deferred.callback(response);
        } else {
          deferred.errback(response);
        }
      });
    });
  }
  return deferred;
};


/**
 * @return {goog.async.Deferred}
 */
hw.async.Fb.checkLoginStatus = function() {
  hw.Logger.log('hw.async.Fb.checkLoginStatus');
  var deferred = new goog.async.Deferred();

  hw.async.Fb.getLoginStatus().addCallback(function(response) {
    if (!response ||
      response['uid'] ||
      !response['perms'] ||
      response['status'] != 'connected') {
      hw.Logger.log('hw.async.Fb.checkLoginStatus:fail', response);
      deferred.errback(response);
      return;
    }

    try {
      var perms = goog.json.parse(response['perms']);
      // TODO(hedger): Actually check perms.
      var pass = goog.isArray(perms['friends']) &&
        goog.isArray(perms['extended']) &&
        goog.isArray(perms['user']);
      if (pass) {
        deferred.callback(response);
      } else {
        throw 'perm err';
      }
    } catch (ex) {
      hw.Logger.log('hw.async.Fb.checkLoginStatus:fail', response);
      deferred.errback(response);
    }
  });
  return deferred;
};


/**
 * @private
 */
hw.async.Fb.init_ = function() {
  var uri = new goog.Uri(top.location.href);
  if (uri.getFragment()) {
    var re = /(access_token=)([^&]+)/;
    var matched = uri.getFragment().match(re);
    if (matched && matched[2]) {
      // User logged in from Facebook and was redirected back to
      // our page. Assume that the token is correct and we'd update
      // the cookie.
      uri.setFragment('');
      var cookies = new goog.net.Cookies(document);
      var cookieName = hw.async.Fb.PERMISSIONS_VERSION_NAME;
      cookies.set(cookieName, String(hw.async.Fb.PERMISSIONS_VERSION));
      window.location.replace(uri.toString());
      // hw.async.Fb.accessToken_ = matched[2];
    }
  }

  if (hw.config.USE_MOCK_DATA) {
    return;
  }
  hw.Logger.log('hw.async.Fb.init_');
  // hw.async.Fb.getFbApi_();
  hw.async.Fb.getFbApi_().addCallback(hw.async.Fb.getLoginStatus);
};


/**
 * @return {goog.async.Deferred}
 * @private
 */
hw.async.Fb.getFbApi_ = function() {
  var deferred = new goog.async.Deferred();
  if (hw.config.USE_MOCK_FB_API) {
    hw.Logger.log('Use mock FbApi, page might not work properly');
    return hw.async.Fb.invokeDeferred_(deferred, true, hw.async.Fb.fbApi_, 1);
  }

  if (hw.async.Fb.fbApi_) {
    return hw.async.Fb.invokeDeferred_(deferred, true, hw.async.Fb.fbApi_, 1);
  }
  hw.async.Fb.getBodyElement_().addCallback(function() {

    if (!hw.async.Fb.scriptInstalled_) {
      hw.async.Fb.scriptInstalled_ = true;

      window['fbAsyncInit'] = function() {
        var fb = window['FB'];
        hw.async.Fb.fbApi_ = fb;

        // See https://developers.facebook.com/docs/reference/javascript/FB.init/
        fb.init({
          'appId': hw.async.Fb.API_ID,
          'status': true, // check login status
          'cookie': true, // enable cookies to allow the server to access session.
          'xfbml': false // parse XFBML
        });
        hw.Logger.log('hw.async.Fb.getFbApi_:ready');
        deferred.callback(fb);
      };


      var script = goog.dom.createDom('script', {
        'src': hw.async.Fb.API_SRC,
        'async': 'async',
        'defer': 'defer'
      });
      var el = goog.dom.createDom('div', {
        'id': 'fb-root'
      });
      document.body.insertBefore(el, document.body.firstChild);
      el.appendChild(script);
    }
  });

  return deferred;
};


/**
 * @return {goog.async.Deferred}
 * @private
 */
hw.async.Fb.getBodyElement_ = function() {
  hw.Logger.log('hw.async.Fb.getBodyElement_');
  var deferred = new goog.async.Deferred();

  if (document.body) {
    return hw.async.Fb.invokeDeferred_(deferred, true, document.body, 1);
  }

  var check = function() {
    if (!document.body) {
      return;
    }
    window.clearInterval(timer);
    deferred.callback(document.body);
  };

  deferred.addCallback(function() {
    hw.Logger.log('hw.async.Fb.getBodyElement_:ready');
  });

  var timer = window.setInterval(check, 10);
  return deferred;
};


/**
 * @param {Object} dataSrc
 * @return {goog.async.Deferred}
 * @private
 */
hw.async.Fb.getMockData_ = function(dataSrc) {
  var deferred = new goog.async.Deferred();
  var data = goog.object.unsafeClone(dataSrc);
  data['access_token'] = 'fake';
  return hw.async.Fb.invokeDeferred_(deferred, true, data, 1);
};


/**
 * @param {string} path
 * @return {goog.async.Deferred}
 * @private
 */
hw.async.Fb.query_ = function(path) {
  var deferred = new goog.async.Deferred();
  var symbol = path.indexOf('?') > -1 ? '&' : '?';
  var accessPath = path.indexOf('access_token') < 0 ?
    (path + symbol + 'access_token=' + hw.async.Fb.accessToken_) :
    path;
  hw.Logger.log('hw.async.Fb.query_', accessPath);
  var results = hw.async.Fb.queryCache_[accessPath];
  if (hw.async.Fb.queryCache_[accessPath]) {
    // TODO(hedger):
    // Expire the cached result later.
    // Load results from localStorage.
    hw.Logger.log('load cache from', accessPath, results);
    return hw.async.Fb.invokeDeferred_(deferred, true, results, 1);
  } else {
    if (!hw.async.Fb.accessToken_) {
      hw.Logger.log('hw.async.Fb.query_', 'require accessToken first.');
      hw.async.Fb.getLoginStatus().
        addCallback(
        function() {
          hw.async.Fb.query_(path).
            addCallback(deferred.callback, deferred).
            addErrback(deferred.errback, deferred);
        }).
        addErrback(deferred.errback, deferred);
    } else {
      hw.async.Fb.getFbApi_().addCallback(function() {
        var accessPath =
          path + symbol + 'access_token=' + hw.async.Fb.accessToken_;
        hw.async.Fb.fbApi_.api(accessPath, function(results) {
          hw.Logger.log(accessPath, results);
          results['access_token'] = hw.async.Fb.accessToken_;
          // Cache the result.
          hw.async.Fb.queryCache_[accessPath] = results;
          deferred.callback(results);
        });
      });
    }
  }
  return deferred;
};


/**
 * @param {goog.async.Deferred} deferred
 * @param {boolean} success
 * @param {*=} opt_data
 * @param {number=} opt_delay
 * @return {goog.async.Deferred}
 */
hw.async.Fb.invokeDeferred_ = function(deferred, success, opt_data, opt_delay) {
  window.setTimeout(function() {
    if (success) {
      deferred.callback(opt_data)
    } else {
      deferred.errback(opt_data)
    }
    deferred = opt_data = null;
  }, goog.isNumber(opt_delay) ? opt_delay : 100);
  return deferred;
};


/**
 * @type {Object}
 * @private
 */
hw.async.Fb.queryCache_ = {};

// Install FBJS ASAP.
hw.async.Fb.init_();