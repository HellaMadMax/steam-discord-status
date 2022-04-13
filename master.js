let address = process.argv[2]
if (typeof(address) == "undefined" || address == "") {
	console.error("missing argument")
	return
}
const steam = require("steam-server-query")
steam.queryMasterServer("hl2master.steampowered.com:27011", steam.REGIONS.ALL, {gameaddr: address}).then(function(servers) {
	for (let i in servers) {
		let server = servers[i]
		steam.queryGameServerInfo(server).then(function(data) {
			console.log(server, data)
		}).catch(function(error) {
			console.error(server, error)
		})
	}
})