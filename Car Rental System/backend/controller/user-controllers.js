const bcrypt=require('bcryptjs');
const {validationResult}=require('express-validator');
const HttpError = require('../models/http-error');
const User=require('../models/user');
const jwt=require('jsonwebtoken');
const cloudinary1=require('../utils/cloudinary');
const Profiler=require('../models/profile');
const getUsers =async(req, res, next) => {
  let users 
  try{
    users=await User.find({},'-password');
  }
  catch(err)
  {
    const error=new HttpError('Fetching User Failed',500);
    return next(error);
  }
  res.json({users:users.map(user=>user.toObject({getters:true}))});
};

const signup = async(req, res, next) => {
  const error=validationResult(req);
  if(!error.isEmpty()){ 
    return next(new HttpError('Invalid input passed,please check your data.',422));
  }
  const { name, email,phone, password } = req.body;
  let existingUser
  try{
       existingUser= await User.findOne({email:email})
  }catch(err)
  {
    const error=new HttpError('Sign up failed,Please Try Again Later',500);
    return next(error);
  }
  if(existingUser)
  {
    const error=new HttpError('User Existed Already,Please Login Instead',422);
    return next(error);
  }
  let hashedPassword;
  try{
    hashedPassword=await bcrypt.hash(password,12);
  }catch(err){
    const error=new HttpError('Could Not Create User',500);
    return next(error);
  }
  
  const createdUser = new User({
    name,
    email,
    phone,
    password:hashedPassword
  });
 
  try{
    await createdUser.save();
  }
  catch(err)
  {
    const error=new HttpError('Sign UP Failed,Please Try Again',500);
    return next(error);
  }
  let token;
  try{
   
    token=jwt.sign({userId:createdUser.id,email:createdUser.email},'mykey',{expiresIn:'1h'});
  }
  catch(err)
  {
    const error=new HttpError('Signup Failed',500);
    return next(error);
  }
  const cloud_id='carRental/ProfileIcon_rrbto9-Circle_cyzpqm';
  const City='Enter City';
  const Userimage='https://res.cloudinary.com/dgk5l5osb/image/upload/v1645605224/carRental/ProfileIcon_rrbto9-Circle_cyzpqm.png';
  const Address='Enter Address';
  const createdProfile = new Profiler({
   Address,
   City,
   Userimage,
   cloud_id,
   users:createdUser.id
  });
  try{
    await createdProfile.save();
  }
  catch(err)
  {
    const error=new HttpError('Failed to Create Profile!',500);
    return next(error);
  }
 
  res.status(201).json({userId:createdUser.id,email:createdUser.email});
  
};

const login = async(req, res, next) => {
  const { email, password } = req.body;
  let existingUser
  try{
       existingUser= await User.findOne({email:email})
  }catch(err)
  {
    const error=new HttpError('Login  failed,Please Try Again Later',500);
    return next(error);
  }
  if(!existingUser){
    const error=new HttpError('Invalid credentials,You cant login',401);
    return next(error);
  }
  let isValidPassword=false;
  try{
    isValidPassword=await bcrypt.compare(password,existingUser.password);
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
   
    token=jwt.sign({userId:existingUser.id,email:existingUser.email},'mykey',{expiresIn:'1h'});
  }
  catch(err)
  {
    const error=new HttpError('Log in Failed',500);
    return next(error);
  }
 
  res.status(201).json({userId:existingUser.id,email:existingUser.email});
};
const profile = async (req, res, next) => {
  const UId = req.params.uid;

  let user;
  let profilew;
  try {
    user = await User.findById(UId);
    profilew=await Profiler.findOne({users:user._id})
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a User.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      'Could not find User for the provided id.',
      404
    );
    return next(error);
  }
  
  if (!profilew) {
    const error = new HttpError(
      'Could not find User for the provided id.',
      404
    );
    return next(error);
  }
 
  res.json({Name:user.name,Email:user.email,Phone:user.phone,Address:profilew.Address,City:profilew.City,UserImage:profilew.Userimage});
};
const editUserDetail = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const UId=req.params.rid;
  let profw;
 // let u1;
  try {
    profw = await Profiler.findOne({users:UId});
   // u1=await User.findById(UId);
  }   
catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a User.',
      500
    );
    return next(error);
  }
  if (!profw) {
    const error = new HttpError(
      'Could not find User for the provided id.',
      404
    );
   
    return next(error);
  }
  const myjs=JSON.stringify(profw.cloud_id);
  let cloud_id='carRental/ProfileIcon_rrbto9-Circle_cyzpqm';
  const myjs1=JSON.stringify(cloud_id);
  let Userimage='ac';
  if(!req.file)
 {
   cloud_id=profw.cloud_id;
   Userimage=profw.Userimage;
    
 }
 else{
  if(myjs===myjs1)
  {
    Userimage=req.file.path;
    cloud_id=req.file.filename;
    
  }else
  {
    await cloudinary1.uploader.destroy(profw.cloud_id);
    Userimage=req.file.path;
    cloud_id=req.file.filename;
 }

}
  //u1.phone=req.body.Phone;
  //u1.name=req.body.Name;
  const users=profw.users;
  
  const City=req.body.City;
  const Address=req.body.Address;
  const createdProfile = new Profiler({
   Address,
   City,
   Userimage,
   cloud_id,
   users,
  });
  try{
    await createdProfile.save();
    await profw.remove();
    //await u1.save();
  }
  catch(err)
  {
    const error=new HttpError('Failed to Create Profile!',500);
    return next(error);
  }
 
 
  
 

  res.json("Detail Added");
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.profile=profile;
exports.editUserDetail=editUserDetail;
