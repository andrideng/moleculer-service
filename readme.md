# [Moleculer Service](https://moleculer.services/)
Create a simple apps using moleculer.services

## Content
```
1. moleculer init project
2. transporter using nats
3. test script
```

## Init Project
```
mkdir [project-name]
cd [project-name]
npm init --yes
```

## Step-1
Basic moleculer dependencies
```
npm install --save moleculer moleculer-web
npm install --save-dev moleculer-repl
```

## Step-2
Nats Transporter dependencies
```
npm install --save nats
```

## Step-3
Test dependencies
```
npm install --save-dev jest sinon
```

## Development
Dont't forget to clone the project before start development
```
npm install
```
```
Run Gateway
npm run gateway
```
```
Run Broker
npm run broker
```
```
For Test
npm run test
```

## Contributor
```
[ANDRI DENG](https://andrideng-com.firebaseapp.com/)
```