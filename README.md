# labels-verify

[![NPM version][npm-image]][npm-url]

> It is a library that allows you to check labels that aren't used anymore

## 1 - CLI

```sh
labels-verify -h
```
![alt text](https://github.com/fabianofdf/labels-verify/raw/master/public/doc/cli-help.png)

```sh
labels-verify --labels-path ./languages/lang-pt-br.json --base-dir-path ./src
```
![alt text](https://github.com/fabianofdf/labels-verify/raw/master/public/doc/cli-sample-1.png)

```sh
labels-verify --labels-path ./languages/lang-pt-br.json --base-dir-path ./src --max-labels 2 --hide-found-labels
```
![alt text](https://github.com/fabianofdf/labels-verify/raw/master/public/doc/cli-sample-2.png)

#### Run as a NPM script
```sh
npm run labels-verify
```
![alt text](https://github.com/fabianofdf/labels-verify/raw/master/public/doc/cli-npm-script.png)

#### Settings file - `.labelsverifyrc`

Root path or set path by `--settings-path ./my_config/.labelsverifyrc`

![alt text](https://github.com/fabianofdf/labels-verify/raw/master/public/doc/cli-settings-file.png)

## 2 - Node Module

![alt text](https://github.com/fabianofdf/labels-verify/raw/master/public/doc/module.png)

## 3 - App - Web application
#### Instructions to run App
* Clone the project at [https://github.com/fabianofdf/labels-verify.git](https://github.com/fabianofdf/labels-verify.git)

* Run
```sh
npm install
```

```sh
npm start
```

* Access - [localhost:8080](http://localhost:8080)

![alt text](https://github.com/fabianofdf/labels-verify/raw/master/public/doc/app.png)
