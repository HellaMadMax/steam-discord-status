# Steam Discord Status
Simple script which uses [steam-server-query](https://github.com/GiyoMoon/steam-server-query) and [discord.js](https://github.com/discordjs/discord.js) to show the player count and map of a game server as the discord bot's status.  
This will only work for games which use the steam master server.

## Installation & Running
```bash
npm install steam-discord-status
```
```bash
cd node_modules\steam-discord-status
npm start
```

## Configuration
Server details and map formatting is read from config.json.
```json
{
	"servers": {
		"Strayagaming Arma": {"server": "103.212.224.189:2303", "discord": "", "timeout": 10000},
		"HLL TFK #1": {"server": "139.99.131.122:26662", "discord": "", "interval": 20},
		"KZG Easy Surf #2": {"server": "139.99.144.113:27050", "discord": "", "attempts": 2}
	},
	"maps": {
		"hlldir": {
			"CT": "Carentan",
			"Hill400": "Hill 400",
			"Hurtgen": "Hürtgen Forest",
			"Omaha": "Omaha Beach",
			"PHL": "Purple Heart Lane",
			"StMarie": "Sainte-Marie-du-Mont",
			"SME": "Sainte-Mère-Église",
			"Stalin": "Stalingrad",
			"Utah": "Utah Beach"
		}
	}
}
```
### Server Options
- `server`: Host and port of the game server to call.
- `discord`: Optional. Token of your bot created in [discord applications](https://discord.com/developers/applications). If this is missing or empty then the script will only output server details to console without attempting to connect to discord.'
- `interval`: Optional. How often in seconds to update the player count and map. Be mindful of rate limits on discord.
- `attempts`: Optional. Number of call attempts to make. Default is 1 attempt.
- `timeout`: Optional. Time in milliseconds after the socket request should fail. Default is 1000. Specify an array of timeouts if they should be different for every attempt. (Example for 3 attempts: `[1000, 1000, 2000]`)

### Map formatting
In the configuration file you can add map names that should be converted as often they will be shortened or use a code name.   It uses the folder name to distinguish per game (e.g. hlldir for Hell Let Loose) in case of any overlap between games. You can find this by running the below script and using the `folder` value.
```bash
cd node_modules\steam-discord-status
npm run query 139.99.131.122:26662
```
```
139.99.131.122:26662 {
  protocol: 17,
  name: 'Task Force Koala | AU #1 | Mixed Modes | discord.gg/tfk',
  map: 'StMarie',
  folder: 'hlldir',
  game: 'Hell Let Loose',
  appId: 0,
  players: 98,
  maxPlayers: 100,
  bots: 0,
  serverType: 'd',
  environment: 'w',
  visibility: 0,
  vac: 1,
  version: '0.1.1.0',
  port: 8772,
  keywords: 'GS:gio4b8TzWyfAAIIm,CONMETHOD:P2P,P2PADDR:90157901846659083,P2PPORT:8772,SESSIONFLAGS:171,VISIB_i:0',
  gameId: 686810n
}
```

## Notes
The query port can be different from the connect port you use to join the game.  
If you don't know what the query port is you can use the master server script to find out.
```bash
cd node_modules\steam-discord-status
npm run master 139.99.131.122
```
```
139.99.131.122:26662 {
  protocol: 17,
  name: 'Task Force Koala | AU #1 | Mixed Modes | discord.gg/tfk',
  map: 'StMarie',
  folder: 'hlldir',
  game: 'Hell Let Loose',
  appId: 0,
  players: 82,
  maxPlayers: 100,
  bots: 0,
  serverType: 'd',
  environment: 'w',
  visibility: 0,
  vac: 1,
  version: '0.1.1.0',
  port: 8772,
  keywords: 'GS:gio4b8TzWyegAIIG,CONMETHOD:P2P,P2PADDR:90157901846659083,P2PPORT:8772,SESSIONFLAGS:171,VISIB_i:0',
  gameId: 686810n
}
139.99.131.122:26904 {
  protocol: 17,
  name: 'Aussie Battler Gaming | AU#1 | Mixed Modes | discord.gg/abg',
  map: 'Kursk',
  folder: 'hlldir',
  game: 'Hell Let Loose',
  appId: 0,
  players: 0,
  maxPlayers: 100,
  bots: 0,
  serverType: 'd',
  environment: 'w',
  visibility: 0,
  vac: 1,
  version: '0.1.1.0',
  port: 9014,
  keywords: 'GS:ojEqcMTzWycAAAIG,CONMETHOD:P2P,P2PADDR:90157901846670339,P2PPORT:9014,SESSIONFLAGS:171,VISIB_i:0',
  gameId: 686810n
}
139.99.131.122:27146 {
  protocol: 17,
  name: 'Chimera | Training & Events | discord.gg/CHMA',
  map: 'Hurtgen',
  folder: 'hlldir',
  game: 'Hell Let Loose',
  appId: 0,
  players: 1,
  maxPlayers: 100,
  bots: 0,
  serverType: 'd',
  environment: 'w',
  visibility: 1,
  vac: 1,
  version: '0.1.1.0',
  port: 9256,
  keywords: 'GS:giocccTzWycCAAAG,CONMETHOD:P2P,P2PADDR:90157901847378951,P2PPORT:9256,SESSIONFLAGS:171,VISIB_i:0',
  gameId: 686810n
}
```
In this example the query and connect ports are:  
query 139.99.131.122:26662 => connect 139.99.131.122:8772  
query 139.99.131.122:26904 => connect 139.99.131.122:9014  
query 139.99.131.122:27146 => connect 139.99.131.122:9256

## License
This repository and the code inside it is licensed under the MIT License. Read [LICENSE](https://github.com/HellaMadMax/steam-discord-status/blob/main/LICENSE) for more information.
