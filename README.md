#What this project is
This project uses NodeJS and will download your favourite images from:
- Inkbunny
- e621

This project is still very young and contains a lot of bugs, if you find any please report them. To see a list of known bugs check the Known Bugs section.
To learn how to set it up check out the How to use it section.

##What it should do
Give people a node-webkit desktop like application where they can crawl and download their favourite images from furry gallery websites.

##What is planned
- Code refactoring.
- Support for FurAffinity.
- Support for Weasyl
- Support for SoFurry
- Node webkit intergration for UI stuff

##What is done
- Simple Inkbunny download
- Simple e621 download

##How to use it
###What you need
NodeJS

###Set up
- Download NodeJS.
- Git clone or download the .zip file into your NodeJS file.

###Inkbunny
Edit the inkbunny.js file and provide your account credentials, navigate to your NodeJS folder and run ```node furrydownloader/inkbunny.js```.

###e621
Edit the e621.js file and provide your e621 account name, navigate to your NodeJS folder and run ```node furrydownloader/e621.js```.

##Known Bugs
- e621 sometimes dies/404's, delete the images from your downloads/e621 folder and rerun the script. And hope for the best.