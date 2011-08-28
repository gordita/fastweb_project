goog.provide('hw.ui.PhotosViewer');

goog.require('goog.asserts');
goog.require('goog.array');
goog.require('goog.style');
goog.require('goog.math.Rect');
goog.require('goog.math.Size');
goog.require('hw.async.Fb');
goog.require('hw.config');
goog.require('hw.dom.ViewportSizeMonitor');
goog.require('hw.events.Event');
goog.require('hw.events.EventType');
goog.require('hw.layout.Scroll');
goog.require('hw.ui.BaseComponent');
goog.require('hw.ui.scroll.Options');
goog.require('tpl.ui.PhotosViewer');


/**
 * @param {string} photoId
 * @param {string} albumId
 * @constructor
 * @extends {hw.ui.BaseComponent}
 */
hw.ui.PhotosViewer = function(photoId, albumId) {
  goog.base(this);
  this.albumId_ = albumId;
  this.photoId_ = photoId;

  var scrollOptions = new hw.ui.scroll.Options();
  scrollOptions.vScroll = false;
  scrollOptions.hScroll = true;
  scrollOptions.momentum = false;
  scrollOptions.hScrollbar = false;
  scrollOptions.vScrollbar = false;
  scrollOptions.snap = true;
  if (hw.config.ALLOW_PINCH_AND_ZOOM) {
    scrollOptions.zoom = true;
    scrollOptions.zoomMin = 1;
    scrollOptions.zoomMax = 3;
  }
  scrollOptions.onScrollEnd = goog.bind(this.onScrollEnd_, this);
  this.scroll_ = new hw.layout.Scroll(scrollOptions);
  this.addChild(this.scroll_);
};
goog.inherits(hw.ui.PhotosViewer, hw.ui.BaseComponent);

/**
 * @type {string}
 * @private
 */
hw.ui.PhotosViewer.prototype.albumId_ = '';

/**
 * @type {string}
 * @private
 */
hw.ui.PhotosViewer.prototype.photoId_ = '';

/**
 * @type {hw.layout.Scroll}
 * @private
 */
hw.ui.PhotosViewer.prototype.scroll_ = null;


/**
 * @type {Object}
 * @private
 */
hw.ui.PhotosViewer.prototype.photoDataToShow_ = null;

/**
 * @type {Object}
 * @private
 */
hw.ui.PhotosViewer.prototype.selectedPhotoData_ = null;


/**
 * @type {Array.<Object>}
 */
hw.ui.PhotosViewer.prototype.photosData_ = null;


/** @inheritDoc */
hw.ui.PhotosViewer.prototype.createTemplate = function(payload) {
  return tpl.ui.PhotosViewer.element(payload).toString();
};


/** @inheritDoc */
hw.ui.PhotosViewer.prototype.getContentElement = function() {
  return this.getInnerElement('content');
};


/**
 * @param {hw.others.IScroll} iscroll
 * @private
 */
hw.ui.PhotosViewer.prototype.onScrollEnd_ = function(iscroll) {
  if (this.photosData_) {
    var photoData = this.photosData_[iscroll.getCurrentPageX()];
    if (photoData) {
      this.showPhotoData_(photoData);
      var nextPhotoData = this.photosData_[iscroll.getCurrentPageX() + 1];
      if (nextPhotoData) {
        this.showPhotoData_(nextPhotoData);
      }
      this.selectedPhotoData_ = photoData;
    }
  }
};

/**
 * @param {Object} data
 * @param {goog.math.Size} canvasSize
 * @return {Object}
 * @private
 */
hw.ui.PhotosViewer.prototype.getPhotoToShow_ = function(data, canvasSize) {
  var images = data['images'];
  if (!goog.isArray(images) || !images.length) {
    hw.Logger.log('hw.ui.PhotosViewer#getPhotoToShow_:no images', data);
    if (data['width'] && data['height']) {
      return data;
    }
    return null;
  }
  var prevImage = images[0];
  goog.array.some(images, function(img) {
    if (img['width'] <= canvasSize.width &&
      img['height'] <= canvasSize.height) {
      img = prevImage || img;
      return true;
    }
    prevImage = img;
  }, this);
  return prevImage;
};


/**
 * @inheritDoc
 */
hw.ui.PhotosViewer.prototype.captureElement = function() {
  goog.base(this, 'captureElement');
  this.requestData_();
  this.getHandler().listen(
    hw.dom.ViewportSizeMonitor.getInstance(),
    hw.events.EventType.VIEWPORT_SIZE_CHANGE,
    this.onViewportSizeChange_);
};

/**
 * @inheritDoc
 */
hw.ui.PhotosViewer.prototype.releaseElement = function() {
  goog.base(this, 'releaseElement');
  this.scroll_.dispose();
  this.scroll_ = null;
};


