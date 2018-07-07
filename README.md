# labels-verify
It is a library that allows you to check labels that aren't used anymore

## CLI

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

## App - Web application
#### Instructions to run App
* Run
```sh
npm install
```

```sh
npm start
```

* Access - [localhost:8080](http://localhost:8080)

![alt text](https://github.com/fabianofdf/labels-verify/raw/master/public/doc/app.png)
