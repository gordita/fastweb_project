import glob
import os

imgs = glob.glob('*.png') + glob.glob('*.svg')

for img in imgs:
  new_img = img.replace(' ', '_')
  new_img = new_img.replace('(', '_')
  new_img = new_img.replace(')', '_')
  print "%s > %s" % (img, new_img)
  os.rename(img, new_img)