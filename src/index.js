var express = require('express')
var app = express()
const resolver = require('./resolver.js')
const bodyParser = require('body-parser')
// const config = require('./config.js')

const APP_PORT = 9092

app.use(bodyParser.json({limit: '10mb', extended: true}))

var server = app.listen(APP_PORT, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Listening at http://%s:%s', host, port)
})

/**
 * @api {get} /contract-manager/contracts/all Get all contracts
 * @apiName GetAllContracts
 * @apiGroup Contracts
 * @apiSuccess {Object[]} Contracts   List of contracts
 * @apiSuccess {String} Contracts.contract_name   Contract name
 * @apiSuccess {String} Contracts.version   Contract version
 * @apiSuccess {String} Contracts.address   Contract address
 */
app.get('/contract-manager/contracts/all', function (req, res) {
  resolver.queryGetAllContracts().then(contracts => {
    console.log(contracts)
    res.end(JSON.stringify(contracts))
  })
})

/*
No inputs
Returns all the contrac's names, addresses and versions
*/

/**
 * @apiName GetListenedContracts
 * @api {get} /contract-manager/contracts/listening Get all contracts being listened to
 * @apiGroup Contracts
 * @apiSuccess {Object[]} Contracts   List of contracts
 * @apiSuccess {String} Contracts.contract_name   Contract name
 * @apiSuccess {String} Contracts.version   Contract version
 * @apiSuccess {String} Contracts.address   Contract address
 * @apiSuccess {JSON} Contracts.abi   Contract's truffle build artifact
 * @apiSuccess {JSON} Contracts.tag   Contract release tag
 */
app.get('/contract-manager/contracts/listening', function (req, res) {
  resolver.queryGetAllContractsListened().then(contracts => {
    console.log(contracts)
    res.end(JSON.stringify(contracts))
  })
})

/**
 * @apiName CleanTestResults
 * @api {get} /contract-manager/clean-test-results Clean test generated contracts
 * @apiGroup Management
 * @apiSuccess {Object[]} Contracts   List of deleted contracts
 */
app.get('/contract-manager/clean-test-results', function (req, res) {
  resolver.transactionDeleteTestFiles().then(contracts => {
    console.log(contracts)
    res.end(JSON.stringify(contracts))
  })
})

/**
 * @apiName GetContractsByName
 * @api {get} /contract-manager/contracts/name/:name Get contracts by name
 * @apiGroup Contracts
 * @apiParam {String} name Contract's name
 * @apiSuccess {Object[]} Contracts   List of contracts
 * @apiSuccess {String} Contracts.contract_name   Contract name
 * @apiSuccess {String} Contracts.version   Contract version
 * @apiSuccess {String} Contracts.address   Contract address
 * @apiSuccess {JSON} Contracts.abi   Contract's truffle build artifact
 * @apiSuccess {JSON} Contracts.tag   Contract release tag
 */
app.get('/contract-manager/contracts/name', function (req, res) {
  const name = req.query.name
  resolver.queryGetContractsByName(name).then(contracts => {
    console.log(contracts)
    res.end(JSON.stringify(contracts))
  })
})

/**
 * @apiName GetContractsByTag
 * @api {get} /contract-manager/contracts/tag/:tag Get contracts by tag
 * @apiGroup Contracts
 * @apiParam {String} tag Contract's tag
 * @apiSuccess {Object[]} Contracts   List of contracts
 * @apiSuccess {String} Contracts.contract_name   Contract name
 * @apiSuccess {String} Contracts.version   Contract version
 * @apiSuccess {String} Contracts.address   Contract address
 * @apiSuccess {JSON} Contracts.abi   Contract's truffle build artifact
 * @apiSuccess {JSON} Contracts.tag   Contract release tag
 */
app.get('/contract-manager/contracts/tag', function (req, res) {
  const tag = req.query.tag
  resolver.queryGetContractsByTag(tag).then(contracts => {
    console.log(contracts)
    res.end(JSON.stringify(contracts))
  })
})

/**
 * @apiName GetLatestContractByName
 * @api {get} /contract-manager/contracts/name/latest/:name Get latest contract by name
 * @apiGroup Contracts
 * @apiParam {String} name Contract's name
 * @apiSuccess {Object} Contract   Latest (highest semantic-version number) contract with that name
 * @apiSuccess {String} Contracts.contract_name   Contract name
 * @apiSuccess {String} Contracts.version   Contract version
 * @apiSuccess {String} Contracts.address   Contract address
 * @apiSuccess {JSON} Contracts.abi   Contract's truffle build artifact
 * @apiSuccess {JSON} Contracts.tag   Contract release tag
 */
