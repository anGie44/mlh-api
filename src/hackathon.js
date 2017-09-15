const rp = require('request-promise')
const lib = require('../lib/common')

const events = mlh_season => (mlh_season.includes('all')
	? hackathons_all()
	: mlh_season.includes('na')
		? hackathons_na()
		: hackathons_eu()
	.then(function(obj) {
		var hackathon_data = [];
		Object.keys(obj).forEach(function(key) {
			var hthon = {
				date: obj[key]['date'], 
				location: obj[key]['location'],
				link: obj[key]['link'],
				name: obj[key]['name'],
			};
			hackathon_data.push(hthon);
		});
		return hackathon_data;
	})
	)
	
const hackathons_eu = _ =>
	rp('http://127.0.0.1:50981/eu-2018')
	.then(function(body) {
		var obj = JSON.parse(body);
		return obj;
	})

const hackathons_na = _ =>
	rp('http://127.0.0.1:50981/na-2018')
	.then(function(body) {
		var obj = JSON.parse(body);
		return obj;
	})

const hackathons_all = _ =>
	rp('http://127.0.0.1:50981/')
	.then(function(body) {
		var obj = JSON.parse(body);
		return obj;
	})

const search = query => Promise.resolve(query)
	.then(query => { query.search = query.search || ''; return query })
	.then(query => {
		query.event = query.events || query.event
		if (!query.event) return events(query.mlh_season)
			.then(hackathons => { query.event = hackathons; return query })
		if (Array.isArray(query.event)) return query;
		else {
			query.event = [query.event]; return query
		}
	})

module.exports = {
	hackathons_eu,
	hackathons_na,
	hackathons_all,
	events,
	search,
}