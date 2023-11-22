require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error");
const rateLimitMiddleware = require("./middleware/rate-limit");
const authRoute = require("./routes/auth-route");
const carRoute = require("./routes/car-route");
const customerRoute = require("./routes/customer-route");
const driverRoute = require("./routes/driver-route");
const todoRoute = require("./routes/todo-route");
const accountRoute = require("./routes/account-route");

const app = express();

app.use(cors());
app.use(rateLimitMiddleware);
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRoute);
app.use("/car", carRoute);
app.use("/customer", customerRoute);
app.use("/driver", driverRoute);
app.use("/account", accountRoute);
app.use("/", todoRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
