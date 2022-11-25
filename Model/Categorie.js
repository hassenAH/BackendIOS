import mongoose from"mongoose" ;
import bodyparser from"body-parser" ;
import express from"express";


const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const { Schema , model} = mongoose;


const CategorieSchema = mongoose.Schema({
      name: {
        type: String,
        require: true,
      },
      image: {
        type: String,
    
      },
      
    },
    {
      timestamps: true,
    }
  );




export default model("Categorie" ,  CategorieSchema  )

