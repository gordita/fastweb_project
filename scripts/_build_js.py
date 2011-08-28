import os
import time
import buildconfig

DEFAULT_FLAGS = [
  '--externs=%s/externs/console.js' % buildconfig.RESOURCE_ROOT,
  '--externs=%s/externs/fbapi.js' % buildconfig.RESOURCE_ROOT,
  '--define=goog.userAgent.product.ASSUME_IPHONE',
  '--define=goog.userAgent.product.ASSUME_IPAD',
  '--define=goog.userAgent.product.ASSUME_CHROME',
  '--define=hw.config.BUILD_TIME=%s' % round(time.time()),
  '--define=hw.config.USE_NATIVE_LOGGER=false',
  '--define=hw.config.USE_HTML_LOGGER=false',
  '--define=hw.config.USE_MOCK_DATA=false',
  '--define=hw.config.USE_MOCK_FB_API=false',
  '--define=COMPILED',
  ]

PROD_DEFAULT_FLAGS = DEFAULT_FLAGS + [
  '--compilation_level=ADVANCED_OPTIMIZATIONS',
  '--warning_level=VERBOSE',
  # '--output_wrapper='(function() {%output%})();'',
  '--jscomp_error=checkTypes',
  '--jscomp_error=unknownDefines',
  '--jscomp_error=missingProperties',
  '--jscomp_error=strictModuleDepCheck',
  '--jscomp_error=accessControls',
  '--jscomp_error=visibility',
  '--module_output_path_prefix %s/bin.' % buildconfig.BUILD_ROOT
]

DESKTOP_FLAGS = PROD_DEFAULT_FLAGS + [
  #'--formatting=pretty_print',
  '--define=goog.userAgent.ASSUME_WEBKIT',
  '--define=goog.userAgent.ASSUME_MOBILE_WEBKIT',
  ]

MOBILE_FLAGS = PROD_DEFAULT_FLAGS + [
  '--define=OPTIMIZE_FOR_MOBILE',
  '--define=goog.userAgent.ASSUME_WEBKIT',
  '--define=goog.userAgent.ASSUME_MOBILE_WEBKIT',
  ]

DEBUG_FLAGS = DEFAULT_FLAGS + [
  '--formatting=pretty_print',
  '--compilation_level=WHITESPACE_ONLY',
  '--module_output_path_prefix %s/raw.' % buildconfig.BUILD_ROOT,
  ]


def build_js() :
  if buildconfig.COMPILED :
    _build_js(DESKTOP_FLAGS)
  else :
    pass
    # _build_js(DEBUG_FLAGS)
    #
    # _build_js(page_name, MOBILE_FLAGS, True)


def get_build_text() :
  path = '%s/js/deps-build.txt' % buildconfig.RESOURCE_ROOT
  file = open(path)
  lines = []
  for line in file.xreadlines() :
    lines.append(line.strip())
  file.close()
  return ' '.join(lines)


def _build_js(flags) :
  flags_text = ' '.join([str(flag) for flag in flags])
  cmd = 'java -jar %s %s %s' % (
    buildconfig.JS_COMPILER_PATH,
    flags_text,
    get_build_text())
  print cmd
  os.system(cmd)


if __name__ == '__main__' :
  build_js()


#  deps_str = ' '.join(
#    [('-p %s/%s' % (RESOURCE_ROOT, res)) for res in RESOURCE_DIRECTORIES])
#  flags = DEFAULT_FLAGS + extra_flags
#  flags_str = ' '.join([('-f "%s"' % flag ) for flag in flags])
#
#  if is_mobile :
#    is_mobile = 'mbin'
#  else :
#    is_mobile = 'bin'
#
#  output_str = '-o compiled > application/build/%s.%s.js' % (
#    page_name, is_mobile)
#
#  input_str = ' -i %s/js/%sstartup.js' % (RESOURCE_ROOT, page_name)
#  cmd = '%s %s %s %s %s %s' % (
#    GENJSDEPS_PATH,
#    '-c  %s' % COMPILER_PATH,
#    deps_str,
#    flags_str,
#    output_str,
#    input_str)
#
#  print cmd
#  os.system(cmd)