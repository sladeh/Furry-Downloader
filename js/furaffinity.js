var fs = require("fs");
var req = require("request");
var cheerio = require('cheerio');
var usr = null;
var base_url = "http://www.furaffinity.net";
var downloadArray = [];

function scrape_favourites(current_page) {
    if (usr == null) {
        console.log("Please enter your username!");
        return;
    }
    
    req(base_url + "/favorites/" + usr + "/" + current_page.toString(), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            
            if ($("#no-images").length != 0) {
                downloadImages();
            } else {
                $("a", "u").each(function(i, elem){
                    downloadArray.push(base_url + $(this).attr("href"));
                });
                scrape_favourites(current_page + 1);
            }
        } else {
            console.log("Error occured!");
        }
    });
}

function downloadImages() {
    console.log("End of favourites!");
    console.log(downloadArray);
}

scrape_favourites(1);
