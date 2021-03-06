const https = require("https");
const cheerio = require("cheerio");
const {toArray} = require("cheerio/lib/api/traversing");
const config = require("./config.json");

function scrape(query, pages) {
        https.request(`https://weheartit.com/search/entries?query=${query}&page=${pages + 1}`, (res) => {
            console.log("statuscode:", res.statusCode);
            let buffer = Buffer.alloc(0);
            res.on("data", (data) => {
                buffer = Buffer.concat([buffer, data]);
            });
            res.on("end", () => {
                const $ = cheerio.load(buffer);
                console.log(JSON.stringify($("img.entry-thumbnail")
                    .map((i, el) => $(el).attr("src"))
                    .toArray(), null, 4));
            });
        }).end();
}

scrape(config.query, config.pages);