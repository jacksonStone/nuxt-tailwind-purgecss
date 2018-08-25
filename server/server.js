
const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const apiRoutes = require('./api');

app.use('/api', apiRoutes);
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production');
const nuxt = new Nuxt(config);

async function runServerAndNuxt(host, port) {
  app.set('port', port)
  if (!(process.env.NODE_ENV) || (process.env.NODE_ENV === 'development')) {
    (async function start() {
      const builder = new Builder(nuxt);
      await builder.build();
      app.use(nuxt.render);
      console.log('(DEV MODE) Server listening on http://' + host + ':' + port); // eslint-disable-line no-console
    }());
  }
  else {
    console.log('Using Nuxt render');
    app.use(nuxt.render);
    console.log('(PROD MODE) Server listening on http://' + host + ':' + port); // eslint-disable-line no-console
  }
  return {
    server: app,
    nuxt
  };
}

module.exports = runServerAndNuxt;