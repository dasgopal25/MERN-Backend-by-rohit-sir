const express = require("express");
const app = express();
const database = require("./util/Mongodb");
const RedisClient = require("./util/redis");
const cookieParser = require("cookie-parser");
const userRouter = require("./router/user_router");
const cors = require("cors");
require("dotenv").config();
const {rateLimiter} = require("./middleware/user_middle");

app.use(cors({
  origin: "http://localhost:5173",  // React Vite URL
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(rateLimiter);
app.use("/user", userRouter);


const InitzeConnect = async (req,res)=>{
  try{
    await Promise.all([RedisClient.connect(),database()]);
    console.log("All Database has been connected successfully");
    app.listen(process.env.PORT, () => {      
      console.log(`Server running on port ${process.env.PORT}`);
    });
  }
  catch(err){
    console.log("Error: "+err)
  }
};

InitzeConnect();





// database()
//   .then(() => {
//     console.log("Database connected");
//     app.listen(process.env.PORT, () => {
//       console.log(`Server running on port ${process.env.PORT}`);
//     });
//   })
  // .catch(err => console.log(err));
