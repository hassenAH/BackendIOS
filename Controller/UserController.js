import bcrypt from"bcrypt"

import otpGenerator from "otp-generator";
import User from "../Model/User.js"
import sendEmail from "../middleware/nodemail.js"
import Token from "../Model/Token.js";
import crypto from "crypto"

import Document from "../Model/Document.js"
import Pack from "../Model/Pack.js"
import verifymail from "../Controller/template/templates.js"
import resetpassword from "../Controller/template/codetemplate.js"

import imagesToPdf from "images-to-pdf"
import fs from "fs";
import path from "path";

import axios from "axios";
import FormData from "form-data";

import fetch from 'node-fetch';

import  QRCode  from 'qrcode';
import Payement from "../Model/Payement.js";
export async function getQRByUser(req,res)
{
  try {


    var pay = await Payement.find({idUser:req.params.idUser})
    if(pay)
    {
      
      res.status(200).json(pay)
    }else
    res.status(404).json("pack not found")
  } catch (error) {
    console.log("prob");
  }
}
export async function CreateQR(req,res)
{
  var pay = await Payement.create({
    idUser:req.params.idUser,
    image:`${req.params.id}.png`,
    url: `https://api.preprod.konnect.network/api/v2/payments/${req.params.id}`
    
  });

  QRCode.toFile(`./public/QRcode/${req.params.id}.png`, `https://api.preprod.konnect.network/api/v2/payments/${req.params.id}`, {
    color: {
      dark: '#000000 ',  // Blue dots
      light: '#0000' // Transparent background
    }
  }, function (err) {
    if (err) throw err
    res.status(200).json(pay)
  })
}
export async function Pay(req , res){
const body = {receiverWalletId: "6398f7a008ec811bcda49054",amount : req.body.prix,token : "TND",type : "immediate",
description: "payment description",
lifespan: 10,
feesIncluded: true,
firstName: req.body.first_name,
lastName: req.body.last_name,
phoneNumber: "22777777",
email: req.body.email,
orderId: "1234657",
webhook: "https://merchant.tech/api/notification_payment",
silentWebhook: true,
successUrl: "https://dev.konnect.network/gateway/payment-success",
failUrl: "https://dev.konnect.network/gateway/payment-failure",
checkoutForm: true,
acceptedPaymentMethods: [
"wallet",
"bank_card",
"e-DINAR"
]  };

const response = await fetch('https://api.preprod.konnect.network/api/v2/payments/init-payment', {
	method: 'post',
	body: JSON.stringify(body),
	headers: {'Content-Type': 'application/json','x-api-key': '6398f7a008ec811bcda49053:9v1o3O7FjyG1KbjfVFw0D'}
});
const data = await response.json();
console.log(data);
res.status(200).json({message : "payment avec succe??s",data});

}


