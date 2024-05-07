require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

/**
 * * Connect with PORT
 */
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is on port ${PORT}!`));

/** ----------------------------------------------------------------------------------------------
 * * Connect to Mongoose using with Username, Password, Cluster, URL by .env
 */
const MongoDB_Username = process.env.MongoDB_Username;
const MongoDB_Password = process.env.MongoDB_Password;
const MongoDB_Cluster = process.env.MongoDB_Cluster;
const MongoDB_URL = `mongodb+srv://${MongoDB_Username}:${MongoDB_Password}@${MongoDB_Cluster}.mongodb.net/`;

// const connect_MongoDB = async () => {
//   try {
//     await mongoose.connect(MongoDB_URL);
//     console.log("Mongoose Connected");
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };
// connect_MongoDB();

mongoose
  .connect(MongoDB_URL)
  .then(() => {
    console.log("Mongoose Connected");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
