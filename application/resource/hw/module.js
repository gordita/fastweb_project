// generated code, do not edit.
goog.provide('hw.Module');
goog.provide('hw.Module.Name');
goog.provide('hw.Module.Url');
goog.provide('hw.Module.Deps');


/** @type {Object} */
hw.Module.Names = {};
hw.Module.Names.BasePage = 'basepage';
hw.Module.Names.DockPage = 'dockpage';
hw.Module.Names.HomePage = 'homepage';
hw.Module.Names.FriendsPage = 'friendspage';
hw.Module.Names.AlbumsPage = 'albumspage';
hw.Module.Names.ProfilePage = 'profilepage';
hw.Module.Names.PhotosPage = 'photospage';
hw.Module.Names.PhotoPage = 'photopage';
hw.Module.Names.GroupsPage = 'groupspage';
hw.Module.Names.TbdPage = 'tbdpage';


/** @type {Object} */
hw.Module.Deps = {};
hw.Module.Deps[hw.Module.Names.BasePage] = [];
hw.Module.Deps[hw.Module.Names.DockPage] = [hw.Module.Names.BasePage];
hw.Module.Deps[hw.Module.Names.HomePage] = [hw.Module.Names.DockPage];
hw.Module.Deps[hw.Module.Names.FriendsPage] = [hw.Module.Names.HomePage];
hw.Module.Deps[hw.Module.Names.AlbumsPage] = [hw.Module.Names.FriendsPage];
hw.Module.Deps[hw.Module.Names.ProfilePage] = [hw.Module.Names.AlbumsPage];
hw.Module.Deps[hw.Module.Names.PhotosPage] = [hw.Module.Names.ProfilePage];
hw.Module.Deps[hw.Module.Names.PhotoPage] = [hw.Module.Names.PhotosPage];
hw.Module.Deps[hw.Module.Names.GroupsPage] = [hw.Module.Names.PhotoPage];
hw.Module.Deps[hw.Module.Names.TbdPage] = [hw.Module.Names.GroupsPage];


/** @type {Object} */
hw.Module.Url = {};
hw.Module.Url[hw.Module.Names.BasePage] = 'build/bin.basepage.js';
hw.Module.Url[hw.Module.Names.DockPage] = 'build/bin.dockpage.js';
hw.Module.Url[hw.Module.Names.HomePage] = 'build/bin.homepage.js';
hw.Module.Url[hw.Module.Names.FriendsPage] = 'build/bin.friendspage.js';
hw.Module.Url[hw.Module.Names.AlbumsPage] = 'build/bin.albumspage.js';
hw.Module.Url[hw.Module.Names.ProfilePage] = 'build/bin.profilepage.js';
hw.Module.Url[hw.Module.Names.PhotosPage] = 'build/bin.photospage.js';
hw.Module.Url[hw.Module.Names.PhotoPage] = 'build/bin.photopage.js';
hw.Module.Url[hw.Module.Names.GroupsPage] = 'build/bin.groupspage.js';
hw.Module.Url[hw.Module.Names.TbdPage] = 'build/bin.tbdpage.js';