export async function RegisterUser(req , res){
 
 try {
    // Get user input
    var { first_name , last_name, email , password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }
    

    // check if user already exist
    // Validate if user exist in our database
    var oldUser = await User.findOne({email});

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    
   var  encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    var user = await User.create({
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

  

    var message = `http://172.17.5.29:5000//user/verify/${user.id}`;
    var name = user.first_name+" "+user.last_name;
    var v = await verifymail(name,message);
      await sendEmail(user.email, "Verify Email", v);
      res.status(200).json({message : "ajout avec succe??s",user});
      
    // return new user
    
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};
export async function verify(req,res){
  try {
    var user = await User.findOne({ _id: req.params.id });
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
  var {email , password } = req.body;


  // Validate user input
  if (! (email && password) ) {
    res.status(400).send("All input is required");
  }
    // Validate if user exist in our database
    var user = await User.findOne({ email: email.toLowerCase() });
  
   if(user.verified)
   {
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      
      let token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
        

      user.token=token;
     
     
     
      res.status(200).json({message : "login avec succe??s",user});
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

  var  { first_name , last_name, email } = req.body;
 
  var user = await User.findOne({ _id: req.params.id });
  
  user.last_name= last_name;
  user.first_name= first_name;
  user.email=email
 
  user.image=`${req.file.filename}`
  user.save() 
    
  
  res.status(200).json({message : "update avec succe??s",user});
   
   // res.status(404).json("Not found ")
   const inputPath =  `./public/images/${req.file.filename}`;
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
          'X-Api-Key': 'TgQuX1rdS5DmN66vcW6MCiLw',
        },
        encoding: null
      })
      .then((response) => {
        if(response.status != 200) return console.error('Error:', response.status, response.statusText);
        fs.writeFileSync(`./public/images/${req.file.filename}`, response.data);
      })
      .catch((error) => {
          return console.error('Request failed:', error);
      });
    
    
}
export async function UpdateAvocat(req,res){

  var  specialite = req.body.categorie;
  var experience=req.body.experience;
  var loc = req.body.location;
  var user = await User.findOne({ _id: req.params.id });
  
  user.location = loc;
  user.experience= experience
  user.specialite = specialite
  user.role="Avocat"
  user.save()
  /*var id = user.id
  var d = `${req.file.fieldname}`+ '-' + Date.now()+".pdf"
  var role = user.role
  var doc = await Document.create({
    idUser:id,
    role:role,
    image:d,
  });
  await imagesToPdf([`./public/images/${req.file.filename}`], `./public/Document/Avocat/${d}`)
       
  fs.unlinkSync(`./public/images/${req.file.filename}`);*/

  
  res.status(200).json({message : "update avec succe??s",user});
  
   
   // res.status(404).json("Not found ")
    
    
}


export async function UpdateSignature(req,res){

 

  var user = await User.findOne({ _id: req.params.id });
  
  
  user.signature= `${req.file.filename}`

  user.save()
    
  
  res.status(200).json({message : "update avec succe??s",user});
  const inputPath =  `./public/images/${req.file.filename}`;
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
      'X-Api-Key': 'TgQuX1rdS5DmN66vcW6MCiLw',
    },
    encoding: null
  })
  .then((response) => {
    if(response.status != 200) return console.error('Error:', response.status, response.statusText);
    fs.writeFileSync(`./public/signature/${req.file.filename}`, response.data);
  })
  .catch((error) => {
      return console.error('Request failed:', error);
  });

   // res.status(404).json("Not found ")
    
    
}
export async function addDocumentAvocat(req,res){

 

  var user = await User.findOne({ _id: req.params.id });
  if(user)
  {
    var id = req.params.id
    var d = `${req.file.fieldname}`+ '-' + Date.now()+".pdf"
    var role = req.body.role
    var doc = await Document.create({
      idUser:id,
      role:role,
      image:d,
    });
    
    

    
    await imagesToPdf([`./public/images/${req.file.filename}`], `./public/Document/Avocat/${d}`)
       
    fs.unlinkSync(`./public/images/${req.file.filename}`);
  
  
  res.status(200).json({message : "update avec succe??s",doc});
  }
   
   // res.status(404).json("Not found ")
    
    
}
export async function addDocumentUser(req,res){

 

  var user = await User.findOne({ _id: req.params.id });
  if(user)
  {
    var id = req.params.id
    var d = `${req.file.fieldname}`+ '-' + Date.now()+".pdf"
    var role= req.body.role
    var doc = await Document.create({
      idUser:id,
      role:role,
      image:d,
    });
    

    
    await imagesToPdf([`./public/images/${req.file.filename}`], `./public/Document/User/${d}`)
       
    fs.unlinkSync(`./public/images/${req.file.filename}`);
  
  
  res.status(200).json({message : "update avec succe??s",doc});
  }
   
   // res.status(404).json("Not found ")
    
    
}
export async function FindSignature(req,res){

  var user = await User.findOne({ _id: req.params.id });
  if(user)
  {
   
    
      res.status(200).json(user.signature)
  }
   
   // res.status(404).json("Not found ")
}
export async function FindDocs(req,res){

  var user = await User.findOne({ _id: req.params.id });
  if(user)
  {
    var id = req.params.id
   
    var dos = await Document.find({idUser: id})
    try{

    
    if(dos)
    {
      res.status(200).json(dos)
    }else
    res.status(404).json("user dont have docs")
  } catch (error) {
    console.log(error);
  }
  }

   
   // res.status(404).json("Not found ")
}
export async function FindPacks(req,res){

  var user = await User.findOne({ _id: req.params.id });
  if(user)
  {
    var id = req.params.id
   
    var pack = await Pack.find({idUser: req.params.id})
    try{


    
    if(pack)
    {
      res.status(200).json(pack)
    }else
    res.status(404).json("user dont have docs")
  } catch (error) {
    console.log(error);
  }
  }

   
   // res.status(404).json("Not found ")
}
export async function DeleteDocument(req,res){

 

  var user = await User.findOne({ _id: req.params.id });
  if(user)
  {
    var doc = await Document.findOne({idUser: req.params.id })
    fs.unlinkSync( `./public/Document/${doc.image}`);
    doc.remove()
       
    
  
  
  res.status(200).json({message : "delete avec succe??s"});
  }
 

   
   // res.status(404).json("Not found ")
    
    
}
export async function DeleteSignature(req,res){

 

  var user = await User.findOne({ _id: req.params.id });
  if(user)
  {
    
    fs.unlinkSync( `./public/signature/${user.signature}`);
    user.signature=""
    user.save()
       
    
  
  
  res.status(200).json({message : "delete avec succe??s"});
  }
 

   
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
      user.code = a;
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

      

      var  avocat = await User.find({role: "Avocat"})
      if(avocat)
      {
       
       
        res.status(200).json(avocat);
        
      }else
      res.status(404).json("no avocat")
    } catch (error) {
      console.log(error);
    }


  }
  export async function GetAvocatByCategorie(req,res){
  
  
    try {

      

      var user = await User.find({specialite: req.params.categorie.replace(/[A-Z]/g, ' $&').trim()
    })
      if(user)
      {
      
        res.status(200).json(user)
      }else
      res.status(404).json("user not found")
    } catch (error) {
      console.log(error);
    }


  }




  import SerpApi from 'google-search-results-nodejs';

  
  export async function GetNews(req,res){
  try
  {
    const search = new SerpApi.GoogleSearch("aaae70677064094c90653046e24d46d83c5eb1625785ccc88fb9433ca5771963");
  
    const params = {
      q: "article+juridique+tunisie",
      tbm: "nws",
      location: "Tunisia"
    };
    
    const callback = function(data) {
      console.log(data["news_results"]);
      res.status(200).json(data["news_results"])
    };
    
    // Show result as JSON
    search.json(params, callback)
    

    

  }
  catch(err)
  {
    
  }
  
   

  }
  export async function GetNew(req,res){
    

    var a =req.body.search;    
  
    const search = new SerpApi.GoogleSearch("aaae70677064094c90653046e24d46d83c5eb1625785ccc88fb9433ca5771963");
  
  const params = {
    q: a,
    tbm: "nws",
    location: "Tunisia"
  };
  
  const callback = function(data) {
    console.log(data["news_results"]);
    res.status(200).json(data["news_results"])
  };
  
  // Show result as JSON
  search.json(params, callback)



  }