# Contract Manager API

This module is responsible for keeping track of the versions, addresses and ABI's of Frontier's deployed smart-contracts.
It is a web service, connected to a PostgreSQL database.

## Testing

**Setting up the environment**
The server connects to the database by reading several environment variables. Therefore, these need to be setup prior to running the server:

```sh
> export PGUSER= <check_password_manager>
> export PGPASSWORD= <check_password_manager>
> export PGHOST= <check_password_manager>
> export PGDATABASE= <check_password_manager>
> export PGPORT= <check_password_manager>
```

**Starting the server**

```sh
> npm install
> npm run start &

... Listening at http://:::9092
```

On another shell, same directory

```sh
npm run test
```
The tests are writting and reading the database directly, so it takes some time. At the end of the test, all the entries created are deleted.

## Usage

To use the webservice, make GET (or POST, for writes) HTTP requests to the following routes:

### /contract-manager/contracts/all

No inputs

Returns all the contrac's names, addresses and versions



### /contract-manager/clean-test-results

No inputs

Returns all the contrac's names, addresses and versions



### /contract-manager/contracts/name

Inputs:
  - name: contract name

Returns all the contrac's names, addresses and versions



### /contract-manager/contract/name/latest

Inputs:
  - name: contract name

Returns all the contrac's names, addresses and versions



### /contract-manager/contracts/address

Inputs:
  - address: contract address

Returns all the contract's information



### /contract-manager/contracts/version

Inputs:
  - version: contract version

Returns all the contract's information




### /contract-manager/contracts/name/version

Inputs:
  - name: contract's name
  - address: contract's address

Returns all the contract's information

### /contract-manager/deploy
Inputs:
  - contract object:
    name: String
    version: String
    abi: Object

Returns all the contract's information
