
import Categorie from "../Model/Categorie.js"




export async function addCategorie(req , res){
 
 try {
    
    var k  = req.body.name;
    var image = `${req.file.filename}`
    



    // Create user in our database
    const categorie = await Categorie.create({
      k,
      image
    });
    
      res.status(200).json({message : "ajout avec succeés",categorie});
      

    
  } catch (err) {
    console.log(err);
  }
  
};



export async function UpdateCategorie(req,res){

  const  { name } = req.body;
  
  const categorie = await Categorie.findOne({ _id: req.params.id });
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

        user.remove();
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
        res.send(categorie)
        res.status(200).json(categorie)
      }else
      res.status(404).json("user not found")
    } catch (error) {
      console.log("prob");
    }

}




