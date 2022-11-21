import mongoose from"mongoose" ;
import bodyparser from"body-parser" ;
import express from"express";


const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const { Schema , model} = mongoose;


const PackSchema = mongoose.Schema({
      name: {
        type: String,
        require: true,
      },
      prix: {
        type: Number,
        require: true,
      },
      description: {
        type: String,
    
      },
      
    },
    {
      timestamps: true,
    }
  );




export default model("Pack" ,  PackSchema  )