app.get('/contract-manager/contract/name/latest', function (req, res) {
  const name = req.query.name
  resolver.queryGetLatestContractByName(name).then(contracts => {
    console.log(contracts)
    res.end(JSON.stringify(contracts))
  })
})

/**
 * @apiName GetContractByAddress
 * @api {get} /contract-manager/contracts/address:address Get contract by address
 * @apiGroup Contracts
 * @apiParam {String} address Contract's ethereum address
 * @apiSuccess {Object} Contract   Latest (highest semantic-version number) contract with that name
 * @apiSuccess {String} Contracts.contract_name   Contract name
 * @apiSuccess {String} Contracts.version   Contract version
 * @apiSuccess {String} Contracts.address   Contract address
 * @apiSuccess {JSON} Contracts.abi   Contract's truffle build artifact
 * @apiSuccess {JSON} Contracts.tag   Contract release tag
 */
app.get('/contract-manager/contracts/address', function (req, res) {
  const address = req.query.address
  resolver.queryGetContractsByAddress(address).then(contracts => {
    console.log(contracts)
    res.end(JSON.stringify(contracts))
  })
})

/**
 * @apiName GetContractsByVersion
 * @api {get} /contract-manager/contracts/version/:version Get contracts by version
 * @apiGroup Contracts
 * @apiParam {String} version Contracts' version
 * @apiSuccess {Object[]} Contracts   List of contracts
 * @apiSuccess {String} Contracts.contract_name   Contract name
 * @apiSuccess {String} Contracts.version   Contract version
 * @apiSuccess {String} Contracts.address   Contract address
 * @apiSuccess {JSON} Contracts.abi   Contract's truffle build artifact
 * @apiSuccess {JSON} Contracts.tag   Contract release tag
 */
app.get('/contract-manager/contracts/version', function (req, res) {
  const version = req.query.version
  resolver.queryGetContractsByVersion(version).then(contracts => {
    console.log(contracts)
    res.end(JSON.stringify(contracts))
  })
})

/**
 * @apiName GetContractsByNameAndVersion
 * @api {get} /contract-manager/contracts/name/version/:name&:version Get contracts by name and version
 * @apiGroup Contracts
 * @apiParam {String} name Contracts' name
 * @apiParam {String} version Contracts' version
 * @apiSuccess {Object[]} Contracts   List of contracts
 * @apiSuccess {String} Contracts.contract_name   Contract name
 * @apiSuccess {String} Contracts.version   Contract version
 * @apiSuccess {String} Contracts.address   Contract address
 * @apiSuccess {JSON} Contracts.abi   Contract's truffle build artifact
 * @apiSuccess {JSON} Contracts.tag   Contract release tag
 */
app.get('/contract-manager/contracts/name/version', function (req, res) {
  const name = req.query.name
  const version = req.query.version
  resolver.queryGetContractsByNameAndVersion(name, version).then(contracts => {
    console.log(contracts)
    res.end(JSON.stringify(contracts))
  })
})

/**
 * @apiName DeployContract
 * @api {post} /contract-manager/deploy Deploy a new contract
 * @apiGroup Contracts
 * @apiParam {String} name Contracts' name
 * @apiParam {String} version Contracts' version
 * @apiParam {String} address Contracts' address
 * @apiParam {String} tag Contracts' tag
 * @apiParam {JSON} ABI Contracts' ABI
 * @apiSuccess {String} summary name + '-' + version + '-' + address
 */
app.post('/contract-manager/deploy', async function (req, res) {
   // name version, abi, address
  const name = req.body.name
  const version = req.body.version
  // const abi = JSON.parse(req.body.abi)
  const abi = req.body.abi
  const address = req.body.address
  const tag = req.body.tag

  let result = false

  try {
    result = await resolver.transactionAddNewContract(name, version, abi, address, tag)
    res.end(JSON.stringify(result))
  } catch (e) {
    console.log(e)
    res.status(400).end()
    // res.end(JSON.stringify({error: 'There was an error'}))
  }
})
