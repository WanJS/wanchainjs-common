const tape = require('tape')
const Common = require('../index.js')

tape('[Common]: Parameter access', function (t) {
  t.test('Basic usage', function (st) {
    let c = new Common('mainnet')
    st.equal(c.param('gasPrices', 'ecAdd', 'byzantium'), 500, 'Should return correct value when HF directly provided')

    c.setHardfork('byzantium')
    st.equal(c.param('gasPrices', 'ecAdd'), 500, 'Should return correct value for HF set in class')

    st.end()
  })

  t.test('Error cases', function (st) {
    let c = new Common('mainnet')
    st.throws(function () { c.param('gasPrices', 'ecAdd') }, /neither a hardfork set nor provided by param$/, 'Should throw when no hardfork set or provided')
    st.throws(function () { c.param('gasPrizes', 'ecAdd', 'byzantium') }, /Topic gasPrizes not defined$/, 'Should throw when called with non-existing topic')
    st.throws(function () { c.param('gasPrices', 'notexistingvalue', 'byzantium') }, /value for notexistingvalue not found$/, 'Should throw when called with non-existing value')

    c.setHardfork('byzantium')
    st.equal(c.param('gasPrices', 'ecAdd'), 500, 'Should return correct value for HF set in class')

    st.end()
  })

  t.test('Parameter updates', function (st) {
    let c = new Common('mainnet')
    st.equal(c.param('pow', 'minerReward', 'byzantium'), '0', 'Should reflect HF update changes')

    st.end()
  })

  t.test('Access by block number, paramByBlock()', function (st) {
    let c = new Common('mainnet', 'byzantium')

    st.equal(c.paramByBlock('pow', 'minerReward', 0), '0', 'Should correctly translate block numbers into HF states (updated value)')
    st.equal(c.paramByBlock('pow', 'minerReward', 5), '0', 'Should correctly translate block numbers into HF states (original value)')

    st.end()
  })
})