/**
 * @param {hw.events.Event} evt
 * @private
 */
hw.ui.PhotosViewer.prototype.onViewportSizeChange_ = function(evt) {
  if (!this.photosData_) {
    return;
  }
  var photoData = this.selectedPhotoData_;
  if (photoData && photoData != this.photosData_[0]) {
    this.refreshPhotos_();
    this.scroll_.refreshHard();

    // Hack.
    // The scroll always scrolls back to 0.
    // Need to keep current photo visible though.
    var tempEl = this.getInnerElement(photoData.elementId_).cloneNode(true);
    tempEl.style.padding = [
      photoData.rect_.top + 'px',
      photoData.rect_.left + 'px'
    ].join(' ');
    tempEl.style.left = 0;
    tempEl.style.zIndex = 10000;
    tempEl.id = '';
    this.scroll_.getContentElement().appendChild(tempEl);
    this.later(function() {
      goog.dom.removeNode(tempEl);
      this.scroll_.scrollTo(-photoData.pageLeft_, 0, 0);
      this.scroll_.refreshHard();
    }, 800);
  } else {
    this.refresh_();
  }
};

/**
 *
 * @param {Object} photoData
 * @param {goog.math.Rect} rect
 * @param {number} pageLeft
 */
hw.ui.PhotosViewer.prototype.applyRect_ = function(photoData, rect, pageLeft) {
  var photoEl = this.getInnerElement(photoData.elementId_);
  goog.asserts.assert(photoEl, 'hw.ui.PhotosViewer#applyRect_:null');
  goog.style.setStyle(photoEl, {
    'width': rect.width + 'px',
    'height': rect.height + 'px',
    'left': rect.left + pageLeft + 'px',
    'top': rect.top + 'px'
  });
};


/**
 * @private
 */
hw.ui.PhotosViewer.prototype.showError_ = function(results) {
  var error = goog.getObjectByName('error.message', results);
  var type = goog.getObjectByName('error.type', results);
  var payload = {
    data : results,
    type: type ? String(type) : '',
    error: error ? String(error) : '',
    id : this.getId()
  };
  this.scroll_.getContentElement().innerHTML =
    tpl.ui.PhotosViewer.error(payload).toString();
  this.canvasEl_ = null;
};

/**
 * @private
 */
hw.ui.PhotosViewer.prototype.showEmpty_ = function() {
  this.scroll_.getContentElement().innerHTML =
    tpl.ui.PhotosViewer.empty().toString();
  this.canvasEl_ = null;
};


/**
 * @private
 */
hw.ui.PhotosViewer.prototype.requestData_ = function() {
  hw.Logger.log('hw.ui.PhotosViewer#requestData_', this.photosData_);
  if (this.photosData_ && this.photosData_[0]) {
    this.refresh_();
    return;
  }

  hw.async.Fb.getPhotoFeed(this.photoId_).
    addErrback(this.showError_, this).
    addCallback(function(photoData) {
      this.photosData_ = [photoData];
      this.photoDataToShow_ = photoData;
      if (this.albumId_) {
        hw.async.Fb.getPhotosFeed(this.albumId_).
          addErrback(this.refresh_, this).
          addCallback(function(photosData) {
            if (goog.isArray(photosData['data']) && photosData['data'].length) {
              photosData['data'].unshift(photoData);
              this.photosData_ = photosData['data'];
            }
            this.refresh_();
          }, this);
      } else {
        this.refresh_();
      }
    }, this);
};


/**
 * @param {Object} photoData
 * @private
 */
hw.ui.PhotosViewer.prototype.showPhotoData_ = function(photoData) {
  hw.Logger.log('hw.ui.PhotosViewer#showPhotoData_', photoData);
  if (!this.getElement()) {
    this.photoDataToShow_ = photoData;
    return;
  }

  if (photoData == this.photoDataToShow_) {
    this.photoDataToShow_ = null;
  }

  if (!photoData.hasImage_) {
    var photoEl = this.getInnerElement(photoData.elementId_);
    if (!photoEl) {
      hw.Logger.log(
        'hw.ui.PhotosViewer#showPhotoData_:error:photoEl null',
        photoData.elementId_);
      return;
    }
    photoData.hasImage_ = true;
    var payload = {
      src: photoData['source']
    };
    photoEl.innerHTML = tpl.ui.PhotosViewer.img(payload).toString();
  }
  this.selectedPhotoData_ = photoData;
};

/**
 * @private
 */
hw.ui.PhotosViewer.prototype.refresh_ = function() {
  this.refreshPhotos_();
  this.scroll_.refresh();
};


/**
 * @private
 */
