goog.provide('hw.model.FriendsLists');
goog.provide('hw.model.FriendsListsData');

goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.object');
goog.require('hw.Logger');
goog.require('hw.async.Fb');


/**
 * @param {string} id
 * @param {*} data
 * @constructor
 */
hw.model.FriendsLists = function(id, data) {
  hw.Logger.log('hw.model.FriendsLists:new', id, data);
  hw.model.FriendsLists.validateData_(data);

  /**
   * @type {string}
   * @private
   */
  this.id_ = id;

  /**
   * @type {hw.model.FriendsListsData}
   * @private
   */
  this.data_ = /** @type {hw.model.FriendsListsData} */ (data);

  hw.Logger.profile(
    'hw.model.FriendsLists#prepareData_',
    this.prepareData_,
    this);
};


/**
 * @param {string} id
 * @param {*} data
 * @return {hw.model.FriendsLists}
 */
hw.model.FriendsLists.get = function(id, data) {
  if (!data || !id) {
    return null;
  }
  if (data instanceof hw.model.FriendsLists) {
    goog.asserts.assert(data.id_ == id);
    return /** @type {hw.model.FriendsLists} */ (data);
  }
  return new hw.model.FriendsLists(id, data);
};

/**
 * @param {string} fId
 * @param {string} lid
 * @param {boolean} add
 * @return {goog.async.Deferred}
 */
hw.model.FriendsLists.prototype.modifyFriendAtList = function(fId, lid, add) {
  var modified = goog.array.some(
    this.data_.friends,
    function(friend, i) {
      if (friend['id'] == fId) {
        var inputChanged = goog.array.some(friend.inputs, function(input) {
          if (input.listId == lid) {
            input.checked = add;
            return true;
          }
        }, this);
        if (!inputChanged) {
          return false;
        }
        var modified = goog.object.some(
          this.data_.members,
          function(listObj, listId) {
            if (lid == listId) {
              var removeIdx = -1;
              var friendInList = goog.array.some(
                listObj['data'],
                function(friendData, idx) {
                  if (friendData['id'] == fId) {
                    if (add) {
                      // Already in list.
                      return true;
                    } else {
                      removeIdx = idx;
                      return true;
                    }
                  }
                });

              if (add && !friendInList) {
                listObj['data'].push({
                  'id': fId
                })
              } else if (friendInList && !add && removeIdx > -1) {
                goog.array.removeAt(listObj['data'], removeIdx);
              }
              return true;
            }
          });
        return modified;
      }
    }, this);
  return hw.async.Fb.modifyFriendAtList(fId, lid, add);
};


/**
 * @param {string} listId
 */
hw.model.FriendsLists.prototype.sortFriends = function(listId) {
  var data = this.data_;
  if (listId == 'name') {
    hw.Logger.profile('hw.model.FriendsLists:name',
      function() {
        data.friends.sort(hw.model.FriendsLists.sortFriendsByName_);
      });

  } else {
    hw.Logger.profile('hw.model.FriendsLists:listId', function() {
      data.friends = this.groupFriendsByListId_(listId);
    }, this);
  }
};


/**
 * @return {hw.model.FriendsListsData}
 */
hw.model.FriendsLists.prototype.getData = function() {
  return this.data_;
};


/**
 * @param {string} selectedListId
 * @return {Array.<Object>}
 * @private
 */
hw.model.FriendsLists.prototype.groupFriendsByListId_ = function(selectedListId) {
  var data = this.data_;
  var groups1 = [];
  var groups2 = [];
  var friendsIndex = {};
  var usedFriendsIndex = {};

  goog.array.forEach(data.friends, function(friend) {
    friendsIndex[friend['id']] = friend;
  });

  var listIds = goog.array.map(data.lists, function(list) {
    return list['id'];
  });

  var members = data.members;
  goog.array.forEach(listIds, function(listId) {
    var listFriends = members[listId]['data'];
    goog.array.forEach(listFriends, function(friend) {
      var friendId = friend['id'];
      if (usedFriendsIndex[friendId]) {
        return;
      }
      usedFriendsIndex[friendId] = true;
      friend = friendsIndex[friendId];
      if (listId == selectedListId) {
        groups1.push(friend);
      } else {
        groups2.push(friend);
      }
    });
  });

  groups1.sort(hw.model.FriendsLists.sortFriendsByName_);
  var rt = groups1.concat(groups2);
  return rt;
};


/**
 * @private
 */
hw.model.FriendsLists.prototype.prepareData_ = function() {
  var data = this.data_;
  hw.model.FriendsLists.validateData_(data);

  var id = this.id_;
  var members = data.members;
  var friendsListIds = {};
  var dummy = {};

  data.lists.sort(function(la, lb) {
    return la['name'] > lb['name'];
  });

  // Attach listIds to friendId.
  goog.object.forEach(members, function(memberData, listId) {
    goog.array.forEach(memberData['data'], function(friend) {
      var friendId = friend['id'];
      if (!friendsListIds[friendId]) {
        friendsListIds[friendId] = {};
      }
      friendsListIds[friendId][listId] = true;
    });
  });

  // Build inputs information for friends.
  goog.array.forEach(data.friends, function(friend) {
    var friendId = friend['id'];
    var inputs = [];

    goog.array.forEach(data.lists, function(list) {
      var listId = list['id'];
      var input = {
        id: [id, listId, friendId].join('-'),
        title: list['name'],
        value: friendId,
        listId: listId,
        name: 'friend-list-' + listId,
        checked:  !!(friendsListIds[friendId] || dummy)[listId]
      };
      inputs[input.name] = input.checked;
      inputs.push(input);
    });
    friend.inputs = inputs;
    // friend.listsLength = listsLength;
  });
  data.id = this.id_;
  data.friends.sort(hw.model.FriendsLists.sortFriendsByName_);
};


/**
 * @param {Object} fa
 * @param {Object} fb
 */
hw.model.FriendsLists.sortFriendsByName_ = function(fa, fb) {
  if (fa['name'] > fb['name']) {
    return 1;
  }
  if (fa['name'] < fb['name']) {
    return -1;
  }
  return fa['id'] > fb['id'] ? 1 : -1;
};


/**
 * @param {*} data
 * @private
 */
hw.model.FriendsLists.validateData_ = function(data) {
  hw.Logger.log('hw.ui.FriendsLists:validateModel_', data);
  goog.asserts.assertObject(data);
  goog.asserts.assertObject(data.user, 'friends');
  goog.asserts.assertArray(data.friends, 'friends');
  goog.asserts.assertObject(data.members, 'members');
  goog.asserts.assertArray(data.lists, 'lists');
};


/**
 * @constructor
 */
hw.model.FriendsListsData = function() {
  /** @type {Object} */
  this.user = {};
  /** @type {Array.<Object>} */
  this.friends = [];
  /** @type {Array.<Object>} */
  this.members = [];
  /** @type {Array.<Object>} */
  this.lists = [];
};