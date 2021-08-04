const http = require("https");
const fetch = require("node-fetch");
var fs = require("fs");

const options = {
	"method": "GET",
	"hostname": "api.ambeedata.com",
	"port": null,
	"path": "/weather/latest/by-lat-lng?lat=50.695577&lng=3.196580",
	"headers": {
		"x-api-key": "",
		"Content-type": "application/json"
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();

module.exports.getHumidity = () => {
    // Quand tu ecris ca, JS fait ce qui est ecri en dessous
    return fetch(req)
      .then((res) => res.json())
      .then((json) => {
        humidty = json;
        return humidty;
      });
  };
  
