# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/Volasau/nodejs2024Q1-service
```

## Installing NPM modules

```
npm install
```

## Running application

Make sure you have Docker installed and running.

#### start application:

build a project

```
docker compose build
```

start a project

```
docker compose up -d
```

#### stop the project

```
docker compose down
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

#### scan for vulnerabilities

```
npm run docker:scan
```

## Testing

After application running open new terminal and enter:

#### To run all tests without authorization

```

npm run test

```

## Migration

#### to create a migration file, open the docker terminal

```

npm run docker:terminat

```

#### create a migration file

```

npm run tmigration:generate

```

#### log out of the docker terminal

```

ctrl+d

```

#### stop the project

```

docker compose down

```

### Auto-fix and format

```

npm run lint

```

```

npm run format

```

```

```
