const prisma = require("../models/prisma");
const createError = require("../uitls/create-error");

exports.createcustomer = async (req, res, next) => {
  try {
    const {
      customerName,
      customerCall,
      customerAddress,
      taxIdentification,
      customerPhone,
    } = req.body;
    const customer = await prisma.customer.create({
      data: {
        customerName,
        customerCall,
        customerAddress,
        taxIdentification,
        customerPhone,
      },
    });
    res
      .status(201)
      .json({ message: "Create data new Customer Sueecess", customer });
  } catch (err) {
    next(err);
  }
};

exports.customer = async (req, res, next) => {
  try {
    const datacustomer = req.params.datacustomer;
    const getcustomer = await prisma.customer.findMany({
      where: {
        datacustomer: datacustomer,
      },
    });
    res.status(201).json({ getcustomer });
  } catch (err) {
    next(err);
  }
};
