# Aurora Server

A NestJS based server application to handle game logic and database.

## Installation

```bash
$ npm install
```

### Environment variables

Copy `.env.template` to `.env` and change the values as required. For local development the values would work but for production you would at least want to have these values set to `NODE_ENV=production` and use a strong value for `JWT_SECRET`.

| Key | Description |
| --- | ----------- |
| NODE_ENV | Will ensure anything that is used for development doesn't make it to production |
| JWT_SECRET | A strong key used for generating authentication tokens |
| JWT_TTL_MILLISECONDS | How long an authentication session token will last |

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
