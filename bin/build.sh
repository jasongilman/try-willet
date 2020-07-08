#!/usr/bin/env bash

mkdir -p dist/
cp index.html dist/

node bin/generate_examples.js
if [ $? != 0 ]; then
  printf "Failed generating examples"
  exit 1
fi

browserify src/main.js -o dist/bundle.js
if [ $? != 0 ]; then
  printf "browserify failure"
  exit 1
fi

cp ace-builds/src-noconflict/ace.js dist/
cp ace-builds/src-noconflict/theme-monokai.js dist/
cp ace-builds/src-noconflict/mode-willet.js dist/
cp ace-builds/src-noconflict/mode-json.js dist/
cp ace-builds/src-noconflict/worker-json.js dist/

cp node_modules/bootstrap/dist/css/bootstrap.min.css* dist/
cp node_modules/bootstrap/dist/js/bootstrap.min.js* dist/

cp node_modules/jquery/dist/jquery.slim.min.js* dist/

cp node_modules/popper.js/dist/umd/popper.min.js* dist/

echo "Done building"
