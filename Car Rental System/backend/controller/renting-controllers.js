const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const renting = require('../models/renting');
const Car = require('../models/car');
const getrentByUserId = async (req, res, next) => {
  const rId = req.params.rid;

  let rent;
  try {
    rent = await renting.find({users:rId},{users:0}).populate('cars');

  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a Rent.',
      500
    );
    return next(error);
  }

  if (!rent) {
    const error = new HttpError(
      'Could not find Rent for the provided id.',
      404
    );
    return next(error);
  }

  res.json(rent);
};
const getRent = async (req, res, next) => {
    let rent;
    try {
      rent = await renting.find({}).populate('cars','carName carImage carNumberPlate').populate('users','name phone email');
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not find a Car.',
        500
      );
      return next(error);
    }
  
    if (!rent) {
      const error = new HttpError(
        'Could not find Car for the provided id.',
        404
      );
      return next(error);
    }
  
    res.json(rent);
  };
const createRent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const {startDate,endDate,rentPrice,driver,users,cars} = req.body;
  const v1= new Date(req.body.startDate);
  const v2= new Date(req.body.endDate);
  const createdRent = new renting({
    startDate:v1,
    endDate:v2,
    rentPrice,
    driver,
    users,
    cars
  });
  try{
    await createdRent.save();
  }
  catch(err)
  {
    const error=new HttpError('Failed!',500);
    return next(error);
  }

  res.status(201).json({ rent: createdRent });
};

const updateRent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const {startDate,endDate,rentPrice,driver,users,cars} = req.body;
  const Id = req.params.rid;

  let rent;
  try {
    rent = await renting.findById(Id);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, cant update Rent.',
      500
    );
    return next(error);
  }
  if (!rent) {
    const error = new HttpError(
      'Could not find Rent for the provided id.',
      404
    );
    return next(error);
  }

  rent.startDate=startDate;
  rent.endDate=endDate;
  rent.rentPrice=rentPrice;
  rent.driver=driver;
  rent.users=users;
  rent.cars=cars;
  
  try {
    await rent.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not Rent car.',
      500
    );
    return next(error);
  }

  res.status(200).json({rent:rent.toObject({ getters: true }) });
};

const deleteRent = async (req, res, next) => {
  const Id = req.params.rid;

  let rent;
  try {
    rent = await renting.findById(Id);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete Rent.',
      500
    );
    return next(error);
  }

  if (!rent) {
    const error = new HttpError('Could not find Rent for this id.', 404);
    return next(error);
  }
  try{
     
      await rent.remove();
  }
  catch(err)
  {
    const error = new HttpError(
      'Something went wrong, could not delete Rent.',
      500
    );
    return next(error);
  }
 

  res.status(200).json({ message: 'Deleted Rent.' });
};

      
      
const CheckAvailablity= async (req, res, next) => {
        let rent;
        let Message="Available";
        let card;
        const from_date=req.body.from_date;
        const to_date=req.body.to_date;
        const cid=req.params.cid;
        try {
          card= await Car.findOne({carNumberPlate:cid});
          const vc=JSON.stringify(card._id);
          const array = JSON.parse("[" +vc+ "]");
          const vc1=JSON.stringify(array);
          rent = await renting.find({
            $or: [
                { startDate: { $gte: from_date, $lte: to_date } },
                {
                    endDate: { $gte: from_date, $lte: to_date }
                },
                {
                    $and: [{ startDate: { $lte: from_date } }, { endDate: { $gte: to_date } }]
                },
            ],
        });
        
        rent.map(obj=>{
          const pc=JSON.stringify(obj.cars);
          if(pc===vc1)
          {
            Message="Unavailable";
          }});
          if (typeof rent === 'undefined') {
            Message="Availble";
          }
        } catch (err) {
          const error = new HttpError(
            'Something went wrong, could not find a Car.',
            500
          );
          return next(error);
        }
        
        if (!rent) {
          const error = new HttpError(
            'Could not find Car for the provided id.',
            404
          );
          return next(error);
        }

        res.json({Status:Message});
      };



      const Booking= async (req, res, next) => {
        let rent;
        let availablecars;
        let carIds;
        const from_date=req.body.from_date;
        const to_date=req.body.to_date;
        try {
          rent = await renting.find({
            $or: [
                { startDate: { $gte: from_date, $lte: to_date } },
                {
                    endDate: { $gte: from_date, $lte: to_date }
                },
                {
                    $and: [{ startDate: { $lte: from_date } }, { endDate: { $gte: to_date } }]
                },
            ],
        }).select('cars');
         carIds = rent.map(b => b.cars);
         availablecars= await Car.find({ _id: { $nin: carIds } });
        } catch (err) {
          const error = new HttpError(
            'Something went wrong, could not find a Car.',
            500
          );
          return next(error);
        }
      
        if (!rent) {
          const error = new HttpError(
            'Could not find Car for the provided id.',
            404
          );
          return next(error);
        }
        res.json(availablecars);
      };
exports.getRent = getRent;
exports.getrentByUserId = getrentByUserId;
exports.createRent = createRent;
exports.updateRent = updateRent;
exports.deleteRent = deleteRent;
exports.Booking=Booking;
exports.CheckAvailablity=CheckAvailablity;