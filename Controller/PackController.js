
import Pack from "../Model/Pack.js"
import User from "../Model/User.js"



export async function addPack(req , res){
 
 try {
  var user = await User.findOne({ _id: req.body.id });
  if(user)
  {
    var id = req.body.id
    
    var name  = req.body.name;
    var description= req.body.description
    var prix = req.body.prix
    
    var title = req.body.title


    // Create user in our database
    const pack = await Pack.create({
      name:name,
      idUser:id,
      title:title,
      prix:prix,
      description:description,
    });
    
      res.status(200).json({message : "ajout avec succeés",pack});
      

 
  }   
} catch (err) {
  console.log(err);
}
    
  
};



export async function UpdatePack(req,res){

  
  const  { name,decsription,prix } = req.body;
  var title = req.body.title
  const pack = await Pack.findOne({ _id: req.params.id });
  pack.name= name;
 pack.title= title;
  pack.decsription=decsription;
  pack.prix=prix;
  pack.save()
    
  
  res.status(200).json({message : "update avec succeés",pack});
   
   // res.status(404).json("Not found ")
    
    
}

export async function deletepack(req,res){
  
    
      try {
        const  id=req.params.id;
  
        var pack = await Pack.findOne({_id:id})
        if(!pack)
        res.status(404).json("categorie not found")

        pack.remove();
        res.status(200).json("categorie Supprime")
      } catch (error) {
        console.log("prob");
      }
  
}
export async function Getpack(req,res){
  
  
    try {

      const  id=req.params.id;

      var pack = await Pack.findOne({_id:id})
      if(pack)
      {
        res.send(pack)
        res.status(200).json(pack)
      }else
      res.status(404).json("user not found")
    } catch (error) {
      console.log("prob");
    }

}
export async function GetALLpack(req,res){
  
  
    try {


      var pack = await Pack.find({})
      if(pack)
      {
        
        res.status(200).json(pack)
      }else
      res.status(404).json("pack not found")
    } catch (error) {
      console.log("prob");
    }

}




