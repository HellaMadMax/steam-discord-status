let address = process.argv[2]
if (typeof(address) == "undefined" || address == "") {
	console.error("missing argument")
	return
}
const steam = require("steam-server-query")
steam.queryGameServerInfo(address).then(function(data) {
	console.log(address, data)
}).catch(function(error) {
	console.error(address, data)
})