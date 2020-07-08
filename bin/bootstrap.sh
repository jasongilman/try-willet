#!/usr/bin/env bash

git submodule init
if [ $? != 0 ]; then
  printf "Initialized submodule failure"
  exit 1
fi

git submodule update
if [ $? != 0 ]; then
  printf "submodule update failure"
  exit 1
fi

npm install
if [ $? != 0 ]; then
  printf "npm install failure"
  exit 1
fi

cd ace

npm install
if [ $? != 0 ]; then
  printf "npm install failure"
  exit 1
fi

node Makefile.dryice.js full --target ../ace-builds
if [ $? != 0 ]; then
  printf "ace build failure"
  exit 1
fi
