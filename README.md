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

The API exposed by this webservice is documented using [apidocjs](http://apidocjs.com/) and available in the `/docs` directory. It is currently not hosted on a public website for privacy reasons. So, in order to check the documents you'll need to locally host the webpage.

This can be done with 2 commands:

```sh
> npm install -g http-server
> http-server docs
```
Then, head over to http://localhost:8080 🎉

