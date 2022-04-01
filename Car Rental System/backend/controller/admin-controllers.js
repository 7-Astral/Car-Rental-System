const bcrypt=require('bcryptjs');
const {validationResult}=require('express-validator');
const HttpError = require('../models/http-error');
const Admin=require('../models/admin');
const jwt=require('jsonwebtoken');

const signup = async(req, res, next) => {
  const error=validationResult(req);
  if(!error.isEmpty()){ 
    return next(new HttpError('Invalid input passed,please check your data.',422));
  }
  const { name, email,phone, password } = req.body;
  let existingAdmin
  try{
       existingAdmin= await Admin.findOne({email:email})
  }catch(err)
  {
    const error=new HttpError('Sign up failed,Please Try Again Later',500);
    return next(error);
  }
  if(existingAdmin)
  {
    const error=new HttpError('Admin Existed Already,Please Login Instead',422);
    return next(error);
  }
  let hashedPassword;
  try{
    hashedPassword=await bcrypt.hash(password,12);
  }catch(err){
    const error=new HttpError('Could Not Create Admin',500);
  }
  
  const createdAdmin = new Admin({
    name,
    email,
    phone,
    password:hashedPassword
  });
 
  try{
    await createdAdmin.save();
  }
  catch(err)
  {
    const error=new HttpError('Sign UP Failed,Please Try Again',500);
    return next(error);
  }
  let token;
  try{
   
    token=jwt.sign({adminId:createdAdmin.id,email:createdAdmin.email},'mykey',{expiresIn:'1h'});
  }
  catch(err)
  {
    const error=new HttpError('Signup Failed',500);
    return next(error);
  }
 
  res.status(201).json({adminId:createdAdmin.id,email:createdAdmin.email});
  
};

const login = async(req, res, next) => {
  const { email, password } = req.body;
  let existingAdmin
  try{
       existingAdmin= await Admin.findOne({email:email})
  }catch(err)
  {
    const error=new HttpError('Login  failed,Please Try Again Later',500);
    return next(error);
  }
  if(!existingAdmin){
    const error=new HttpError('Invalid credentials,You cant login',401);
    return next(error);
  }
  let isValidPassword=false;
  try{
    isValidPassword=await bcrypt.compare(password,existingAdmin.password);
  }catch(err)
  {
    const error=new HttpError('Coudnt Login Check Your credentials,Try Again  Later',500);
    return next(error);
  }
  if(!isValidPassword)
  {
    const error=new HttpError('Invalid credentials,You cant login',401);
    return next(error);
  }
  let token;
  try{
   
    token=jwt.sign({AdminId:existingAdmin.id,email:existingAdmin.email},'mykey',{expiresIn:'1h'});
  }
  catch(err)
  {
    const error=new HttpError('Log in Failed',500);
    return next(error);
  }
 
  res.status(201).json({AdminId:existingAdmin.id,email:existingAdmin.email});
};


exports.signup = signup;
exports.login = login;
