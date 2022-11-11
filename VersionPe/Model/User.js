import mongoose from"mongoose" ;
import bodyparser from"body-parser" ;
import express from"express";
import Joi from 'joi';

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
        required:true
       
      },
      email: {
        type: String,
        required:true
      },
      password:{
        type: String,
        required:true
      },
      code :
      {
        type: String
      },
      image :
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
  export function userValidate(user){
    const schema = Joi.object({
       first_name: Joi.string().min(3).max(10).required(),
       last_name: Joi.string().min(3).max(10).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required()
    });

    return schema.validate(user);
}


export default model("user" ,  UserSchema  )

