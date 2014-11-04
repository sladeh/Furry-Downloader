/**
* Rewrite of the downloader
*
* @author Slade Hulderic
*
* Todo: Add check for existing files
*/

var request = require('request');
var fs = require('fs');

var base_url = "https://inkbunny.net/";
var user_id = null;
var session_id = null;
var downloadArray = [];
var downloadFolder = "downloads/inkbunny/";
var logDiv = document.getElementById("logDiv");

function authenticate(username, password)
{
    
    if (username === null && password === null || username === "" && password === "") {
        logDiv.innerHTML = "Please fill in your password and username<br>";
        return;
    }
    
    if (username === null || username === "") {
        logDiv.innerHTML = "Please fill in your username<br>";
        return;
    }
    
    if (password === null || password === "") {
        logDiv.innerHTML = "Please fill in your password<br>";
        return;
    }
    
    var login_url = base_url + 'api_login.php?username=' + username + '&password=' + password;
    
    request(login_url, function(error, response, body)
	{
		// Bug: still runs this because there is no error 200
		// IB returns a json string which should be checked
		// if auth worked
		if (!error && response.statusCode == 200) {
			logDiv.innerHTML += "Login successful!<br>";
			var parsedResponse = JSON.parse(body);
			session_id = parsedResponse.sid;
			user_id = parsedResponse.user_id;
            getFavourites();
		} else {
			logDiv.innerHTML += response + "<br>";
		}
	});
    
}

function getFavourites()
{
	logDiv.innerHTML += "Fetching list of favourite items...<br>";

	var api_url = base_url + 'api_search.php?sid=' + session_id + '&favs_user_id=' + user_id + '&get_rid=yes';
	var results_id = null;
	var total_pages = 1;
	var current_page = 0;

	getImageUrls(api_url, results_id, total_pages, current_page);
}

function getImageUrls(api_url, results_id, total_pages, current_page)
{
    
	if (current_page <= total_pages) {
		request(api_url, function(error, response, body)
		{
			if (!error && response.statusCode == 200) {
				var parsedResponse = JSON.parse(body);
                
				for (var key in parsedResponse.submissions) {
					var imageFileName = parsedResponse.submissions[key].file_name;
					var unknown_slug_thing = imageFileName.substring(0, 3)
					downloadArray.push(base_url + 'files/full/' + unknown_slug_thing + '/' + imageFileName);
				}
                
            var current_page = parseInt(parsedResponse.page) + 1;
            var total_pages = parsedResponse.pages_count;
            var results_id = parsedResponse.rid;
            var api_url = base_url + 'api_search.php?sid=' + session_id + '&favs_user_id=' + user_id + '&rid=' + results_id + "&page=" + current_page;
                
			getImageUrls(api_url, results_id, total_pages, current_page);
                
			} else {
				logDiv.innerHTML += response + "<br>";
				return;
			}
		});
	} else {
        logDiv.innerHTML += "Ending cycle and going to download the images...<br>";
		downloadImages();
	}
    
}

function downloadImages()
{
	for (var key in downloadArray) {
        var download = request.get(downloadArray[key]).pipe(fs.createWriteStream(downloadFolder + downloadArray[key].substr(downloadArray[key].lastIndexOf("/") + 1)));
        download.on('finish', function() {
             logDiv.innerHTML += "Downloaded a file!<br>";
        });
	}
}