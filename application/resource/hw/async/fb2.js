// Stuffs that might be useful.

/**
 * @param {Element} el
 * @return {goog.async.Deferred}
 */
hw.async.Fb.parseFbml = function(el) {
  var deferred = new goog.async.Deferred();
  hw.async.Fb.getFbApi_().addCallback(function() {
    hw.async.Fb.fbApi_['XFBML']['parse'](el);
    deferred.callback(null);
  });
  return deferred;
};

/**
 * you should only call FB.login when bound to a user driven click.
 * @return {goog.async.Deferred}
 */
hw.async.Fb.openLoginPopup = function() {
  var deferred = new goog.async.Deferred();

  if (!hw.async.Fb.fbApi_) {
    return hw.async.Fb.invokeDeferred_(deferred, false);
  }
  // See https://developers.facebook.com/docs/reference/api/permissions/
  hw.async.Fb.fbApi_.login(function(response) {
    var cookies = new goog.net.Cookies(document);
    var cookieName = hw.async.Fb.PERMISSIONS_VERSION_NAME;
    cookies.set(cookieName, String(hw.async.Fb.PERMISSIONS_VERSION));
    // deferred.callback(response);
  }, {'perms':hw.async.Fb.permissions_.join(',')});
  return deferred;
};


/**
 * @return {goog.async.Deferred}
 */
hw.async.Fb.getFriendsAndLists = function() {
  var deferred = new goog.async.Deferred();

  var handleLogin = function(loginStatus) {
    if (!loginStatus) {
      deferred.callback(null);
      return;
    }

    var data = hw.async.Fb.getFromLocalStorage_('FriendsAndLists');
    if (data) {
      deferred.callback(data);
      return;
    }

    hw.async.Fb.fbApi_.api(
      '/',
      'POST',
      {
        'batch': [
          {
            'method': 'GET',
            'relative_url': 'me',
            'omit_response_on_success': false
          },
          {
            'method': 'GET',
            'relative_url': 'me/friendlists?limit=100',
            'name': 'lists',
            'omit_response_on_success': false
          },
          {
            'method': 'GET',
            'relative_url': 'members/?ids={result=lists:$.data..id}&fields=id',
            'omit_response_on_success': false
          },
          {
            'method': 'GET',
            'relative_url': 'me/friends?fields=id,name,picture'
          }
        ]},
      handleFriendLists
    );
  };

  var handleFriendLists = function(result) {
    var user = goog.json.parse(result[0]['body']);
    var lists = goog.json.parse(result[1]['body'])['data'];
    var members = goog.json.parse(result[2]['body']);
    var friends = goog.json.parse(result[3]['body'])['data'];

    goog.asserts.assertArray(lists);
    goog.asserts.assertArray(friends);
    goog.asserts.assertObject(user);
    goog.asserts.assertObject(members);
    if (!lists.length || members['error']) {
      hw.Logger.log('hw.async.Fb.getFriendsAndLists:InvalidMembers', members);
      members = {};
    }
    var data = {
      'user': user,
      'lists': lists,
      'members': members,
      'friends': friends
    };
    hw.Logger.log('hw.async.Fb.getFriendsAndLists:ready', data);
    hw.async.Fb.setToLocalStorage_('FriendsAndLists', data);
    deferred.callback(data);
  };

  hw.async.Fb.checkPermissions().addCallback(handleLogin);
  return deferred;
};


/**
 * @param {string} friendId
 * @param {string} listId
 * @param {boolean} add
 * @return {goog.async.Deferred}
 */
hw.async.Fb.modifyFriendAtList = function(friendId, listId, add) {
  hw.Logger.log('hw.async.Fb.modifyFriendAtList', arguments);
  var deferred = new goog.async.Deferred();

  hw.async.Fb.getFbApi_().addCallback(function() {
    var path = '/' + listId + '/members/' + friendId;
    var action = add ? 'POST' : 'DELETE';
    hw.async.Fb.fbApi_.api(path, action, function(results) {
      if (!results || results['error']) {
        hw.Logger.log('hw.async.Fb.modifyFriendAtList:error', results);
        deferred.errback(results);
      } else {
        hw.Logger.log('hw.async.Fb.modifyFriendAtList:OK', results);
        deferred.callback(results);
      }
    });
  });
  return deferred;
};


/**
 * @return {goog.async.Deferred}
 */
