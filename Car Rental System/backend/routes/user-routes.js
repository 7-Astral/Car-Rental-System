const express = require('express');
const { check }=require('express-validator');
const parser=require('../middleware/fileupload');
const usersController = require('../controller/user-controllers');

const router = express.Router();

router.get('/', usersController.getUsers);  
router.get('/pd/:uid', usersController.profile);
router.patch('/detail/:rid',parser.single('image'),[
    check('Address')
    .not()
    .isEmpty(),
    check('City')
    .not()
    .isEmpty()
    ],usersController.editUserDetail);  
router.post('/signup',[
    check('name')
    .not()
    .isEmpty(),
    check('email')
    .normalizeEmail() 
    .isEmail(),
    check('phone')
    .not()
    .isEmpty()
    .isLength({min:10}),
    check('password').isLength({min:6})

], usersController.signup);

router.post('/login', usersController.login);

module.exports = router; 



