import mongoose from"mongoose" ;
import bodyparser from"body-parser" ;
import express from"express";


const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const { Schema , model} = mongoose;


const PayementSchema = mongoose.Schema({
      idUser: {
        type: String,
        require: true,
      },
      url: {
        type: String,
    
      },
      image: {
        type: String,
    
      },
      
    },
    {
      timestamps: true,
    }
  );




export default model("Payment" ,  PayementSchema  )

