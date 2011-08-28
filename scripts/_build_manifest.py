import buildconfig
import time
import glob

# http://www.html5rocks.com/en/tutorials/appcache/beginner/
MANIFEST_TPL = """
# Auto Generated File
# Do not edit this file.

MANIFEST_VERSION = %s

MANIFEST = \"\"\"
CACHE MANIFEST
# version %s %s

# Explicitly cached 'master entries'.
CACHE:
%s

# Resources that require the user to be online.
NETWORK:
*
\"\"\"
"""

def write_text(path, text) :
  file = open(path, 'w')
  file.write(text)
  file.close()


def build_manifest() :
  files = (
    glob.glob(buildconfig.BUILD_ROOT + '/*.js') +
    glob.glob(buildconfig.BUILD_ROOT + '/*.css')
    )

  if not buildconfig.USE_EMBED_IMAGE :
    files = files + (
      glob.glob(buildconfig.BUILD_ROOT + '/images/*.png') +
      glob.glob(buildconfig.BUILD_ROOT + '/images/*.jpg') +
      glob.glob(buildconfig.BUILD_ROOT + '/images/*.gif')
      )

  file_paths = []
  for file_path in files :
    if file_path.find('raw.') < 0 :
      file_paths.append(
        'build%s' % file_path.replace(buildconfig.BUILD_ROOT, ''))

  file_paths = '\n'.join(file_paths)
  timestamp = time.time()
  text = MANIFEST_TPL % (timestamp,
                         time.strftime("%d - %b% - Y", time.localtime()),
                         timestamp,
                         file_paths)

  outpath = '%s/manifest.py' % buildconfig.APPLICATION_PATH
  write_text(outpath, text)


if __name__ == '__main__' :
  build_manifest()