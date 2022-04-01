const express = require('express');
const { check }=require('express-validator');

const carController = require('../controller/car-controllers');
const parser=require('../middleware/fileupload');
const router = express.Router();
router.get('/getcar',carController.getCar);
router.get('/rp/:cid', carController.getCarById);
router.get('/:cid', carController.getCarByNId);
router.post(
    '/create',parser.single('image'),
    [
      check('carName')
        .not()
        .isEmpty(),
      check('carType') 
      .not()
      .isEmpty(),
      check('carSpecs')
        .not()
        .isEmpty(),
      check('carTransmission')
        .not()
        .isEmpty(),
      check('carMilage')
        .not()
        .isEmpty(),
      check('carRent')
        .not()
        .isEmpty()
    ],
    carController.createCar
  );
  router.patch(
    '/:cid',parser.single('image'),
    [
      check('carName')
        .not()
        .isEmpty()
    ],
    carController.updateCar
  );
  
  router.delete('/:cid', carController.deleteCar);
  module.exports = router;