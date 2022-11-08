import mongoose from"mongoose" ;
import bodyparser from"body-parser" ;
import express from"express"

const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const { Schema , model} = mongoose;


const UserSchema = mongoose.Schema({
      first_name: {
        type: String,
        require: true,
      },
      last_name: {
        type: String,
       
      },
      email: {
        type: String,
      },
      password:{
        type: String,
      },
      code :
      {
        type: String
      },
      verified: {
        type: Boolean,
        default: false,
      },
      
    },
    {
      timestamps: true,
    }
  );
  


export default model("user" ,  UserSchema  )

