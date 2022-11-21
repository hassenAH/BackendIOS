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
      image :
      {
        type: String
      },
      code :
      {
        type: String
      },
      role :
      {
        type: String,
        default:"User",
      },
      specialite :
      {
        type: String,
        default:"",
      },
      experience :
      {
        type: Number ,
        default:0,
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

