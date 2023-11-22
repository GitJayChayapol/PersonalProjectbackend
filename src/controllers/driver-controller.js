const prisma = require("../models/prisma");

exports.createDriver = async (req, res, next) => {
  try {
    const data = req.body;
    const datadriver = await prisma.driver.create({
      data: {
        driverFirstName: data.driverFirstName,
        driverLastName: data.driverLastName,
        driverCall: data.driverCall,
        gender: data.gender,
        brithDay: data.brithDay + "T00:00:00Z",
        identification: data.identification,
      },
    });
    res
      .status(201)
      .json({ message: "Create data new Driver Sueecess", datadriver });
  } catch (err) {
    next(err);
  }
};

exports.driver = async (req, res, next) => {
  try {
    const { value } = req.params;
    const getAlldriver = await prisma.driver.findMany({
      where: {
        data: value,
      },
      orderBy: {
        driverFirstName: "asc",
      },
    });
    res.status(201).json({ getAlldriver });
  } catch (err) {
    next(err);
  }
};

exports.getDriverById = async (req, res, next) => {
  try {
    const driver = req.params;
    const getdataById = await prisma.driver.findMany({
      where: {
        driverFirstName: driver.driverFirstName,
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

exports.editDriver = async (req, res, next) => {
  try {
    const driver = req.body;
    const updateDriver = await prisma.driver.findFirst({
      where: {
        id: +req.params.id,
      },
    });
    if (!updateDriver) {
      return res.status(404).json({ message: "Don't have driver" });
    }
    await prisma.driver.update({
      where: {
        id: +req.params.id,
      },
      data: {
        driverFirstName: driver.driverFirstName,
        driverLastName: driver.driverLastName,
        driverCall: driver.driverCall,
        gender: driver.gender,
        brithDay: driver.brithDay + "T00:00:00Z",
        identification: driver.identification,
      },
    });
    res.status(201).json({ updateDriver });
  } catch (err) {
    next(err);
  }
};

exports.deleteDriver = async (req, res, next) => {
  try {
    const deletedriver = await prisma.driver.findFirst({
      where: {
        id: +req.params.id,
      },
    });
    if (!deletedriver) {
      return res.status(404).json({ message: "Don't have driver" });
    }
    await prisma.driver.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.status(201).json({ message: `delete driver id ${req.params.id} Done` });
  } catch (err) {
    next(err);
  }
};
