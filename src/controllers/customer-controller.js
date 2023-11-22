const prisma = require("../models/prisma");

exports.createCustomer = async (req, res, next) => {
  try {
    const data = req.body;
    const datacustomer = await prisma.customer.create({
      data: {
        customerName: data.customerName,
        customerCall: data.customerCall,
        customerAddress: data.customerAddress,
        taxIdentification: data.taxIdentification,
        customerPhone: data.customerPhone,
      },
    });
    res
      .status(201)
      .json({ message: "Create data new Customer Sueecess", datacustomer });
  } catch (err) {
    next(err);
  }
};

exports.customer = async (req, res, next) => {
  try {
    const { value } = req.params;
    const getcustomer = await prisma.customer.findMany({
      where: {
        data: value,
      },
      orderBy: {
        customerName: "asc",
      },
    });
    res.status(201).json({ getcustomer });
  } catch (err) {
    next(err);
  }
};

exports.getCustomerById = async (req, res, next) => {
  try {
    const customer = req.params;
    const getcustomerById = await prisma.customer.findMany({
      where: {
        customerCall: customer.customerCall,
      },
    });
    if (!getcustomerById) {
      return res.status(404).json({ message: "Don't have customer" });
    }
    res.status(201).json({ getcustomerById });
  } catch (err) {
    next(err);
  }
};

exports.editCustomer = async (req, res, next) => {
  try {
    const customer = req.body;
    const updateCustomer = await prisma.customer.findFirst({
      where: {
        id: +req.params.id,
      },
    });
    if (!updateCustomer) {
      return res.status(404).json({ message: "Don't have Customer" });
    }
    await prisma.customer.update({
      where: {
        id: +req.params.id,
      },
      data: {
        customerName: customer.customerName,
        customerCall: customer.customerCall,
        customerAddress: customer.customerAddress,
        taxIdentification: customer.taxIdentification,
        customerPhone: customer.customerPhone,
      },
    });
    res.status(201).json({ updateCustomer });
  } catch (err) {
    next(err);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const customer = req.body;
    const deleteCustomer = await prisma.customer.findFirst({
      where: {
        id: +req.params.id,
      },
    });
    if (!deleteCustomer) {
      return res.status(404).json({ message: "Don't have customer" });
    }
    await prisma.customer.delete({
      where: {
        id: +req.params.id,
      },
    });
    res
      .status(201)
      .json({ message: `delete customer id ${req.params.id} Done` });
  } catch (err) {
    next(err);
  }
};
