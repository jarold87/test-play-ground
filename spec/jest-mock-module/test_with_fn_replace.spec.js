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
    const functionMock = jest.spyOn(firstAdapterSample, 'sampleFunction2');
    functionMock.mockImplementation(() => {
      return 'mocked data (test 1)';
    });
  
    const response1 = await request(app)
      .get(`/api/play-ground/path2`)
      .expect(200);
  
    expect(response1.statusCode).toBe(200);
    expect(response1.body).toEqual({ success: true, data: 'mocked data (test 1)' });
  
    jest.restoreAllMocks();

    const response2 = await request(app)
    .get(`/api/play-ground/path2`)
    .expect(200);

    expect(response2.statusCode).toBe(200);
    expect(response2.body).toEqual({ success: true, data: 'default SUT data' });
});

// It's not working
// -----------------------------------------
// test('Test 2', async () => {
//     const functionMock = jest.fn(() => {
//         return 'mocked data (test 2)';
//     });
//     firstAdapterSample.sampleFunction2 = functionMock;
  
//     const response1 = await request(app)
//       .get(`/api/play-ground/path2`)
//       .expect(200);
  
//     expect(response1.statusCode).toBe(200);
//     expect(response1.body).toEqual({ success: true, data: 'mocked data (test 2)' });
  
//     jest.clearAllMocks();
//     jest.resetAllMocks();
//     jest.restoreAllMocks();
//     jest.resetModules();

//     const response2 = await request(app)
//     .get(`/api/play-ground/path2`)
//     .expect(200);

//     expect(response2.statusCode).toBe(200);
//     expect(response2.body).toEqual({ success: true, data: 'default SUT data' });
// });