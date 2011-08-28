import glob
import os
import buildconfig

SOY_PATHS = buildconfig.SOY_PATHS

SOY_FLAGS = [
  #'--cssHandlingScheme REFERENCE',
  '--shouldGenerateJsdoc',
  '--shouldProvideRequireSoyNamespaces',
  ]

def write_text(path, text) :
  file = open(path, 'w')
  file.write(text)
  file.close()


def get_file_text(path) :
  file = open(path)
  lines = []
  for line in file.xreadlines() :
    lines.append(line.strip())
  file.close()
  return ''.join(lines)


def get_build_info_file(path) :
  path = path.replace('/', '_')
  path = path.replace('\\', '_')
  path = buildconfig.BUILD_INFO_DIR_PATH + '/' + path
  if not os.path.exists(path) :
    write_text(path, 'new')
  return path


def is_modified(path) :
  time_1 = os.path.getmtime(path)
  time_2 = get_file_text(get_build_info_file(path))
  if str(time_1) != str(time_2) :
    return False
  return True


def build_soy(path) :
  if is_modified(path) and not buildconfig.COMPILED :
    print 'skip %s' % path
    return

  print '\nbuild %s\n' % path
  soy_flags = SOY_FLAGS[0 :]

  if buildconfig.COMPILED :
    soy_flags.append('--cssHandlingScheme REFERENCE')

  flags_str = ' '.join([str(soy_flag) for soy_flag in soy_flags])
  output_flag = '--outputPathFormat %s.js' % path
  cmd = 'java -jar %s %s %s %s' % (
    buildconfig.SOY_COMPILER_PATH,
    flags_str,
    output_flag,
    path)
  print cmd
  os.system(cmd)
  if buildconfig.COMPILED :
    write_text(get_build_info_file(path), 'build..')
  else :
    write_text(get_build_info_file(path), str(os.path.getmtime(path)))


def build_soys() :
  for soy_path in SOY_PATHS :
    soy_files = glob.glob(soy_path)
    for soy_file in soy_files :
      build_soy(soy_file)

if __name__ == '__main__' :
  build_soys()