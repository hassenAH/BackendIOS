import bcrypt from"bcrypt"
import jwt from "jsonwebtoken"
import otpGenerator from "otp-generator";
import User from "../Model/User.js"
import sendEmail from "../middleware/nodemail.js"
import Token from "../Model/Token.js";
import crypto from "crypto"
import verifyToken from "../middleware/auth.js";

import verifymail from "../Controller/template/templates.js"
import resetpassword from "../Controller/template/codetemplate.js"

import fs from "fs";
import path from "path"

import axios from "axios";
import FormData from "form-data";



export async function RegisterUser(req , res){
 
 try {
    // Get user input
    const { first_name , last_name, email , password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }
    

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({email});

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    
   const  encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });


      let token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
        
       
        
        user.token = token

  

    const message = `${process.env.URL}user/verify/${user.id}`;
    const name = user.first_name+" "+user.last_name;
    const v = await verifymail(name,message);
      await sendEmail(user.email, "Verify Email", v);
      res.status(200).json({message : "ajout avec succeés",user});
      
    // return new user
    
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};
export async function verify(req,res){
  try {
    const user = await User.findOne({ _id: req.params.id });
    user.verified = true;
    user.save();
   
   

    res.send("email verified sucessfully");
  } catch (error) {
    console.log("prob");
  }
}




export async function Login(req,res){
  
    
 // Our login logic starts here
 try {
  // Get user input
  const {email , password } = req.body;


  // Validate user input
  if (! (email && password) ) {
    res.status(400).send("All input is required");
  }
    // Validate if user exist in our database
    const user = await User.findOne({ email: email.toLowerCase() });
  
   if(user.verified)
   {
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      
      let token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
        

      user.token=token;
     
     
     
      res.status(200).json({message : "login avec succeés",user});
    }
    
   }else
   {
    res.status(400).json({message : "not found"});
   }
    
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
}
export async function UpdateUser(req,res){

  const  { first_name , last_name, email , password } = req.body;
  const  encryptedPassword = await bcrypt.hash(password, 10);
  const user = await User.findOne({ _id: req.params.id });
  
  user.last_name= last_name;
  user.first_name= first_name;
  user.email=email
  user.password=encryptedPassword
  user.image=`${req.file.filename}`
  user.save()
    
  
  res.status(200).json({message : "update avec succeés",user});
   
   // res.status(404).json("Not found ")
   const inputPath =  `../VersionPe/public/images/${req.file.filename}`;
      const formData = new FormData();
      formData.append('size', 'auto');
      formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));
      
      axios({
        method: 'post',
        url: 'https://api.remove.bg/v1.0/removebg',
        data: formData,
        responseType: 'arraybuffer',
        headers: {
          ...formData.getHeaders(),
          'X-Api-Key': 'VqQpAMgtAzG2NhhLUqSbTACk',
        },
        encoding: null
      })
      .then((response) => {
        if(response.status != 200) return console.error('Error:', response.status, response.statusText);
        fs.writeFileSync(`${req.file.filename}`, response.data);
      })
      .catch((error) => {
          return console.error('Request failed:', error);
      });
    
    
}
export async function UpdateAvocat(req,res){

  var  categorie = req.body.categorie;
  var experience=req.body.experience;
  const user = await User.findOne({ _id: req.params.id });
  
  
  user.experience= experience
  user.specialite = categorie
  user.role="Avocat"
  user.save()
    
  
  res.status(200).json({message : "update avec succeés",user});
   
   // res.status(404).json("Not found ")
    
    
}




export async function resetPass(req,res){
  
  var user = await User.findOne({
    email:req.body.email.toLowerCase()});

    if(!user)
      res.send({
        msg:'user not found'
      })
    
      var a = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
      user.code=a;
      user.save();
      var message =user.code;
      const name = user.first_name+" "+user.last_name;
    const v = await resetpassword(name,message);
       sendEmail(user.email, "Reset Password Email", v);
      
      res.send({
        msg:'email sent'
      })
      
    
    
    

}
export async function forgetPass(req,res){
  try {
    const user = await User.findOne({ code:req.body.code });
    if(user)
    {
      
      res.status(200).json("code valide ")
    }
    else
    [
      res.status(400).json("invalide code ")
    ]
    
   
   

    
  } catch (error) {
    console.log(error);
  }
}
export async function changepass(req,res){
  try {
    const user = await User.findOne({ email:req.body.email.toLowerCase() });
    if(user)
    {
      
      var password=req.body.password;
      const  encryptedPassword = await bcrypt.hash(password, 10);
      user.password=encryptedPassword;
      user.code="";
      user.save();
      res.send("password change sucessfully");
    }
    
   
   

    
  } catch (error) {
    console.log(error);
  }
}





export async function deleteUser(req,res){
  
    
      try {
        const  id=req.params.id;
  
        var user = await User.findOne({_id:id})
        if(!user)
        res.status(404).json("User not found")

        user.remove();
        res.status(200).json("Utulisateur Supprime")
      } catch (error) {
        console.log("prob");
      }
  
}
export async function GetUser(req,res){
  
  
    try {

      const  id=req.params.id;

      var user = await User.findOne({_id:id})
      if(user)
      {
        res.send(user)
        res.status(200).json(user)
      }else
      res.status(404).json("user not found")
    } catch (error) {
      console.log("prob");
    }


  }
  export async function GetallAvocat(req,res){
  
  
    try {

      

      var user = await User.find({role:"Avocat"})
      if(user)
      {
        res.send(user)
        res.status(200).json(user)
      }else
      res.status(404).json("user not found")
    } catch (error) {
      console.log(error);
    }


  }
  export async function GetAvocatByCategorie(req,res){
  
  
    try {

      

      var user = await User.find({specialite: req.body.categorie})
      if(user)
      {
        res.send(user)
        res.status(200).json(user)
      }else
      res.status(404).json("user not found")
    } catch (error) {
      console.log(error);
    }


  }




