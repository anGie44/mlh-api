const rp = require('request-promise')
const lib = require('../lib/common')

const events = mlh_season => (mlh_season.includes('all')
	? hackathons_all()
	: hackathons(mlh_season)
	.then(body => body)
	)

const hackathons = season =>
	rp('http://127.0.0.1:50981/' + season)
	.then(body => JSON.parse(body).data.events.map(d => ({
		name : d.name,
		dateRange : d.date,
		startDate : d.date.split(" ")[0] + ' ' + d.date.split(" ")[1].replace(/\D/g, '') + ', ' + (new Date()).getFullYear(),
		endDate : d.date.split(" ")[0] + ' ' +  d.date.split(" ")[3].replace(/\D/g, '') + ', ' + (new Date()).getFullYear(),
		where : d.location,
		link : d.link
	}))
	)

const hackathons_all = _ =>
	rp('http://127.0.0.1:50981/')
	.then(body => JSON.parse(body).data.eu_events.map(d => ({
		name : d.name,
		dateRange : d.date,
		startDate : d.date.split(" ")[0] + ' ' + d.date.split(" ")[1].replace(/\D/g, '') + ', ' + (new Date()).getFullYear(),
		endDate : d.date.split(" ")[0] + ' ' +  d.date.split(" ")[3].replace(/\D/g, '') + ', ' + (new Date()).getFullYear(),
		where : d.location,
		link : d.link
	})).concat(JSON.parse(body).data.us_events.map(d => ({
		name : d.name,
		dateRange : d.date,
		startDate : d.date.split(" ")[0] + ' ' + d.date.split(" ")[1].replace(/\D/g, '') + ', ' + (new Date()).getFullYear(),
		endDate : d.date.split(" ")[0] + ' ' +  d.date.split(" ")[3].replace(/\D/g, '') + ', ' + (new Date()).getFullYear(),
		where : d.location,
		link : d.link
	})))
	)

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
	hackathons,
	hackathons_all,
	events,
	search,
}