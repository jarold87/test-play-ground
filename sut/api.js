const router = require('express').Router({ mergeParams: true });
const BodyParser = require('body-parser');
const { sampleFunction1 } = require('./firstAdapterSample');
const firstAdapterSample = require('./firstAdapterSample');
const onlySpy = require('./onlySpy');

const controller1 = async (req, res) => {
  const data = sampleFunction1();
  onlySpy.sampleFunctionOnSpy('path1');
  res.send({ success: true, data });
};

const controller2 = async (req, res) => {
  const data = firstAdapterSample.sampleFunction2();
  onlySpy.sampleFunctionOnSpy('path2');
  res.send({ success: true, data });
};

router.use(BodyParser.urlencoded({ extended: true }));
router.get('/play-ground/path1', controller1);
router.get('/play-ground/path2', controller2);

module.exports = router;
