var chains = {}
chains['names'] = {}

chains['names'][1] = 'mainnet'

chains['mainnet'] = require('./mainnet.json')

module.exports = chains