hw.async.Fb.waitForLogin = function() {
  var deferred = new goog.async.Deferred();
  var timer;
  var delay = 1000;
  hw.Logger.log('hw.async.Fb.waitForLogin:wait', delay);
  hw.async.Fb.getFbApi_().addCallback(
    function() {
      hw.async.Fb.fbApi_.Event.subscribe('auth.login', function(response) {
        // do something with response.session
        window.clearTimeout(timer);
        if (deferred) {
          hw.async.Fb.localStorageId_ =
            String(goog.getObjectByName('session.sig', response));
          hw.Logger.log('hw.async.Fb.waitForLogin:pass', response, delay);
          deferred.callback(true);
          deferred = null;
        }
      });

      // Also check session periodically (I don't really trust FB's API).
      var check = function() {
        hw.Logger.log('hw.async.Fb.waitForLogin:wait', delay);
        hw.async.Fb.checkPermissions().
          addCallback(
          function(results) {
            window.clearTimeout(timer);
            if (deferred) {
              hw.Logger.log('hw.async.Fb.waitForLogin:pass', true, delay);
              deferred.callback(true);
              deferred = null;
            }
          }).addErrback(function(results) {
            delay += 50;
            delay = delay > 3000 ? 50 : delay;
            timer = window.setTimeout(check, delay);
          });
      };
      timer = window.setTimeout(check, delay);
    });
  return deferred;
};


/**
 * @param {string} listId
 * @return {goog.async.Deferred}
 */
hw.async.Fb.deleteFriendList = function(listId) {
  var deferred = new goog.async.Deferred();
  hw.Logger.log('hw.async.Fb.deleteFriendList', listId);
  hw.async.Fb.getFbApi_().addCallback(function() {
    hw.async.Fb.fbApi_.api(
      '/' + parseInt(listId, 10),
      'DELETE',
      function(result) {
        hw.Logger.log('hw.async.Fb.deleteFriendList:response', result);
        if (result && result === true) {
          deferred.callback(true);
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
 * @param {string} key
 * @return {*}
 * @private
 */
hw.async.Fb.getFromLocalStorage_ = function(key) {
  if (!hw.config.USE_LOCAL_STORAGE || !hw.async.Fb.localStorageId_) {
    hw.Logger.log('LocalStorage:get', key, null, hw.async.Fb.localStorageId_);
    return;
  }
  key = 'hw.async.Fb.' + key + '@' + hw.async.Fb.localStorageId_;
  try {
    var value = goog.json.parse(window['localStorage']['getItem'](key));
    hw.Logger.log('LocalStorage:get', key, value);
    return value;
  } catch(e) {
    return null;
  }
};


/**
 * @param {string} key
 * @param {*} value
 * @return {*}
 * @private
 */
hw.async.Fb.setToLocalStorage_ = function(key, value) {
  if (!hw.config.USE_LOCAL_STORAGE || !value || !hw.async.Fb.localStorageId_) {
    return;
  }
  key = 'hw.async.Fb.' + key + '@' + hw.async.Fb.localStorageId_;
  hw.Logger.log('LocalStorage:set', key, value);
  try {
    window['localStorage']['setItem'](key, goog.json.serialize(value));
  } catch(ex) {
    hw.Logger.log('LocalStorage:error', ex.message);
  }
};


/**
 * @param {string} id
 * @return {goog.async.Deferred}
 */
hw.async.Fb.getPhotoAlbumsFeed = function(id) {
  hw.Logger.log('hw.async.Fb.getPhotoAlbumsFeed', id);
  var deferred = new goog.async.Deferred();
  var fql = 'select pid from photo where pid=\'' + parseFloat(id) + '\'';
  hw.async.Fb.fql_(fql).addCallback(function(results) {
    console.log(results);
  });
  return deferred;
};


/**
 * @param {string} fql
 * @return {goog.async.Deferred}
 * @private
 */
hw.async.Fb.fql_ = function(fql) {
  var deferred = new goog.async.Deferred();
//  hw.async.Fb.getFbApi_().addCallback(
//    function() {
//      var query = FB.Data.query('select pid, from photo_tag where pid={0}', 10150622302040430);
//      query.wait(function(rows) {
//        console.log(fql, rows)
//      });
//
//    }).addErrback(deferred.errback, deferred);
  return deferred;
};