hw.ui.PhotosViewer.prototype.refreshPhotos_ = function() {
  if (!this.getElement() || !this.photosData_ || !this.photosData_.length) {
    this.showEmpty_();
    return;
  }

  if (!this.canvasEl_) {
    this.canvasEl_ = this.createCanvasElement_();
  }

  var pageLeft = 0;
  var canvasSize = this.getViewportSize();
  goog.array.forEach(this.photosData_, function(photoData) {
    var photoToShow = this.getPhotoToShow_(photoData, canvasSize);
    if (!photoToShow) {
      hw.Logger.error(
        'hw.ui.PhotosViewer#refreshPhotos_:error no photo to show',
        photoToShow,
        photoData);
      return;
    }

    var rect = this.computeImageRect_(canvasSize, photoToShow);
    goog.asserts.assert(photoData.elementId_, 'photoData.elementId_');
    this.applyRect_(photoData, rect, pageLeft);
    photoData.rect_ = rect;
    photoData.pageLeft_ = pageLeft;
    pageLeft += canvasSize.width;
  }, this);

  goog.style.setStyle(this.canvasEl_, {
    'width' :(canvasSize.width * this.photosData_.length) + 'px',
    'height':(canvasSize.height) + 'px'
  });

  if (this.photoDataToShow_) {
    this.showPhotoData_(this.photoDataToShow_);
  } else {
    this.showPhotoData_(this.photosData_[0]);
  }
};

/**
 * @return {Element}
 */
hw.ui.PhotosViewer.prototype.createCanvasElement_ = function() {
  var htmls = goog.array.map(this.photosData_, function(photoData) {
    // Add expando.
    photoData.elementId_ = this.generateId();
    photoData.hasImage_ = false;
    var payload = {
      id: this.getId(),
      elementId: photoData.elementId_
    };
    return tpl.ui.PhotosViewer.photo(payload);
  }, this);

  var canvasEl = this.getDom().createDom(
    'div',
    tpl.CSS_NAMES.CSS_PHOTOS_VIEWER_CANVAS);

  canvasEl.innerHTML = htmls.join('');
  this.scroll_.getContentElement().appendChild(canvasEl);
  return canvasEl;
};


/**
 *
 * @param {goog.math.Size} canvasSize
 * @param {Object} photoToShow
 * @return {goog.math.Rect}
 */
hw.ui.PhotosViewer.prototype.computeImageRect_ = function(canvasSize,
                                                          photoToShow) {
  goog.asserts.assert(!!photoToShow, 'photoToShow null');
  var ratio = photoToShow['width'] / photoToShow['height'];
  var w;
  var h;
  if (canvasSize.width > canvasSize.height) {
    h = Math.min(canvasSize.height - 0, photoToShow['height']);
    w = ratio * h;
  } else {
    w = Math.min(canvasSize.width, photoToShow['width']);
    h = w / ratio;
  }
  w = Math.round(w);
  h = Math.round(h);
  var x = Math.floor((canvasSize.width - w) / 2);
  var y = Math.floor((canvasSize.height - h) / 2);
  return new goog.math.Rect(x, y, w, h);
};


/**
 * @param {Object} result
 */
//hw.ui.PhotosViewer.prototype.onAlbumFeedReady_ = function(result) {
//  if (!result || !goog.isArray(result['data']) || !result['data'].length) {
//    return;
//  }
//
//  this.albumsData_ = /** @type Array.<Object> */ (result['data']);
//
//  if (this.albumsData_.length > 1) {
//    this.getInnerElement('bottom').style.display = 'block';
//
//    this.getHandler().listen(
//      this.getInnerElement('prev'),
//      hw.events.EventType.TOUCHSTART,
//      goog.bind(this.go_, this, false));
//
//    this.getHandler().listen(
//      this.getInnerElement('next'),
//      hw.events.EventType.TOUCHSTART,
//      goog.bind(this.go_, this, true));
//  }
//};


/**
 * @param {boolean} forward
 * @param {Event} opt_evt
 * @private
 */
//hw.ui.PhotosViewer.prototype.go_ = function(forward, opt_evt) {
//  if (opt_evt) {
//    opt_evt.preventDefault();
//  }
//  if (!this.currentPhotoData_) {
//    return;
//  }
//  var curId = this.currentPhotoData_['id'];
//  goog.array.some(this.albumsData_, function(imageData, idx) {
//    if (imageData['id'] == curId) {
//      idx += (forward ? 1 : -1);
//      var nextImageData = this.albumsData_[idx];
//      if (!nextImageData) {
//        nextImageData = forward ?
//          this.albumsData_[0] :
//          goog.array.peek(this.albumsData_);
//      }
//      this.showPhotoData_(nextImageData);
//    }
//  }, this);
//};
