#Furry Downloader (v0.8 Galaxtic Kangaroo)
New in this version:
- NodeJS packaged with the project
- Very basic Furaffinity support (read the FA par for more information)

This project uses NodeJS and will download your favourite images from:
- Inkbunny
- e621
- Furaffinity
- Weasyl
- SoFurry
- Maybe more in the future?

This project is still very young and contains a lot of bugs, if you find any please report them. To see a list of known bugs check the Known Bugs section.
To learn how to set it up check out the How to use it section.

The downloaders are seperate scripts with their own versions and branches since they work seperately. You can (read: have to) run each script on their own and do their own thing. 

##What it should do
Give people a node-webkit desktop like application where they can crawl (or use the API if it exists) and download their favourite images from furry gallery websites.

##What is planned
- Code refactoring
- Support for FurAffinity (50%)
- Support for Weasyl
- Support for SoFurry
- Node webkit intergration for UI stuff

##What is done
###Inkbunny
- Authentication
- Basic image downloading

###e621
- Basic image downloading

###Furaffinity
- Basic image URL fetching

##How to use it
###What you need
This repository.

###Set up
- Git clone or download the .zip file.

###Inkbunny (v1.0)
- Edit the inkbunny.js file and provide your account credentials, navigate to your NodeJS folder and run ```node furrydownloader/inkbunny.js```.
- On your Inkbunny account allow API access, or else this script will not work.

So far IB is the most supported part of this project, it fully works unless there are errors caused by the network, server, or other things from outside the script itself. Error handling will be added later on.

###e621 (v1.0)
- Edit the e621.js file and provide your e621 account name, navigate to your NodeJS folder and run ```node furrydownloader/e621.js```.
e621 supports downloading all your (or someone else's) favourites but it will break when e621 throws an error, just empty your downloads folder and re-run the script.

###Furaffinity (v0.5)
- Edit the furaffinity.js file and provide your FA account name, navigate to your NodeJS folder and run ```node furrydownloader/furaffinity.js```
FA has limited support as of now, it only fetches the URL's and outputs the strings of your public favourites which means Adult and Mature tagged images will not be shown.

##Known Bugs
- e621 sometimes dies/404's, delete the images from your downloads/e621 folder and rerun the script. And hope for the best.