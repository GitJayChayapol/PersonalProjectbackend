const prisma = require("../models/prisma");
const createError = require("../uitls/create-error");

exports.createcar = async (req, res, next) => {
  try {
    const {
      carRegistration,
      carCall,
      brand,
      model,
      typeTruck,
      temperatureMax,
    } = req.body;
    const datacar = await prisma.car.create({
      data: {
        carRegistration,
        carCall,
        brand,
        model,
        typeTruck,
        temperatureMax,
      },
    });
    res.status(201).json({ message: "Create data new Car Sueecess", datacar });
  } catch (err) {
    next(err);
  }
};

exports.car = async (req, res, next) => {
  try {
    const datacar = req.params.datacar;
    const getcar = await prisma.car.findMany({
      where: {
        datacar: datacar,
      },
    });
    res.status(201).json({ getcar });
  } catch (err) {
    next(err);
  }
};
