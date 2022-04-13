let config
try {
	config = require("./config.json")
} catch {
	console.warn(new Date().toLocaleString() + " - using config.example.json due to missing/invalid config.json")
	config = require("./config.example.json")
}
const discord = require("discord.js")
const steam = require("steam-server-query")
function servermonitor(options, client) {
	if (typeof(client) == "undefined" && typeof(options.discord) == "string" && options.discord !== "") {
		client = new discord.Client({intents: 0})
		client.on("ready", function() {
			console.log(new Date().toLocaleString() + " - '" + options.key + "' - logged into discord (" + client.user.tag + ")")
			servermonitor(options, client)
		}).login(options.discord).catch(function(error) {
			console.error(new Date().toLocaleString() + " - '" + options.key + "' - failed to log into discord (" + error + ")")
			if (error.code == "TOKEN_INVALID") {
				console.error(new Date().toLocaleString() + " - '" + options.key + "' - stopping due to fatal error")
				return
			}
			setTimeout(function() {
				servermonitor(options, client)
			}, options.interval * 1000)
		})
		return
	}
	steam.queryGameServerInfo(options.server, options.attempts, options.timeout).then(function(data) {
		if (config.maps[data.folder] && config.maps[data.folder][data.map]) {
			data.map = config.maps[data.folder][data.map]
		}
		let activity = data.players + "/" + data.maxPlayers + " on " + data.map
		console.log(new Date().toLocaleString() + " - '" + options.key + "' - '" + data.name + "' (" + options.server.split(":")[0] + ":" + data.port + ") " + activity)
		if (typeof(client) != "undefined") {
			client.user.setActivity({name: activity, type: 3})
		}
	}).catch(function(error) {
		console.error(new Date().toLocaleString() + " - '" + options.key + "' - failed to query server (" + error + ")")
		if (typeof(client) != "undefined") {
			client.user.setActivity({name: "Server Offline", type: 3})
		}
	}).finally(function() {
		setTimeout(function() {
			servermonitor(options, client)
		}, options.interval * 1000)
	})
}

for (let key in config.servers) {
	let options = config.servers[key]
	options.key = key
	options.interval ??= 30
	options.attempts ??= 1
	options.timeout ??= 1000
	if (typeof(options.discord) != "string" || options.discord == "") {
		console.warn(new Date().toLocaleString() + " - '" + options.key + "' - skipping logging into discord due to missing token")
	}
	servermonitor(options)
}