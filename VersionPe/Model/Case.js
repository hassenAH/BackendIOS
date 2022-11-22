import mongoose from"mongoose" ;
import bodyparser from"body-parser" ;
import express from"express";



const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const { Schema , model} = mongoose;


const CaseSchema = mongoose.Schema({
      title: {
        type: String,
        require: true,
      },
      traite: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
    
      },
      
    },
    {
      timestamps: true,
    }
  );




export default model("Case" ,  CaseSchema  )

