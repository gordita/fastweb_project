import os
import buildconfig


def get_deps_list(path) :
  file = open(path)
  lines = []
  for line in file.xreadlines() :
    lines.append(line.strip())
  file.close()
  return lines


def build_base_cmd() :
  sources_str = ' '.join([
  '-p %s/%s' % (buildconfig.RESOURCE_ROOT, res) for res in
  buildconfig.RESOURCE_DIRECTORIES
  ])

  strf = '-i %s/hw/module/%s.js'
  root = buildconfig.RESOURCE_ROOT
  module_inputs_str = ' '.join([
  strf % (root, mod.lower()) for mod in buildconfig.MODULE_NAMES
  ])

  input_str = '-i %s/js/startup.js %s' % (
    buildconfig.RESOURCE_ROOT, module_inputs_str)
  cmd = '%s %s %s ' % (
    buildconfig.GENJSDEPS_BUILDER_PATH,
    input_str,
    sources_str)
  return cmd


def build_dev_defs() :
  output_path = '%s/js/deps.js' % buildconfig.RESOURCE_ROOT
  output_str = ('-o deps > %s ' % output_path)
  cmd = build_base_cmd() + output_str
  print cmd
  os.system(cmd)


def build_bin_defs() :
  output_path = '%s/js/deps-list.txt' % buildconfig.RESOURCE_ROOT
  output_str = ('-o list > %s ' % output_path)
  cmd = build_base_cmd() + output_str

  print cmd
  os.system(cmd)

  deps_list = get_deps_list(output_path)
  deps_count = 0
  flags = []
  last_module_name = None
  startup = False
  for dep in deps_list :
    deps_count += 1
    flags.append('--js %s' % dep)
    if dep.find('/js/startup.js') > -1 :
      flags.append('--module %s:%s' % ('startup', deps_count))
      deps_count = 0
      last_module_name = 'startup'
      startup = True
    elif (startup and
          dep.find('/hw/module/') > -1 and
          dep.find('.tpl.') < 0 ) :
      module_name = (dep[dep.rfind('/') + 1 :]).replace('.js', '')
      flags.append(
        '--module %s:%s:%s' % (module_name, deps_count, last_module_name ))
      last_module_name = module_name
      deps_count = 0

  output_path = '%s/js/deps-build.txt' % buildconfig.RESOURCE_ROOT
  file = open(output_path, 'w')
  file.write('\n'.join(flags))
  file.close()


def build_module_names() :
  js_lines = [
    "// generated code, do not edit.",
    "goog.provide('hw.Module');",
    "goog.provide('hw.Module.Name');",
    "goog.provide('hw.Module.Url');",
    "goog.provide('hw.Module.Deps');",
    "\n\n/** @type {Object} */",
    "hw.Module.Names = {};",
    ]

  for name in buildconfig.MODULE_NAMES :
    js_lines.append("hw.Module.Names.%s = '%s';" % (name, name.lower()))

  js_lines.append('\n\n/** @type {Object} */')
  js_lines.append('hw.Module.Deps = {};')

  last_modudle_name = ''
  for name in buildconfig.MODULE_NAMES :
    js_lines.append("hw.Module.Deps[hw.Module.Names.%s] = [%s];" % (
      name, last_modudle_name))
    last_modudle_name = "hw.Module.Names.%s" % name

  js_lines.append('\n\n/** @type {Object} */')
  js_lines.append('hw.Module.Url = {};')

  #  if not buildconfig.COMPILED :
  #    prefix = 'bin'
  #  else :
  #    prefix = 'raw'

  prefix = 'bin'

  for name in buildconfig.MODULE_NAMES :
    js_lines.append("hw.Module.Url[hw.Module.Names.%s] = 'build/%s.%s.js';" % (
      name, prefix, name.lower()))

  js_code = ('\n').join(js_lines)
  output_path = '%s/hw/module.js' % buildconfig.RESOURCE_ROOT
  file = open(output_path, 'w')
  file.write(js_code)
  file.close()


def build_dev_bootloader() :
  js_lines = [
    "// generated code, do not edit.",
    "goog.provide('hw.DevOnly');",
    "goog.require('hw.config');",
    "goog.require('hw.ui.Chrome');",
    ]

  for name in buildconfig.MODULE_NAMES :
    js_lines.append("goog.require('hw.module.%s');" % name)

  js_code = ('\n').join(js_lines)
  output_path = '%s/hw/dev.js' % buildconfig.RESOURCE_ROOT
  file = open(output_path, 'w')
  file.write(js_code)
  file.close()

if __name__ == '__main__' :
  build_dev_bootloader()
  build_module_names()
  build_bin_defs()
  build_dev_defs()
