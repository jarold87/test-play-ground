const assert = require('assert');
const sinon = require('sinon');

const express = require('express');
const request = require('supertest');

const getApp = () => {
    const apiController = require('../sut/api');
    const app = express();
    app.use('/api', apiController);
    return app;
};

const app = getApp();

// ----------- MOCHA + SINON TEST ----------- 

it('Test 1', async () => {
    const response = await request(app)
      .get(`/api/play-ground/path1`)
      .expect(200);
  
    assert.equal(response.statusCode, 200);
    assert.equal(response.body.data, 'default SUT data' );
});

// It's not working
// -----------------------------------------
// it('Test 2', async () => {
//     const firstAdapterSample = require('../sut/firstAdapterSample');
//     const adapterMock = sinon.mock(firstAdapterSample);
//     adapterMock.expects('sampleFunction1')
//         .returns("mocked data (test 2)")
//         .once();
//     console.log(adapterMock);

//     const response = await request(app)
//       .get(`/api/play-ground/path1`)
//       .expect(200);
  
//     assert.equal(response.statusCode, 200);
//     assert.equal(response.body.data, 'mocked data (test 2)' );

//     adapterMock.verify();
//     adapterMock.restore();
//     console.log(adapterMock);
// });

it('Test 3', async () => {
    const firstAdapterSample = require('../sut/firstAdapterSample');
    const adapterMock = sinon.mock(firstAdapterSample);
    adapterMock.expects('sampleFunction2')
        .returns("mocked data (test 3)")
        .once();

    const response = await request(app)
      .get(`/api/play-ground/path2`)
      .expect(200);
  
    assert.equal(response.statusCode, 200);
    assert.equal(response.body.data, 'mocked data (test 3)' );

    adapterMock.verify();
    adapterMock.restore();
});

it('Test 4', async () => {
    const response = await request(app)
      .get(`/api/play-ground/path2`)
      .expect(200);
  
    assert.equal(response.statusCode, 200);
    assert.equal(response.body.data, 'default SUT data' );
});