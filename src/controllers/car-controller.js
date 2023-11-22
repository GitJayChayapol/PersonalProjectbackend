const prisma = require("../models/prisma");

exports.createcar = async (req, res, next) => {
  try {
    const data = req.body;
    const datacar = await prisma.car.create({
      data: {
        carRegistration: data.carRegistration,
        carCall: data.carCall,
        brand: data.brand,
        model: data.model,
        typeTruck: data.typeTruck,
        temperatureMax: data.temperatureMax,
      },
    });
    res.status(201).json({ message: "Create data new Car Sueecess", datacar });
  } catch (err) {
    next(err);
  }
};

exports.car = async (req, res, next) => {
  try {
    const { value } = req.params;
    const getcar = await prisma.car.findMany({
      where: {
        data: value,
      },
      orderBy: {
        carRegistration: "asc",
      },
    });
    res.status(201).json({ getcar });
  } catch (err) {
    next(err);
  }
};

exports.getcarById = async (req, res, next) => {
  try {
    const car = req.params;
    const getcarById = await prisma.car.findMany({
      where: {
        carCall: car.carCall,
      },
    });
    if (!getcarById) {
      return res.status(404).json({ message: "Don't have car" });
    }
    res.status(201).json({ getcarById });
  } catch (err) {
    next(err);
  }
};

exports.editcarById = async (req, res, next) => {
  try {
    const car = req.body;
    const updatecar = await prisma.car.findFirst({
      where: {
        id: +req.params.id,
      },
    });
    if (!updatecar) {
      return res.status(404).json({ message: "Don't have car" });
    }
    await prisma.car.update({
      where: {
        id: +req.params.id,
      },
      data: {
        carRegistration: car.carRegistration,
        carCall: car.carCall,
        brand: car.brand,
        model: car.model,
        typeTruck: car.typeTruck,
        temperatureMax: car.temperatureMax,
      },
    });
    res.status(201).json({ updatecar });
  } catch (err) {
    next(err);
  }
};

exports.deletecar = async (req, res, next) => {
  try {
    const car = req.body;
    const deletecar = await prisma.car.findFirst({
      where: {
        id: +req.params.id,
      },
    });
    if (!deletecar) {
      return res.status(404).json({ message: "Don't have car" });
    }
    await prisma.car.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.status(201).json({ message: `delete car id ${req.params.id} Done` });
  } catch (err) {
    next(err);
  }
};
