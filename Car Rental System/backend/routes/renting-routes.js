const express = require('express');
const { check }=require('express-validator');

const rentController = require('../controller/renting-controllers');
const router = express.Router();

router.get('/getrent',rentController.getRent);
router.get('/:rid', rentController.getrentByUserId);
router.post('/pc/:cid', rentController.CheckAvailablity);
router.post(
    '/create',
    [
      check('rentPrice')
        .not()
        .isEmpty(),
    ],
    rentController.createRent
  );
  router.post('/availablecar',rentController.Booking);
  router.patch(
    '/:rid',
    rentController.updateRent
  );
  router.patch('/edit/:rid',rentController.updateRent);
  router.delete('/:rid', rentController.deleteRent);
  module.exports = router;
 