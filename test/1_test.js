var assert = require('assert')
var request = require('request')
let testAddress = '0x9BCf28E6c1E19F11DCa9f2A45fBdC4327A94e522'
let testPeriod = 4

const HOST = 'http://127.0.0.1:9092'
const TEST_NAME_PREFIX = 'test-name-'

let name_1
let abi_1
let version_1
let address_1
let name_2
let abi_2
let version_2
let address_2
let name_3
let abi_3
let version_3
let address_3

before('Populating database with example contracts', async function () {
  this.timeout(10000)
  name_1 = TEST_NAME_PREFIX + '1'
  abi_1 = {contractName: TEST_NAME_PREFIX + '1', abi: 'test-abi-1', bytecode: '0x123434'}
  version_1 = '0.0.1'
  address_1 = '0x0000000000000000000000000000000000000001'

  name_2 = TEST_NAME_PREFIX + '2'
  abi_2 = {contractName: TEST_NAME_PREFIX + '2', abi: 'test-abi-2', bytecode: '0x23453'}
  version_2 = '0.1.1'
  address_2 = '0x0000000000000000000000000000000000000002'

  name_3 = TEST_NAME_PREFIX + '3'
  abi_3 = {contractName: TEST_NAME_PREFIX + '3', abi: 'test-abi-3', bytecode: '0x554354'}
  version_3 = '1.1.1'
  address_3 = '0x0000000000000000000000000000000000000003'

  name_4 = TEST_NAME_PREFIX + '4'
  abi_4 = {contractName: TEST_NAME_PREFIX + '4', abi: 'test-abi-4', bytecode: '0x554354'}
  version_4 = '1.2.1'
  address_4 = '0x0000000000000000000000000000000000000004'

  console.log("Give me sometime, I'm writting to a database on the other side of the world!")
  await clearTestFiles()
  await timeout(2000)
  await addNewItem(name_1, abi_1, version_1, address_1)
  await addNewItem(name_2, abi_2, version_2, address_2)
  await addNewItem(name_3, abi_3, version_3, address_3)
  await addNewItem(name_3, abi_4, version_4, address_4)
  await timeout(5000)
})

after(async function () {
  this.timeout(10000)
  console.log('------ Cleaning up... ------')
  await timeout(2000)
  await clearTestFiles()
  await timeout(2000)
  console.log('------ Bye! ------')
})

describe('Getting contract by name', async function () {
  this.timeout(10000)
  it('Should correct contract data', async function () {
    let contract = await getContractsByName(name_1)
    assert.equal(contract.length, 1)
    contract = contract[0]
    assert.equal(contract.contract_name, name_1)
    assert.equal(contract.version, version_1)
    assert.equal(Object.keys(contract.abi).length, Object.keys(abi_1).length)
  })
})

describe('Getting contract by name and latest version', async function () {
  this.timeout(10000)
  it('Should return the latest version', async function () {
    let contract = await getContractByNameLatestVersion(name_3)
    assert.equal(contract.length, 1)
    contract = contract[0]
    assert.equal(contract.contract_name, name_3)
    assert.equal(contract.version, version_4)
    assert.equal(Object.keys(contract.abi).length, Object.keys(abi_4).length)
  })
})

async function getContractByNameLatestVersion (_name) {
  return new Promise((resolve, reject) => {
    var options = { method: 'GET',
      url: 'http://127.0.0.1:9092/contract-manager/contract/name/latest',
      qs: { name: _name },
      headers:
      { 'cache-control': 'no-cache',
        'content-type': 'application/json' },
      body: {},
      json: true }

    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      resolve(body)
    })
  })
}

async function getContractsByName (_name) {
  return new Promise((resolve, reject) => {
    var options = { method: 'GET',
      url: 'http://127.0.0.1:9092/contract-manager/contracts/name',
      qs: { name: _name },
      headers:
      { 'cache-control': 'no-cache',
        'content-type': 'application/json' },
      body: {},
      json: true }

    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      // console.log(body)
      resolve(body)
    })
  })
}

async function addNewItem (_name, _abi, _version, _address) {
  var options = { method: 'POST',
    url: HOST + '/contract-manager/deploy',
    headers:
    { 'cache-control': 'no-cache',
      'content-type': 'application/json' },
    body:
    { address: _address,
      version: _version,
      name: _name,
      abi: _abi
    },
    json: true }

  request(options, function (error, response, body) {
    if (error) throw new Error(error)
  })
}

async function clearTestFiles () {
  var options = { method: 'GET',
    url: 'http://127.0.0.1:9092/contract-manager/clean-test-results',
    headers:
    { 'postman-token': 'd38696f1-fbbf-8f98-8892-c23d49c89960',
      'cache-control': 'no-cache',
      'content-type': 'application/json' },
    body:
    { address: '0x0000000000000000000000000000000000000000',
      version: '1.1.3',
      name: 'test-contract-2',
      abi:
      { contractName: 'test-name',
        abi: 'test-abi',
        bytecode: '0x123434' } },
    json: true }

  request(options, function (error, response, body) {
    if (error) throw new Error(error)

    return 'test files deleted'
  })
}

function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
