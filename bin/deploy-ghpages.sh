#!/bin/bash

npm run-script build;

# do not deploy other branches
if [[ $TRAVIS_BRANCH != "master" ]]
then
  echo "Skip deploy on branch $TRAVIS_BRANCH ...";
  exit 0;
fi

# deploy *all* the things
( cd build
  git init
  git config user.name "Travis-CI"
  git config user.email "madbence@gmail.com"
  git add .
  git commit -m "Deployed to Github Pages"
  git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages >/dev/null 2>&1
)
