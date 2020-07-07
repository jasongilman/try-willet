#!/usr/bin/env bash

mkdir -p dist/
cp index.html dist/

cp ace-builds/src-noconflict/ace.js dist/
cp ace-builds/src-noconflict/theme-monokai.js dist/
cp ace-builds/src-noconflict/mode-willet.js dist/

cp node_modules/bootstrap/dist/css/bootstrap.min.css* dist/
cp node_modules/bootstrap/dist/js/bootstrap.min.js* dist/

cp node_modules/jquery/dist/jquery.slim.min.js* dist/

cp node_modules/popper.js/dist/umd/popper.min.js* dist/

echo "Done building"
