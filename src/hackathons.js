const rp = require('request-promise')

var url = "http://127.0.0.1:50981/na-2018"

const hackathons_eu = _ =>
	rp('http://127.0.0.1:50981/eu-2018')
	.then(function(body) {
		var obj = JSON.parse(body);
		return obj;
	})

const hackathons_us = _ =>
	rp('http://127.0.0.1:50981/na-2018')
	.then(function(body) {
		var obj = JSON.parse(body);
		return obj;
	})

var hackathon_data_eu = {};
var hackathon_data_us = {};

hackathons_eu().then(function(obj) {
	Object.keys(obj).forEach(function(key) {
		var hthon = {
			date: obj[key]['date'], 
			location: obj[key]['location'],
			link: obj[key]['link'],
		};
		hackathon_data_eu[obj[key]['name']] = hthon;
	});
	console.log(hackathon_data_eu);
});

hackathons_us().then(function(obj) {
	Object.keys(obj).forEach(function(key) {
		var hthon = {
			date: obj[key]['date'], 
			location: obj[key]['location'],
			link: obj[key]['link'],
		};
		hackathon_data_us[obj[key]['name']] = hthon;
	});
	console.log(hackathon_data_us);
});
