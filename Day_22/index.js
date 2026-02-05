const express = require("express");
const app = express();
const database = require("./util/Mongodb");
const cookieParser = require("cookie-parser");
const userRouter = require("./router/user_router");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRouter);

database()
  .then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));
