var genesisStates = {}
genesisStates['names'] = {}

genesisStates['names'][1] = 'mainnet'

genesisStates['mainnet'] = require('./mainnet.json')

module.exports = genesisStates
