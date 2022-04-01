const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const cloudinary1=require('../utils/cloudinary');
const HttpError = require('../models/http-error');
const Car = require('../models/car');
const getCarByNId = async (req, res, next) => {
  const carId = req.params.cid;

  let car;
  try {
    car = await Car.findOne({carNumberPlate:carId});
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a Car.',
      500
    );
    return next(error);
  }

  if (!car) {
    const error = new HttpError(
      'Could not find Car for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ car: car.toObject({ getters: true }) });
};
const getCarById = async (req, res, next) => {
  const carId = req.params.cid;

  let car;
  try {
    car = await Car.findById(carId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a Car.',
      500
    );
    return next(error);
  }

  if (!car) {
    const error = new HttpError(
      'Could not find Car for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ car: car.toObject({ getters: true }) });
};
const getCar = async (req, res, next) => {
  let car;
  try {
    car = await Car.find({});
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a Car.',
      500
    );
    return next(error);
  }

  if (!car) {
    const error = new HttpError(
      'Could not find Car for the provided id.',
      404
    );
    return next(error);
  }

  res.json(car);
};

const createCar = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const {carName,carType,carSpecs,carTransmission,carMilage,carRent,carNumberPlate } = req.body;
  const createdCar = new Car({
    carName,
    carType,
    carImage:req.file.path,
    cloud_id:req.file.filename,
    carSpecs,
    carTransmission,
    carMilage,
    carRent,
    carNumberPlate
  });
  try{
    await createdCar.save();
  }
  catch(err)
  {
    const error=new HttpError('Failed!',500);
    return next(error);
  }

  res.status(201).json({ car: createdCar });
};

const updateCar = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
   let p1;
   let c1;
   let ccloud;
   let rcloud;
  const {carName,carType,carSpecs,carTransmission,carMilage,carRent,carNumberPlate } = req.body;
  const carId = req.params.cid;
  let car;
  try {
    car = await Car.findOne({carNumberPlate:carId});
    ccloud=JSON.stringify(car.cloud_id);
    if(!req.file)
  {  
    p1=car.cloud_id;
    c1=car.carImage;
  }else{
    await cloudinary1.uploader.destroy(car.cloud_id);
    c1=req.file.path;
    p1=req.file.filename;
 }
    } catch (err) {
    const error = new HttpError(
      'Something went wrong, cant update Car.',
      500
    );
    return next(error);
  }

  if (!car) {
    const error = new HttpError(
      'Could not find Car for the provided id.',
      404
    );
    return next(error);
  }

  car.carName=carName;
  car.carType=carType;
  car.carSpecs=carSpecs;
  car.carTransmission=carTransmission;
  car.carMilage=carMilage;
  car.carRent=carRent;
  car.carNumberPlate=carNumberPlate;
  car.carImage=c1;
  car.cloud_id=p1;
  try {
    await car.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update car.',
      500
    );
    return next(error);
  }

  res.status(200).json({ car:car.toObject({ getters: true }) });
};

const deleteCar = async (req, res, next) => {
  const carId = req.params.cid;

  let car;
  try {
    car = await Car.findOne({carNumberPlate:carId});
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete car.',
      500
    );
    return next(error);
  }

  if (!car) {
    const error = new HttpError('Could not find car for this id.', 404);
    return next(error);
  }
  try{
      await cloudinary1.uploader.destroy(car.cloud_id);
      await car.remove();
  }
  catch(err)
  {
    const error = new HttpError(
      'Something went wrong, could not delete car.',
      500
    );
    return next(error);
  }
 

  res.status(200).json({ message: 'Deleted car.' });
};
exports.getCar=getCar;
exports.getCarByNId = getCarByNId;
exports.getCarById = getCarById;
exports.createCar = createCar;
exports.updateCar = updateCar;
exports.deleteCar = deleteCar;
