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

/*
No inputs
Returns all the contrac's names, addresses and versions
that are being listened to
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
app.get('/contract-manager/contracts/listening', function (req, res) {
  resolver.queryGetAllContractsListened().then(contracts => {
    console.log(contracts)
    res.end(JSON.stringify(contracts))
  })
})

/*
No inputs
Returns all the contrac's names, addresses and versions
*/
app.get('/contract-manager/clean-test-results', function (req, res) {
  resolver.transactionDeleteTestFiles().then(contracts => {
    console.log(contracts)
    res.end(JSON.stringify(contracts))
  })
})

/*
Inputs:
  - name: contract name
Returns all the contrac's names, addresses and versions
*/
app.get('/contract-manager/contracts/name', function (req, res) {
  const name = req.query.name
  resolver.queryGetContractsByName(name).then(contracts => {
    console.log(contracts)
    res.end(JSON.stringify(contracts))
  })
})

/*
Inputs:
  - name: contract name
Returns all the contrac's names, addresses and versions
*/
app.get('/contract-manager/contracts/tag', function (req, res) {
  const tag = req.query.tag
  resolver.queryGetContractsByTag(tag).then(contracts => {
    console.log(contracts)
    res.end(JSON.stringify(contracts))
  })
})

/*
Inputs:
  - name: contract name
Returns all the contrac's names, addresses and versions
*/
app.get('/contract-manager/contract/name/latest', function (req, res) {
  const name = req.query.name
  resolver.queryGetLatestContractByName(name).then(contracts => {
    console.log(contracts)
    res.end(JSON.stringify(contracts))
  })
})

/*
Inputs:
  - address: contract address
Returns all the contract's information
*/
app.get('/contract-manager/contracts/address', function (req, res) {
  const address = req.query.address
  resolver.queryGetContractsByAddress(address).then(contracts => {
    console.log(contracts)
    res.end(JSON.stringify(contracts))
  })
})

/*
Inputs:
  - version: contract version
Returns all the contract's information
*/
app.get('/contract-manager/contracts/version', function (req, res) {
  const version = req.query.version
  resolver.queryGetContractsByVersion(version).then(contracts => {
    console.log(contracts)
    res.end(JSON.stringify(contracts))
  })
})

/*
Inputs:
  - name: contract's name
  - address: contract's address
Returns all the contract's information
*/
app.get('/contract-manager/contracts/name/version', function (req, res) {
  const name = req.query.name
  const version = req.query.version
  resolver.queryGetContractsByNameAndVersion(name, version).then(contracts => {
    console.log(contracts)
    res.end(JSON.stringify(contracts))
  })
})

/*
Inputs:
  - contract object:
    name: String
    version: String
    abi: Object
Returns all the contract's information
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
