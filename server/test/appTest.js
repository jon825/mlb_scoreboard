const assert = require('chai').assert;
const listOfTeams = require('../server.js');

describe('Server', ()=>{
  it('server should return string', ()=>{
    assert.typeOf(listOfTeams(), 'object');
  });
});
