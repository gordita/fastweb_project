echo 'backup resources'
zip -r resources.backup.zip application/resource/

rm application/build/raw.*

echo 'prepare to deploy'
rm -fr application/static;
#mkdir -p application/static;
mkdir -p ~/build_project_temp;
mv application/resource ~/build_project_temp/resource;
appcfg.py update application;
mv ~/build_project_temp/resource application/resource;
sh scripts/make_static_simlinks.sh;
echo 'Done!';