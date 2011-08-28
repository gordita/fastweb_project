echo 'application/static/*';

echo 'remove old symlinks'
rm -fr application/static;
echo 'build symlinks';
ln -s $PWD/application/resource application/static;
