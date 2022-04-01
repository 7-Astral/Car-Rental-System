const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const Rate = require('../models/rate');
const User = require('../models/user');
const Car = require('../models/car');
const getreviewByCarId = async (req, res, next) => {
    const rId = req.params.rid;
    let rate;
    try {
        rate = await Rate.find({ cars: rId }).populate('users','name');
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find a Rate.',
            500
        );
        return next(error);
    }

    if (!rate) {
        const error = new HttpError(
            'Could not find Rate for the provided id.',
            404
        );
        return next(error);
    }
    res.json(rate);
};
const getAvgrateByCarId = async (req, res, next) => {
    const rId = req.params.rid;
    let rate1;
    let AverageRate=0;
          const vc=JSON.stringify(rId);
          const array = JSON.parse("[" +vc+ "]");
          const tc1=JSON.stringify(array);
    try {
        rate1 = await Rate.aggregate(
            [
                {
                $group:
                  {
                    _id: "$cars",
                    avgRate: { $avg: "$rate" },
                  }
              }
            ]
         );
         rate1.map(obj=>{
            const pc=JSON.stringify(obj._id);
            if(pc===tc1)
            {
                AverageRate=obj.avgRate;
            }});

    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find a Rate.',
            500
        );
        return next(error);
    }

    if (!rate1) {
        const error = new HttpError(
            'Could not find Rate for the provided id.',
            404
        );
        return next(error);
    }
    res.json({AverageRate:AverageRate});
};
const createRate = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const { rate, review, users, cars } = req.body;
    const createdRate = new Rate({
        review,
        rate,
        users,
        cars
    });
    try {
        await createdRate.save();
    }
    catch (err) {
        const error = new HttpError('Failed!', 500);
        return next(error);
    }

    res.status(201).json({ rate: createdRate });
};
exports.getreviewByCarId=getreviewByCarId;
exports.createRate = createRate;
exports.getAvgrateByCarId = getAvgrateByCarId;