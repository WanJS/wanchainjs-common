const tape = require('tape')
const Common = require('../index.js')

tape('[Common]: Hardfork logic', function (t) {
  t.test('Hardfork access', function (st) {
    let supportedHardforks = [
      'byzantium'
    ]
    let c

    for (let hardfork of supportedHardforks) {
      c = new Common('mainnet', hardfork)
      st.equal(c.hardfork(), hardfork, hardfork)
    }

    st.end()
  })

  t.test('hardforkBlock()', function (st) {
    let c = new Common('mainnet')
    st.equal(c.hardforkBlock('byzantium'), 0, 'should return the correct HF change block for byzantium (provided)')

    c = new Common('mainnet', 'byzantium')
    st.equal(c.hardforkBlock(), 0, 'should return the correct HF change block for byzantium (set)')

    st.end()
  })

  t.test('isHardforkBlock()', function (st) {
    let c = new Common('mainnet')
    st.equal(c.isHardforkBlock(0, 'byzantium'), true, 'should return true for HF change block for byzantium (provided)')

    c = new Common('mainnet', 'byzantium')
    st.equal(c.isHardforkBlock(0), true, 'should return true for HF change block for byzantium (set)')
    st.equal(c.isHardforkBlock(1), false, 'should return false for another block for byzantium (set)')

    st.end()
  })

  t.test('activeHardforks()', function (st) {
    let c = new Common('mainnet')
    st.equal(c.activeHardforks().length, 1, 'should return 5 active hardforks for Ropsten')
    st.equal(c.activeHardforks()[0]['name'], 'byzantium', 'should return the correct HF data for Ropsten')
    st.equal(c.activeHardforks(9).length, 1, 'should return 3 active hardforks for Ropsten up to block 9')

    c = new Common('mainnet', null, ['spuriousDragon', 'byzantium', 'constantinople'])
    st.equal(c.activeHardforks(null, { onlySupported: true }).length, 1, 'should return 2 active HFs when restricted to supported HFs')

    st.end()
  })

  t.test('activeHardfork()', function (st) {
    let c = new Common('mainnet')
    st.equal(c.activeHardfork(), 'byzantium', 'should return byzantium as latest active HF for Ropsten')

    st.end()
  })

  t.test('hardforkIsActiveOnBlock() / activeOnBlock()', function (st) {
    let c = new Common('mainnet')
    st.equal(c.hardforkIsActiveOnBlock('byzantium', 1), true, 'mainnet, byzantium (provided), 1 -> true')
    st.equal(c.hardforkIsActiveOnBlock('byzantium', 5), true, 'mainnet, byzantium (provided), 5 -> true')
    st.equal(c.hardforkIsActiveOnBlock('byzantium', 0), true, 'mainnet, byzantium (provided), 0 -> true ')

    c = new Common('mainnet', 'byzantium')
    st.equal(c.hardforkIsActiveOnBlock(null, 0), true, 'Ropsten, byzantium (set), 1700000 -> true')
    st.equal(c.activeOnBlock(0), true, 'Ropsten, byzantium (set), 1700000 -> true (alias function)')
    st.equal(c.hardforkIsActiveOnBlock(null, 5), true, 'Ropsten, byzantium (set), 1700005 -> true')

    st.end()
  })

  t.test('consensus()/finality()', function (st) {
    let c = new Common('mainnet')
    st.equal(c.consensus('byzantium'), 'pow', 'should return pow for byzantium consensus')
    st.equal(c.finality('byzantium'), null, 'should return null for byzantium finality')

    st.end()
  })
})
