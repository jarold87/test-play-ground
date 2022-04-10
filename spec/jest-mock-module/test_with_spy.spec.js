const express = require('express');
const request = require('supertest');
const firstAdapterSample = require('../../sut/firstAdapterSample');

const getApp = () => {
  const apiController = require('../../sut/api');
  const app = express();
  app.use('/api', apiController);
  return app;
};

const app = getApp();

test('Test 1', async () => {
  const response = await request(app)
    .get(`/api/play-ground/path1`)
    .expect(200);

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({ success: true, data: 'default SUT data' });
});

// It's not working
// -----------------------------------------
// test('Test 2', async () => {
//   const functionMock = jest.spyOn(firstAdapterSample, 'sampleFunction1');
//   functionMock.mockImplementation(() => {
//     return 'mocked data (test 2)';
//   });

//   const response = await request(app)
//     .get(`/api/play-ground/path1`)
//     .expect(200);

//   expect(response.statusCode).toBe(200);
//   expect(response.body).toEqual({ success: true, data: 'mocked data (test 2)' });

//   functionMock.mockRestore();
// });

test('Test 3', async () => {
  const functionMock = jest.spyOn(firstAdapterSample, 'sampleFunction2');
  functionMock.mockImplementation(() => {
    return 'mocked data (test 3)';
  });

  const response = await request(app)
    .get(`/api/play-ground/path2`)
    .expect(200);

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({ success: true, data: 'mocked data (test 3)' });

  functionMock.mockRestore();
});

test('Test 4', async () => {
  const response = await request(app)
    .get(`/api/play-ground/path1`)
    .expect(200);

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({ success: true, data: 'default SUT data' });
});
