goog.provide('hw.ui.FriendsLists');

goog.require('goog.array');
goog.require('goog.dispose');
goog.require('goog.events.EventType');
goog.require('goog.net.Cookies');
goog.require('goog.object');
goog.require('goog.style');
goog.require('goog.ui.Component');
goog.require('goog.ui.ScrollFloater');
goog.require('hw.async.Fb');
goog.require('hw.model.FriendsLists');
goog.require('hw.model.FriendsListsData');
goog.require('hw.template.friends');
goog.require('soy');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {goog.ui.Component}
 * @constructor
 */
hw.ui.FriendsLists = function(opt_domHelper) {

  /**
   * @type {number}
   * @private
   */
  this.hoverTimer_ = 0;

  /**
   * @type {goog.ui.ScrollFloater}
   * @private
   */
  this.floater_ = null;

  /**
   * @type {hw.model.FriendsLists}
   * @private
   */
  this.friendsListsModel_ = null;

  /**
   * @type {Element}
   * @private
   */
  this.listColumnEl_ = null;

  /**
   * @type {goog.net.Cookies}
   * @private
   */
  this.cookies_ = new goog.net.Cookies(document);

  /**
   * @type {string}
   * @private
   */
  this.sortKey_ = 'name';
  goog.base(this, opt_domHelper);
};
goog.inherits(hw.ui.FriendsLists, goog.ui.Component);


/**
 * @inheritDoc
 */
hw.ui.FriendsLists.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  this.refreshData();

  // Events.
  this.getHandler().listen(
    document,
    goog.events.EventType.CLICK,
    this.onClick_);

  goog.style.setInlineBlock(this.getElement());

  this.getHandler().listen(
    this.getElement(),
    goog.events.EventType.MOUSEOVER,
    this.onHoverChange_);

  this.getHandler().listen(
    this.getElement(),
    goog.events.EventType.MOUSEOUT,
    this.onHoverChange_);
};


/**
 * @inheritDoc
 */
hw.ui.FriendsLists.prototype.exitDocument = function() {
  goog.base(this, 'exitDocument');
  window.clearTimeout(this.hoverTimer_);
  this.killFloater_();
};


/**
 * Refresh data.
 */
hw.ui.FriendsLists.prototype.refreshData = function() {
  if (this.getElement() && !this.friendsListsModel_) {
    this.getElement().innerHTML = hw.template.common.Loading();
  }
  var deferred = hw.async.Fb.getFriendsAndLists();
  deferred.addCallback(function(response) {
    var data = /** @type {hw.model.FriendsListsData} */ ({
      user: response['user'],
      friends: response['friends'],
      lists: response['lists'],
      members: response['members']
    });
    var model = hw.model.FriendsLists.get(this.getId(), data);
    this.friendsListsModel_ = model;
    this.sortFriends_(this.sortKey_);
  }, this);
};


/**
 * @param {Event} evt
 * @private
 */
hw.ui.FriendsLists.prototype.onHoverChange_ = function(evt) {
  var target = evt.target;
  var type = evt.type;
  window.clearTimeout(this.hoverTimer_);
  this.hoverTimer_ = window.setTimeout(
    goog.bind(this.onHoverChangeLater_, this, target, type),
    30);
};


/**
 * @param {Element} target
 * @param {string} type
 * @private
 */
hw.ui.FriendsLists.prototype.onHoverChangeLater_ = function(target, type) {
  if (!this.listColumnEl_) {
    return;
  }
  switch (type) {
    case goog.events.EventType.MOUSEOVER:
      var cell = goog.dom.getAncestorByClass(
        target,
        goog.getCssName('friends-list-cell'));
      if (!cell) {
        return;
      }
      var x1 = goog.style.getPageOffsetLeft(this.getElement());
      var x2 = goog.style.getPageOffsetLeft(/** @type {Element} */ (cell));
      this.listColumnEl_.style.width = cell.offsetWidth + 'px';
      this.listColumnEl_.style.visibility = 'visible';
      this.listColumnEl_.style.left = (x2 - x1) + 'px';
      break;

    case goog.events.EventType.MOUSEOUT:
      this.listColumnEl_.style.visibility = '';
      break;
  }
};


/**
 * @param {Event} evt
 * @private
 */
