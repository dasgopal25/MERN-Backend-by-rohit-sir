const express = require('express');
const app = express();
require('dotenv').config();
const cookie_parser = require('cookie-parser');
const main = require("./config/db");
const redisclient = require('./config/redis')
const Authrouter = require('./router/userRouter');
const problemrouter = require('./router/problemRouter');


//middleware
app.use(express.json());
app.use(cookie_parser());

//API code
app.use("/user",Authrouter)
app.use("/problem",problemrouter)



//connection code
const InitlizeConnection = async ()=>{
    try{
        await Promise.all([redisclient.connect(),main()]);
        console.log("connected to all database");

         app.listen(process.env.PORT, () => {      
      console.log(`Server running on port ${process.env.PORT}`);
    })
    }
    catch(err){
        console.log("Error: "+err);
    }
};

InitlizeConnection();

// main()
// .then(async ()=>{
//     console.log("Database connected successfully");
//     app.listen(process.env.PORT,()=>{
//         console.log("Server listen on port number: "+process.env.PORT);
//     })
// })

// .catch((err)=>{console.log("Error: "+err);
// })
