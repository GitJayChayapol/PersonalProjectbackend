const { STATUS_PENDING, STATUS_DONE } = require("../config/constants");
const prisma = require("../models/prisma");

exports.createtodo = async (req, res, next) => {
  try {
    const data = req.body;
    const datatodo = await prisma.integratedTable.create({
      data: {
        date: data.date + "T00:00:00Z",
        invoice: data.invoice,
        car: {
          connect: { id: +data.carId },
        },
        driver: {
          connect: {
            id: +data.driverId,
          },
        },
        customer: {
          connect: {
            id: +data.customerId,
          },
        },
        origin: data.origin,
        destination: data.destination,
        detial: data.detial,
        price: data.price,

        user: {
          connect: {
            id: +data.userId,
          },
        },
        status: STATUS_PENDING,
      },
      include: {
        car: true,
        customer: true,
        driver: true,
      },
    });
    res.status(201).json({ message: "Create data new Car Sueecess", datatodo });
  } catch (err) {
    next(err);
  }
};

exports.todos = async (req, res, next) => {
  try {
    const { value } = req.params;
    const getTodos = await prisma.integratedTable.findMany({
      where: {
        data: value,
      },
      include: {
        customer: true,
        car: true,
        driver: true,
        user: true,
        account: true,
      },
      orderBy: {
        date: "asc",
      },
    });
    res.status(201).json({ getTodos });
  } catch (err) {
    next(err);
  }
};

exports.getinvoice = async (req, res, next) => {
  try {
    const getinvoice = await prisma.integratedTable.findMany({
      where: {
        invoice: {
          not: null,
        },
      },
      include: {
        customer: true,
        car: true,
        driver: true,
        user: true,
      },
      orderBy: {
        date: "asc",
      },
    });
    res.status(201).json({ getinvoice });
  } catch (err) {
    next(err);
  }
};

exports.notinvoice = async (req, res, next) => {
  try {
    const getinvoice = await prisma.integratedTable.findMany({
      where: {
        invoice: {
          equals: null,
        },
      },
      include: {
        customer: true,
        car: true,
        driver: true,
        user: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    res.status(201).json({ getinvoice });
  } catch (err) {
    next(err);
  }
};

exports.editTodo = async (req, res, next) => {
  try {
    const todo = req.body;
    const updateTodo = await prisma.integratedTable.findFirst({
      where: {
        id: +req.params.id,
      },
    });
    if (!updateTodo) {
      return res.status(404).json({ message: "Don't have Todo id" });
    }
    await prisma.integratedTable.update({
      where: {
        id: +req.params.id,
      },
      data: {
        date: todo.date + "T00:00:00Z",
        invoice: todo.invoice,
        car: {
          connect: { id: +todo.carId },
        },
        driver: {
          connect: {
            id: +todo.driverId,
          },
        },
        customer: {
          connect: {
            id: +todo.customerId,
          },
        },
        origin: todo.origin,
        destination: todo.destination,
        detial: todo.detial,
        price: todo.price,
        user: {
          connect: {
            id: +todo.userId,
          },
        },
      },
    });
    res.status(201).json({ todo });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const deleteTodo = await prisma.integratedTable.findFirst({
      where: {
        id: +req.params.id,
      },
    });
    if (!deleteTodo) {
      return res.status(404).json({ message: "Don't have Todo" });
    }
    await prisma.integratedTable.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.status(201).json({ message: `delete todo id ${req.params.id} Done` });
  } catch (err) {
    next(err);
  }
};

exports.search = async (req, res, next) => {
  try {
    const data = req.params;
    const searchtodo = await prisma.integratedTable.findMany({
      where: {
        customer: {
          id: +data.id,
        },
        invoice: {
          equals: null,
        },
      },
      include: {
        customer: true,
        car: true,
        driver: true,
        user: true,
      },
      orderBy: {
        date: "asc",
      },
    });
    const totalPrice = await prisma.$queryRaw`
    SELECT sum(price) totalprice
    FROM IntegratedTable
    WHERE customerId =${+data.id}
    GROUP BY customerId
  `;
    res.status(201).json({ searchtodo, totalPrice });
  } catch (err) {
    next(err);
  }
};

exports.updataStatus = async (req, res, next) => {
  try {
    const data = req.params;
    const status = await prisma.integratedTable.findFirst({
      where: {
        id: +data.id,
      },
    });
    if (status.status === STATUS_DONE) {
      await prisma.integratedTable.update({
        where: {
          id: +status.id,
        },
        data: {
          status: STATUS_PENDING,
        },
      });
    }

    if (status.status === STATUS_PENDING) {
      await prisma.integratedTable.update({
        where: {
          id: +status.id,
        },
        data: {
          status: STATUS_DONE,
        },
      });
    }

    console.log(status);
    res.status(201).json({ message: "Change STATUS DONE" });
  } catch (err) {
    next(err);
  }
};
