import sys

# Workaround to import web module.
APPLICATION_PATH = 'application/'
sys.path.append(APPLICATION_PATH)

from app.web import webconfig

COMPILED = webconfig.COMPILED
BUILD_INFO_DIR_PATH = 'build_info'
BUILD_ROOT = 'application/build'
CSS_COMPILER_PATH = '~/Documents/yui-libs/yuicompressor-2.4.6/build/yuicompressor-2.4.6.jar'
CSS_EMBEDED_PATH = '~/Documents/build_tools/cssembed-0.3.6.jar'
GENJSDEPS_BUILDER_PATH = '~/Documents/google-libs/closure-lib/closure/bin/calcdeps.py'
JS_COMPILER_PATH = '~/Documents/google-libs/jsc/compiler.jar'
RESOURCE_ROOT = 'application/resource'
SOY_COMPILER_PATH = 'application/resource/soy-lib/SoyToJsSrcCompiler.jar'
USE_EMBED_IMAGE = webconfig.USE_EMBED_IMAGE

RESOURCE_DIRECTORIES = [
  'hw',
  'closure-lib/closure',
  'closure-lib/third_party',
  'soy-lib',
  ]

MODULE_NAMES = [
  'BasePage',
  'DockPage',
  'HomePage',
  'FriendsPage',
  'AlbumsPage',
  'ProfilePage',
  'PhotosPage',
  'PhotoPage',
  'GroupsPage',
  'PlacesPage',
  'TbdPage', # Kep this one last.
]

CSS_SOURCES = webconfig.CSS_FILE_NAMES

SOY_PATHS = [
  RESOURCE_ROOT + '/hw/msg/*.tpl',
  RESOURCE_ROOT + '/hw/layout/*.tpl',
  RESOURCE_ROOT + '/hw/layout/*.tpl',
  RESOURCE_ROOT + '/hw/module/*.tpl',
  RESOURCE_ROOT + '/hw/ui/*.tpl',
  RESOURCE_ROOT + '/hw/ui/scroll/*.tpl',
  RESOURCE_ROOT + '/hw/ui/feed/*.tpl',
  ]