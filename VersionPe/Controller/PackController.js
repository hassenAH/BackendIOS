
import Pack from "../Model/Pack.js"




export async function addPack(req , res){
 
 try {
    
    var name  = req.body.name;
    var decsription= req.body.decsription
    var prix = req.body.prix
    



    // Create user in our database
    const pack = await Pack.create({
      name,
      decsription,
      prix
    });
    
      res.status(200).json({message : "ajout avec succeés",pack});
      

    
  } catch (err) {
    console.log(err);
  }
  
};



export async function UpdatePack(req,res){

  const  { name,decsription,prix } = req.body;
  
  const pack = await Pack.findOne({ _id: req.params.id });
  pack.name= name;
 
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
        res.send(pack)
        res.status(200).json(pack)
      }else
      res.status(404).json("user not found")
    } catch (error) {
      console.log("prob");
    }

}




