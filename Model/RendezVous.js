import mongoose from"mongoose" ;
import bodyparser from"body-parser" ;
import express from"express";


const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const { Schema , model} = mongoose;


const RendezVousSchema = mongoose.Schema({
      idUser: {
        type: String,
        require: true,
      },
      idAvocat: {
        type: String,
        require: true,
      },
      Date: {
        type: Date,
    
      },
      
    },
    {
      timestamps: true,
    }
  );




export default model("RendezVous" ,  RendezVousSchema  )

