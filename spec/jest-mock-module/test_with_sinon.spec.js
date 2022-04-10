const express = require('express');
const request = require('supertest');
const sinon = require('sinon');

const getApp = () => {
  const apiController = require('../../sut/api');
  const app = express();
  app.use('/api', apiController);
  return app;
};

afterEach(() => {
  jest.resetModules();
});

test('Test 1', async () => {
  const response = await request(getApp())
    .get(`/api/play-ground/path1`)
    .expect(200);

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({ success: true, data: 'default SUT data' });
});

// It's not working without jest.resetModules() and getApp()
test('Test 2', async () => {
    const firstAdapterSample = require('../../sut/firstAdapterSample');
    const adapterMock = sinon.mock(firstAdapterSample);
    adapterMock.expects('sampleFunction1')
        .returns("mocked data (test 2)")
        .once();
    
    const onlySpy = require('../../sut/onlySpy');
    const mySpy = sinon.spy(onlySpy, 'sampleFunctionOnSpy');

    const response = await request(getApp())
        .get(`/api/play-ground/path1`)
        .expect(200);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ success: true, data: 'mocked data (test 2)' });
    
    expect(mySpy.calledOnceWith('path1')).toBe(true);

    adapterMock.verify();
});

test('Test 3', async () => {
    const firstAdapterSample = require('../../sut/firstAdapterSample');
    const adapterMock = sinon.mock(firstAdapterSample);
    adapterMock.expects('sampleFunction2')
        .returns("mocked data (test 3)")
        .once();

    const onlySpy = require('../../sut/onlySpy');
    const mySpy = sinon.spy(onlySpy, 'sampleFunctionOnSpy');

    const response = await request(getApp())
        .get(`/api/play-ground/path2`)
        .expect(200);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ success: true, data: 'mocked data (test 3)' });

    expect(mySpy.calledOnceWith('path2')).toBe(true);

    adapterMock.verify();
});

test('Test 4', async () => {
    const response = await request(getApp())
      .get(`/api/play-ground/path1`)
      .expect(200);
  
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ success: true, data: 'default SUT data' });
});

