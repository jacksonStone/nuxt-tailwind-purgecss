const request = require('supertest');
const sandn = require('../server/server');
const { Builder } = require('nuxt');
const assert = require('assert');
let server;
let liveServer;


describe('GET API and get page', function() {
  before(async function(){
    let sandnInstance = await sandn('localhost', 4000);
    this.timeout(30000);
    server = sandnInstance.server;
    nuxt = sandnInstance.nuxt;
    const builder = new Builder(nuxt);
    await builder.build();
    // return new Promise((res) => {
    //   liveServer = server.listen(4000, res);
    // })
    
    // runs before all tests in this block
  });
  it('respond with json', function(done) {
    request(server)
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('respond with html', function(done) {
    request(server)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);

    // try {
    //   const { html } = await nuxt.renderRoute('/', {})
    //   assert(html.includes('Adam Wathan'))
    //   // console.log('Trying;')
    //   // const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
    //   // console.log('Page rendered');
    //   // const element = window.document.querySelector('.text-xl');
    //   // assert.notEqual(element, null);
    //   // assert.equal(element.textContent, 'Adam Wathan');
    // }
  });
  after(function(){
    // liveServer.close();
  });
});