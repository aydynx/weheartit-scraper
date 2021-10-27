const https = require("https");
const cheerio = require("cheerio");

function scrape(query, pages, log) {
    const requests = [];
    for (let i = 0; i < pages; i++)
         const queryParams = new URLSearchParams({
             query: query,
             page: i + 1
         });
    https.request(`https://weheartit.com/search/entries?${queryParams}`, (res) => {
        console.log("statusCode:", res.statusCode);
        //console.log("headers:", res.headers);
        let buffer = Buffer.alloc(0);
        res.on("data", (data) => {
            buffer = Buffer.concat([buffer, data]);
        });
        res.on("end", () => {
            const $ = cheerio.load(buffer);
            //if (log === "json")
            /*
            const linksArray = (($("img.entry-thumbnail")
                .map((i, el) => $(el).attr("src"))
                .toArray()
                .join("\n")));
            console.log(linksArray);
             */
            console.log = linksArray = JSON.stringify($("img.entry-thumbnail")
                .map((i, el) => $(el).attr("src"))
                .toArray(), null, 4);
            console.log(linksArray);
        });
    }).end();
}

scrape("cat", 1);
//!scrape <query> <pages> <thumbnail/full> <json/embed>