import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { 
  queryGetContractsByName,
  queryGetLatestContractByName,
  queryGetContractsByAddress,
  queryGetContractsByVersion,
  queryGetContractsByNameAndVersion,
  ransactionAddNewContract } from './services/resolver';

export const hello: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  cb(null, response);
}

/*
Inputs:
  - name: contract name
Returns all the contrac's names, addresses and versions
*/
export const getContractByName: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
  let response;
  try {
    const contracts = await queryGetContractsByName(JSON.parse(event.body).name)
    response = {
      statusCode: 200,
      body: contracts
    }
  } catch (error) {
    response = {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
  return response;
}

/*
Inputs:
  - name: contract name
Returns all the contrac's names, addresses and versions
*/
export const getContractByNameLatest: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
  let response;
  try {
    const contracts = await queryGetLatestContractByName(JSON.parse(event.body).name)
    response = {
      statusCode: 200,
      body: contracts
    }
  } catch (error) {
    response = {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
  return response;
}

/*
Inputs:
  - address: contract address
Returns all the contract's information
*/
export const getContractsByAddress: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
  let response;
  try {
    const contracts = await queryGetContractsByAddress(JSON.parse(event.body).address)
    response = {
      statusCode: 200,
      body: contracts
    }
  } catch (error) {
    response = {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
  return response;
}

/*
Inputs:
  - version: contract version
Returns all the contract's information
*/
export const getContractsByVersion: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
  let response;
  try {
    const contracts = await queryGetContractsByVersion(JSON.parse(event.body).version)
    response = {
      statusCode: 200,
      body: contracts
    }
  } catch (error) {
    response = {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
  return response;
}

/*
Inputs:
  - name: contract's name
  - address: contract's address
Returns all the contract's information
*/
export const getContractsByNameAndVersion: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
  let response;
  const msg = JSON.parse(event.body);
  try {
    const contracts = await queryGetContractsByNameAndVersion(msg.name, msg.version)
    response = {
      statusCode: 200,
      body: contracts
    }
  } catch (error) {
    response = {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
  return response;
}


/*
Inputs:
  - contract object:
    name: String
    version: String
    abi: Object
Returns all the contract's information
*/
export const deployContract: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
  let response;
  const msg = JSON.parse(event.body);
  try {
    const contracts = await ransactionAddNewContract(msg.name, msg.version, msg.abi, msg.address)
    response = {
      statusCode: 200,
      body: contracts
    }
  } catch (error) {
    response = {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
  return response;
}