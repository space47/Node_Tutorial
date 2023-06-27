require("dotenv").config();
const express = require("express");
const app = express();
// for routes
const tasks = require("./routes/tasks");

// for Database connections
const connectDB = require("./db/connect");

// for unknown address handling
const notfound = require("./middleware/not-found");
// for custom error handling
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
// for handling enviroment variable

// middleware
app.use(express.static("./public"));
// to refactor object in json format in whole project
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);

// middleware to handle unknown address error
// middleware to handle error 
// app.get('*',(req,res)=>{
  //   res.send('router not exist')
  // })
  app.use(errorHandlerMiddleware);
  app.use(notfound);

// to set a custom port
const port = process.env.PORT || 3000;

// async call to setup db connection and then trigger port connection
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
