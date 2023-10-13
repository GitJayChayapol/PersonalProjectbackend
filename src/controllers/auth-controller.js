const prisma = require("../models/prisma");
const createError = require("../uitls/create-error");

exports.register = async (req, res, next) => {
  try {
    const { username, password, firstName, lastName, phoneNumber } = req.body;
    const user = await prisma.user.create({
      data: {
        username,
        password,
        firstName,
        lastName,
        phoneNumber,
      },
    });
    res.status(201).json({ message: "Register Success", user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userlogin = await prisma.user.findFirst({
      where: {
        username: username,
        password: password,
      },
    });
    if (!userlogin) {
      return next(createError("invalid credential", 400));
    }
    res.status(201).json({ message: "Login Success", userlogin });
  } catch (err) {
    next(err);
  }
};
