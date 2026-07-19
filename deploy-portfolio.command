#!/bin/bash
set -e
cd "/Users/omarmoussa/Desktop/Portfolio Website"

echo "==> Removing unused backup video..."
rm -f media/video/showreel-horizontal-576.mp4

echo "==> Resetting git state..."
rm -rf .git

echo "==> Initializing repo..."
git init
git config user.email "omarmoussa3553@gmail.com"
git config user.name "Omar Moussa"
printf '.DS_Store\n' > .gitignore
git add -A
git commit -m "Initial deploy — Omar Moussa portfolio site"
git branch -M main
git remote add origin https://github.com/omarmoussa3553/portfolio-website.git

echo "==> Pushing to GitHub (a browser or credential prompt may appear)..."
git push -u origin main

echo ""
echo "=========================================="
echo "PUSH_DONE — https://omarmoussa3553.github.io/portfolio-website/"
echo "=========================================="
echo "You can close this window."
