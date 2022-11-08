import express from "express"
import UserRoute from"./Routes/User.js"
import mongoose from"mongoose";


import dotenv from"dotenv" ;


dotenv.config({path:'./config/config.env'});


const app = express();
app.use(express.urlencoded({extended: true, limit: '50mb'}));

const databaseName = "bizos"; // L'@ du serveur
const port = process.env.PORT || 9090; // Le port du serveur

  mongoose.set("debug", true);
  mongoose.Promise = global.Promise;

  mongoose
    .connect(`mongodb://localhost:27017/${databaseName}`)
    .then(() => {
      console.log(`connected to ${databaseName}`);
    })
    .catch((err) => {
      console.log(err);
    });

app.use(express.json());

app.use("/user", UserRoute);





/* Demarrer le serveur a l'ecoute des connexions */
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
