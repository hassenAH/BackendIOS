
import Categorie from "../Model/Categorie.js"

import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path"

export async function addCategorie(req , res){
 
 try {
    
    var name  = req.body.name;
    var image = `${req.file.filename}`
    
    

    // Create user in our database
    var categorie = await Categorie.create({
      name,
      image
    });
    
      res.status(200).json({message : "ajout avec succeés",categorie});
      
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
          'X-Api-Key': 'VqQpAMgtAzG2NhhLUqSbTACk',
        },
        encoding: null
      })
      .then((response) => {
        if(response.status != 200) return console.error('Error:', response.status, response.statusText);
        fs.writeFileSync(`.
        
        
        
        
        /public/images/${req.file.filename}`, response.data);
      })
      .catch((error) => {
          return console.error('Request failed:', error);
      });
  
    
  } catch (err) {
    console.log(err);
  }
  
};



export async function UpdateCategorie(req,res){

  const  { name } = req.body;
  
  var categorie = await Categorie.findOne({ _id: req.params.id });
  categorie.name= name;
 
  categorie.image=`${req.file.filename}`
  categorie.save()
    
  
  res.status(200).json({message : "update avec succeés",categorie});
   
   // res.status(404).json("Not found ")
    
    
}

export async function deleteCategorie(req,res){
  
    
      try {
        const  id=req.params.id;
  
        var categorie = await Categorie.findOne({_id:id})
        if(!categorie)
        res.status(404).json("categorie not found")

        categorie.remove();
        res.status(200).json("categorie Supprime")
      } catch (error) {
        console.log("prob");
      }
  
}
export async function GetCategorie(req,res){
  
  
    try {

      const  id=req.params.id;

      var categorie = await Categorie.findOne({_id:id})
      if(categorie)
      {
        
        res.status(200).json(categorie)
      }else
      res.status(404).json("user not found")
    } catch (error) {
      console.log("prob");
    }

}
export async function GetALLCategorie(req,res){
  
  
  try {


    var categorie = await Categorie.find({})
    if(categorie)
    {
      
      res.status(200).json(categorie)
    }else
    res.status(404).json("user not found")
  } catch (error) {
    console.log(error);
  }

}




