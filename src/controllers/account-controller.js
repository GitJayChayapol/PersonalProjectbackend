const { STATUS_DONE } = require("../config/constants");
const prisma = require("../models/prisma");

exports.createAccount = async (req, res, next) => {
  try {
    const data = req.body;
    const createAccount = await prisma.account.create({
      data: {
        billing: data.billing,
        totalPrice: String(data.totalPrice),
      },
    });
    const updateAcc = await prisma.integratedTable.updateMany({
      where: {
        status: STATUS_DONE,
        customerId: data["0"][0].customerId,
      },
      data: {
        accountId: createAccount.id,
        invoice: data.invoice,
      },
    });
    res.status(201).json({ createAccount, updateAcc });
  } catch (err) {
    next(err);
  }
};

exports.account = async (req, res, next) => {
  try {
    const { value } = req.params;
    const getacc = await prisma.account.findMany({
      where: {
        data: value,
      },
      include: {
        IntegratedTable: {
          select: {
            id: true,
            date: true,
            invoice: true,
            car: true,
            driver: true,
            customer: true,
            origin: true,
            destination: true,
            price: true,
            accountId: true,
          },
        },
      },
    });
    res.status(200).json({ getacc });
  } catch (err) {
    next(err);
  }
};

exports.deleteaccount = async (req, res, next) => {
  try {
    const deleteacc = await prisma.account.findFirst({
      where: {
        id: +req.params.id,
      },
    });
    console.log(req.params.id);
    if (!deleteacc) {
      return res.status(404).json({ message: "Don't have Account" });
    }
    console.log("triggered1");
    await prisma.integratedTable.updateMany({
      where: {
        accountId: +req.params.id,
      },
      data: {
        invoice: null,
      },
    });
    await prisma.account.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.status(201).json({ message: `delete acc id ${req.params.id} Done` });
  } catch (err) {
    next(err);
  }
};

exports.getAccountbyId = async (req, res, next) => {
  try {
    const newTable = await prisma.integratedTable.findMany({
      where: {
        accountId: +req.params.id,
      },
      include: {
        account: true,
        customer: true,
        car: true,
      },
    });
    const totalPrice = await prisma.$queryRaw`
    SELECT sum(price) totalprice
    FROM IntegratedTable
    WHERE customerId =${+data.id}
    GROUP BY customerId
  `;
    res.status(201).json({ newTable, totalPrice });
  } catch (err) {
    next(err);
  }
};
