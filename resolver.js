const { Pool, Client } = require('pg')
const TRLContract = require('./TRL.json')
const semver = require('semver')
var EthereumValidator = require('wallet-address-validator')

// pools will use environment variables
// for connection information
const pool = new Pool()

/*
Read operations
*/

async function queryGetAllContracts () {
  const text = 'select contract_name,version,address from contract_registry;'
  // const values = [name]
  let res = null

  try {
    res = await pool.query(text)
    return res.rows
  } catch (e) {
    console.log(e)
  }
  return res
}

async function queryGetContractsByName (name) {
  const text = 'select * from contract_registry where contract_name=$1;'
  const values = [name]
  let res = null

  try {
    res = await pool.query(text, values)
    return res.rows
  } catch (e) {
    console.log(e)
  }
  return res
}

async function queryGetLatestContractByName (name) {
  const text = "SELECT contract_name, version, address, abi FROM   contract_registry WHERE contract_name=$1 ORDER  BY string_to_array(version, '.')::int[] DESC LIMIT 1;"
  const values = [name]
  let res = null

  try {
    res = await pool.query(text, values)
    return res.rows
  } catch (e) {
    console.log(e)
  }
  return res
}

async function queryGetContractsByVersion (version) {
  const text = 'select * from contract_registry where version=$1;'
  const values = [version]
  let res = null

  try {
    res = await pool.query(text, values)
    return res.rows
  } catch (e) {
    console.log(e)
  }
  return res
}

async function queryGetContractsByAddress (address) {
  const text = 'select * from contract_registry where address=$1;'
  const values = [address]
  let res = null

  try {
    res = await pool.query(text, values)
    return res.rows
  } catch (e) {
    console.log(e)
  }
  return res
}

async function queryGetContractsByNameAndVersion (name, version) {
  const text = 'select * from contract_registry where contract_name=$1 and version=$2;'
  const values = [name, version]
  let res = null

  try {
    res = await pool.query(text, values)
    return res.rows
  } catch (e) {
    console.log(e)
  }
  return res
}

/*
Write Operations
*/

function checkParams (params) {
  const c1 = params[0].length < 128
  const c2 = semver.valid(params[1]) // checks version

  const abiRequiredKeys = ['contractName', 'abi', 'bytecode']
  const abiKeys = Object.keys(JSON.parse(params[2]))
  let c3 = true
  for (let key of abiRequiredKeys) {
    c3 = c3 && abiKeys.indexOf(key) > -1
  }

  const c4 = EthereumValidator.validate(params[3], 'ethereum')

  return c1 && c2 && c3 && c4
}

async function transactionAddNewContract (name = 'no_name', version, abi, address = '0x0000000000000000000000000000000000000000') {
  // const abi = JSON.stringify(TRLContract)
  const text = 'INSERT INTO contract_registry(contract_name, version, abi, address) VALUES ($1,$2,$3,$4);'
  const params = [name, version, JSON.stringify(abi), address]

  if (!checkParams(params)) {
    return Promise.reject('Failed parameter verification')
  }

  const client = await pool.connect()

  try {
    await client.query('BEGIN')
    await client.query(text, params)
    await client.query('COMMIT')
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
    return name + '-' + version + '-' + address
  }
}

async function transactionDeleteTestFiles () {
  const text = "DELETE FROM contract_registry WHERE contract_name LIKE'test-name-%';"

  const client = await pool.connect()

  try {
    await client.query('BEGIN')
    await client.query(text)
    await client.query('COMMIT')
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
    return 'success'
  }
}

module.exports.transactionDeleteTestFiles = transactionDeleteTestFiles
module.exports.queryGetAllContracts = queryGetAllContracts
module.exports.queryGetContractsByName = queryGetContractsByName
module.exports.queryGetContractsByNameAndVersion = queryGetContractsByNameAndVersion
module.exports.transactionAddNewContract = transactionAddNewContract
module.exports.queryGetContractsByAddress = queryGetContractsByAddress
module.exports.queryGetContractsByVersion = queryGetContractsByVersion
module.exports.queryGetLatestContractByName = queryGetLatestContractByName
