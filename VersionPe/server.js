import express from "express"
import UserRoute from"./Routes/User.js"
import mongoose from"mongoose";


import dotenv from"dotenv" ;
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options ={
  definition: {
    openapi : '3.0.0',
    info :{
      title :'Bizoz Project ',
      version : '1.0.0'
    },
    servers:[
      {
        url: 'http://localhost:5000/'
      }
    ]
  },
  apis: ["./Routes/*.js"],
}

const swaggerSpec = swaggerJSDoc(options)

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
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))




/* Demarrer le serveur a l'ecoute des connexions */
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
