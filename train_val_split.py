# Разделить данные на Train, Validation и Test

from pathlib import Path
import random
import os
import sys
import shutil
import argparse


# Парсинг аргументов, которые передал пользователь

parser = argparse.ArgumentParser()
parser.add_argument('--datapath', help='Указать путь к данным',
                    required=True)
parser.add_argument('--train_pct', help='Доля данных, которая идет на обучение; \
                   (пример: ".8")',
                    default=.8)

parser.add_argument('--test_pct', help='Доля данных, которая идет на test; \
                    Остельные данные сохраняются в папке для валидации (пример: ".05")',
                    default=.05)

args = parser.parse_args()

data_path = args.datapath
train_percent = float(args.train_pct)
test_persent = float(args.test_pct)

# Check for valid entries
if not os.path.isdir(data_path):
   print('Directory specified by --datapath not found. Verify the path is correct (and uses double back slashes if on Windows) and try again.')
   sys.exit(0)
if train_percent < .01 or train_percent > 0.9:
   print('Invalid entry for train_pct. Please enter a number between .01 and .9.')
   sys.exit(0)
val_percent = 1 - train_percent - test_persent

# Define path to input dataset 
input_image_path = os.path.join(data_path,'images')
input_label_path = os.path.join(data_path,'labels')

# Define paths to image and annotation folders
cwd = os.getcwd()
train_img_path = os.path.join(cwd,'data/train/images')
train_txt_path = os.path.join(cwd,'data/train/labels')
val_img_path = os.path.join(cwd,'data/validation/images')
val_txt_path = os.path.join(cwd,'data/validation/labels')
test_img_path = os.path.join(cwd,'data/test/images')
test_txt_path = os.path.join(cwd,'data/test/labels')

# Create folders if they don't already exist
for dir_path in [train_img_path, train_txt_path, val_img_path, val_txt_path]:
   if not os.path.exists(dir_path):
      os.makedirs(dir_path)
      print(f'Created folder at {dir_path}.')


# Get list of all images and annotation files
img_file_list = [path for path in Path(input_image_path).rglob('*')]
txt_file_list = [path for path in Path(input_label_path).rglob('*')]

print(f'Number of image files: {len(img_file_list)}')
print(f'Number of annotation files: {len(txt_file_list)}')

# Determine number of files to move to each folder
file_num = len(img_file_list)
train_num = int(file_num*train_percent)
test_num = int(file_num*test_percent)
val_num = file_num - train_num - test_num
print('Images moving to train: %d' % train_num)
print('Images moving to test: %d' % test_num)
print('Images moving to validation: %d' % val_num)

# Select files randomly and copy them to train or val folders
for i, set_num in enumerate([train_num, val_num, test_num]):
  for ii in range(set_num):
    img_path = random.choice(img_file_list)
    img_fn = img_path.name
    base_fn = img_path.stem
    txt_fn = base_fn + '.txt'
    txt_path = os.path.join(input_label_path,txt_fn)

    if i == 0: # Copy first set of files to train folders
      new_img_path, new_txt_path = train_img_path, train_txt_path
    elif i == 1: # Copy second set of files to the validation folders
      new_img_path, new_txt_path = val_img_path, val_txt_path
    elif i == 2: # Copy third set of files to the test folders
      new_img_path, new_txt_path = test_img_path, test_txt_path

    shutil.copy(img_path, os.path.join(new_img_path,img_fn))
    #os.rename(img_path, os.path.join(new_img_path,img_fn))
    if os.path.exists(txt_path): # If txt path does not exist, this is a background image, so skip txt file
      shutil.copy(txt_path,os.path.join(new_txt_path,txt_fn))
      #os.rename(txt_path,os.path.join(new_txt_path,txt_fn))

    img_file_list.remove(img_path)
