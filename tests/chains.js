const tape = require('tape')
const Common = require('../index.js')

tape('[Common]: Initialization / Chain params', function (t) {
  t.test('Should initialize with chain provided', function (st) {
    let c = new Common('mainnet')
    st.equal(c.chainName(), 'mainnet', 'should initialize with chain name')
    st.equal(c.chainId(), 1, 'should return correct chain Id')
    st.equal(c.networkId(), 1, 'should return correct network Id')
    st.equal(c.hardfork(), null, 'should set hardfork to null')
    st.equal(c._isSupportedHardfork('constantinople'), true, 'should not restrict supported HFs')

    c = new Common(1)
    st.equal(c.chainName(), 'mainnet', 'should initialize with chain Id')

    st.end()
  })

  t.test('Should initialize with chain and hardfork provided', function (st) {
    let c = new Common('mainnet', 'byzantium')
    st.equal(c.hardfork(), 'byzantium', 'should return correct hardfork name')

    st.end()
  })

  t.test('Should initialize with supportedHardforks provided', function (st) {
    let c = new Common('mainnet', 'byzantium', ['byzantium', 'constantinople'])
    st.equal(c._isSupportedHardfork('byzantium'), true, 'should return true for supported HF')
    st.equal(c._isSupportedHardfork('spuriousDragon'), false, 'should return false for unsupported HF')

    st.end()
  })

  t.test('Should handle initialization errors', function (st) {
    st.throws(function () { new Common('chainnotexisting') }, /not supported$/, 'should throw an exception on non-existing chain') // eslint-disable-line no-new
    st.throws(function () { new Common('mainnet', 'hardforknotexisting') }, /not supported$/, 'should throw an exception on non-existing hardfork') // eslint-disable-line no-new
    st.throws(function () { new Common('mainnet', 'spuriousDragon', ['byzantium', 'constantinople']) }, /supportedHardforks$/, 'should throw an exception on conflicting active/supported HF params') // eslint-disable-line no-new

    st.end()
  })

  t.test('Should provide correct access to chain parameters', function (st) {
    let c = new Common('mainnet')
    st.equal(c.genesis().hash, '0x0376899c001618fc7d5ab4f31cfd7f57ca3a896ccc1581a57d8f129ecf40b840', 'should return correct genesis hash')
    st.equal(c.hardforks()[0]['block'], 0, 'should return correct hardfork data')
    st.equal(c.bootstrapNodes()[0].port, 17717, 'should return a bootstrap node array')

    st.end()
  })

  t.test('Should be able to access data for all chains provided', function (st) {
    let c = new Common('mainnet')
    st.equal(c.genesis().hash, '0x0376899c001618fc7d5ab4f31cfd7f57ca3a896ccc1581a57d8f129ecf40b840', 'mainnet')

    st.end()
  })

  t.test('Should handle custom chain parameters with missing field', function (st) {
    let chainParams = require('./testnet.json')
    delete chainParams['hardforks']
    st.throws(function () { new Common(chainParams) }, /Missing required/, 'should throw an exception on missing parameter') // eslint-disable-line no-new

    st.end()
  })
})
