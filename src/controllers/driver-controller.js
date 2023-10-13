const prisma = require("../models/prisma");

exports.createdriver = async (req, res, next) => {
  try {
    const data = req.body;
    const driver = await prisma.driver.create({
      data: {
        driverFirstName: data.driverFirstName,
        driverLastName: data.driverLastName,
        driverCall: data.driverCall,
        gender: data.gender,
        brithDay: data.brithDay,
        identification: data.identification,
      },
    });
    res.status(201).json({ driver });
  } catch (err) {
    next(err);
  }
};

exports.driver = async (req, res, next) => {
  try {
    const { value } = req.params;
    const getadriver = await prisma.driver.findMany({
      where: {
        data: value,
      },
    });
    res.status(201).json({ getadriver });
  } catch (err) {
    next(err);
  }
};

exports.getdriverById = async (req, res, next) => {
  try {
    const driver = req.params;
    const getdataById = await prisma.driver.findFirst({
      where: {
        id: +driver.id,
      },
    });
    if (!getdataById) {
      return res.status(404).json({ message: "Don't have driver" });
    }
    res.status(201).json({ getdataById });
  } catch (err) {
    next(err);
  }
};
