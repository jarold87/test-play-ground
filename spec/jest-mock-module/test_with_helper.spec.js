const express = require('express');
const request = require('supertest');

const getApp = () => {
  const apiController = require('../../sut/api');
  const app = express();
  app.use('/api', apiController);
  return app;
};

const getMocks = () => {
  const MockHelper = require('./helper/mock');
  return {
    adapter: new MockHelper('../../../sut/firstAdapterSample', ['sampleFunction1', 'sampleFunction2']),
  };
};

const mocks = getMocks();
const app = getApp();

afterEach(() => {
  mocks.adapter.restore();
});

test('Test 1', async () => {
  const response = await request(app)
    .get(`/api/play-ground/path1`)
    .expect(200);

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({ success: true, data: 'default SUT data' });
});

test('Test 2', async () => {
  mocks.adapter.setImplementation('sampleFunction1', () => {
    return 'mocked data (test 2)';
  });

  const response = await request(app)
    .get(`/api/play-ground/path1`)
    .expect(200);

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({ success: true, data: 'mocked data (test 2)' });
  expect(mocks.adapter.getMock('sampleFunction1')).toBeCalledTimes(1);
});

test('Test 3', async () => {
  mocks.adapter.setImplementation('sampleFunction2', () => {
    return 'mocked data (test 3)';
  });

  const response = await request(app)
    .get(`/api/play-ground/path2`)
    .expect(200);

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({ success: true, data: 'mocked data (test 3)' });
  expect(mocks.adapter.getMock('sampleFunction2')).toBeCalledTimes(1);
});

test('Test 4', async () => {
  const response = await request(app)
    .get(`/api/play-ground/path1`)
    .expect(200);

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({ success: true, data: 'default SUT data' });
});
