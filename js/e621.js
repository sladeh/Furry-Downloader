/**
* e621 core
* Uses the e621 API to download a user's favourites
*
* @author Slade Hulderic
*
* Todo: Add check for existing files
*/

var request = require("request");
var fs = require("fs");

var username = null;
var base_url = "https://e621.net/post/index.json?tags=fav%3A";
var page = "0";
var downloadArray = [];

getFavourites(null, page);

function getFavourites(username, page)
{
    
    if (username === null) {
        console.log("Please provide a username");
        return;
    }
    
    var page = parseInt(page) + 1;
    
    console.log(page);
    
    var api_url = base_url + username + "&page=" + page;
    
    request(api_url, function(error, response, body)
	{
		// Bug: still runs this because there is no error 200
		// IB returns a json string which should be checked
		// if auth worked
		if (!error && response.statusCode == 200) {
			var parsedResponse = JSON.parse(body);
            
            if (!parsedResponse.length) {
                console.log("End of favourites");
                downloadImages();
            } else {
                for (var key in parsedResponse) {
                    downloadArray.push(parsedResponse[key].file_url);
                }
            
                getFavourites(username, page);
            }
            
		} else {
			console.log(response);
		}
	});
    
}

function downloadImages()
{
    for (var key in downloadArray) {
//		console.log("furrydownloader/downloads/" + downloadArray[key].substr(downloadArray[key].lastIndexOf("/") + 1));
        var download = request.get(downloadArray[key]).pipe(fs.createWriteStream("furrydownloader/downloads/e621/" + downloadArray[key].substr(downloadArray[key].lastIndexOf("/") + 1)));
        download.on('finish', function() {
             console.log("Downloaded a file!");
        });
	}
}