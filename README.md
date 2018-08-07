
# CryptoBrain Frontend Readme

Quick Start
-----------

```shell
$ git clone https://github.com/btomashvili/bxbet-frontend
$ cd bxbet-frontend
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
|`docker-compose up -d --build`| Run dockerized development server with webpack-dev-server @ detached mode`localhost:9000`|
|`docker-compose up`| Run dockerized development server with webpack-dev-server `localhost:9000`|


## kubernate
kubectl run bxfront --image bxbet-frontend_dev-local:1.0 --port 9000
kubectl expose deployment bxfront --type LoadBalancer --port 80 --target-port 9000
kubectl get service bxfront