hw.ui.FriendsLists.prototype.onClick_ = function(evt) {
  var target = /** @type {Node} */ (evt.target);

  if (!target.tagName) {
    return;
  }

  if (!goog.dom.contains(this.getElement(), target)) {
    if (!this.floater_) {
      // Click off the component.
      return;
    }
    if (!goog.dom.contains(this.floater_.getElement(), target)) {
      // Click off the component.
      return;
    }
  }

  if (String(target.type).toLowerCase() == 'checkbox') {
    // Wait until the checked state actually changes.
    window.setTimeout(goog.bind(function(input) {
      if (input.disabled) {
        return;
      }
      var friendId = input.value;
      var listId = input.getAttribute('data-list-id');
      input.disabled = true;

      this.friendsListsModel_.modifyFriendAtList(
        friendId,
        listId,
        input.checked
      ).addCallback(function() {
          input.disabled = false;
        });
    }, this, target), 10);
    return;
  }
  switch (target.rel) {
    case 'sort':
      evt.preventDefault();
      this.sortFriends_(target.getAttribute('data-id'));
      return;

    case 'add-list':
      evt.preventDefault();
      this.addNewList_();
      return;

    case 'del-list':
      evt.preventDefault();
      this.deleteList_(
        target.getAttribute('data-id'),
        target.getAttribute('data-name'));
      return;

    case 'hide-bubble':
      evt.preventDefault();
      var bubbleEl = goog.dom.getAncestorByClass(
        target,
        goog.getCssName('bubble'));
      this.hideBubble_(bubbleEl);
      return;
  }
};


/**
 * @param {*} errorMsg
 * @private
 */
hw.ui.FriendsLists.prototype.showError_ = function(errorMsg) {
  alert(String(errorMsg));
};


/**
 * @private
 * @param {Node} bubbleEl
 */
hw.ui.FriendsLists.prototype.hideBubble_ = function(bubbleEl) {
  goog.dom.removeNode(bubbleEl);
  this.cookies_.set('hide-bubble', '1', 30 * 24 * 60 * 60);
};


/**
 * @private
 */
hw.ui.FriendsLists.prototype.addNewList_ = function() {
  var name = window.prompt(hw.msg.NameOfNewFriendList().toString());
  if (!name) {
    if (name === '') {
      this.showError_(hw.msg.InvalidFriendListName());
    }
    return;
  }
  hw.async.Fb.addNewFriendList(name).
    addCallback(this.refreshData, this).
    addErrback(this.showError_, this);
};


/**
 * @param {string} listId
 * @private
 */
hw.ui.FriendsLists.prototype.deleteList_ = function(listId, name) {
  var yes = window.confirm(hw.msg.AskDeleteList({
    name: name
  }));
  if (yes) {
    hw.async.Fb.deleteFriendList(listId).
      addCallback(this.refreshData, this).
      addErrback(this.showError_, this);
  }
};


/**
 * @param {string} listId
 * @private
 */
hw.ui.FriendsLists.prototype.sortFriends_ = function(listId) {
  this.friendsListsModel_.sortFriends(listId);
  this.sortKey_ = listId;
  this.renderList_();
};


/**
 * @private
 */
hw.ui.FriendsLists.prototype.killFloater_ = function() {
  if (this.floater_) {
    goog.dom.removeNode(this.floater_.getElement());
    goog.dispose(this.floater_);
    this.floater_ = null;
  }
};

/**
 * @private
 */
hw.ui.FriendsLists.prototype.renderList_ = function() {
  hw.Logger.log('hw.ui.FriendsLists#renderList_', this.getElement());
  if (!this.getElement()) {
    return;
  }
  this.killFloater_();
  var payload = this.friendsListsModel_.getData();
  payload.showHelp = (this.cookies_.get('hide-bubble', '') != '1');

  hw.Logger.profile(
    'w.ui.FriendsLists:renderList',
    function() {
      this.getElement().innerHTML = hw.template.friends.FriendsList(payload);
      this.listColumnEl_ = this.getElementByFragment('column');
    }, this);
  var headEl = this.getElementByFragment('head');
  this.floater_ = new goog.ui.ScrollFloater();
  this.floater_.decorate(headEl);

  goog.dom.getDocumentScrollElement().scrollTop = 0;
};


///**
// * @param {Object} fa
// * @param {Object} fb
// * @param {string} listId
// */
//hw.ui.FriendsLists.sortFriendsByListId_ = function(fa, fb, listId) {
//  var ia = fa.inputs;
//  var ib = fb.inputs;
//  var name = 'friend-list-' + listId;
//  if (ia[name] && !ib[name]) {
//    return -1;
//  }
//  if (!ia[name] && ib[name]) {
//    return 1;
//  }
//  if (fa.listsLength > fb.listsLength) {
//    return 1;
//  } else if (fa.listsLength < fb.listsLength) {
//    return -1;
//  } else {
//    return fa['id'] > fb['id'] ? 1 : -1;
//  }
//};