#!/usr/bin/env bash

bin/build.sh
if [ $? != 0 ]; then
  printf "Build failure"
  exit 1
fi

http-server .
