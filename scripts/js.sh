clear;

# rm -f application/build/*.js
echo 'build manifest'
python scripts/_build_manifest.py

echo 'build js...'
python scripts/_build_js.py

ls -al application/build/*.js
