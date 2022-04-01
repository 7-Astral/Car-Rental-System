const express = require('express');
const { check }=require('express-validator');

const rateController = require('../controller/rate-controllers');

const router = express.Router();
router.get('/rw/:rid', rateController.getreviewByCarId);
router.get('/:rid', rateController.getAvgrateByCarId);
router.post(
    '/createRate',
    [
      check('rate')
        .not()
        .isEmpty(),
    ],
    rateController.createRate
  );
module.exports = router; 


 