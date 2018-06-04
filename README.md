
# CryptoBrain Frontend Readme

Quick Start
-----------

```shell
$ git clone https://github.com/btomashvili/BookingGenius-Front
$ cd BookingGenius-Front
$ npm install
$ npm start:local
```

Commands
--------

|Script|Description|
|---|---|
|`npm run format`| Format code with prettier-eslint |
|`npm run start:local`| Run development server with webpack-dev-server @ `localhost:9000`|
|`npm run dev`| Run development server with webpack-dev-server @ `localhost:3000`|
|`npm run build`| Test, and build the application to `./dist`|
|`npm start`| Start production ready app with pm2 from `./dist` @ `localhost:8080`|
|`npm run lint`| Run ESLint on `./src`|
|`docker-compose up -d --build`| Run dockerized development server with webpack-dev-server @ `localhost:9000`|
