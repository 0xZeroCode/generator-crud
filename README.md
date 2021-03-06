# generator-crud [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
> generates crud modules of mean stack or elasticsearch instead of mongodb

## Installation

First, install [Yeoman](http://yeoman.io) and generator-crud using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-crud
```

Then generate your new project:

```bash
yo crud
```

then generate mean stack module:
```bash
yo crud:module module-name
```

if you want elasticsearch instead of mongodb:
```bash
yo crud:module module-name --elastic
```

e.g.
```bash
yo crud:module user
yo crud:module person --elastic
```

```bash
yo crud:module module-name
```
actually runs two commands:
```bash
yo crud:back_module module-name
yo crud:front_module module-name
```

if you want to generate only backend module:

```bash
yo crud:back_module module-name
```

e.g.
```bash
yo crud:back_module organization
```
it will create organizations.js route file in routes directory, organizationsManager.js in application directory and organization.js mongoose model file in models directory. and will register router in app.js .

you can generate elasticsearch based module:
```bash
yo crud:back_module organization --elastic
```

if you want to generate only front module:
```bash
yo crud:front_module module-name
```
creates angular application with controller and factory, adds dependency to main application, adds script to index.html, creates view.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Irakli Jishkariani]()


[npm-image]: https://badge.fury.io/js/generator-crud.svg
[npm-url]: https://npmjs.org/package/generator-crud
[travis-image]: https://travis-ci.org/0xZeroCode/generator-crud.svg?branch=master
[travis-url]: https://travis-ci.org/0xZeroCode/generator-crud
[daviddm-image]: https://david-dm.org/0xZeroCode/generator-crud.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/0xZeroCode/generator-crud
