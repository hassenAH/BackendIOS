
import Case from "../Model/Case.js"




export async function addCase(req , res){
 
 try {
    
    var title  = req.body.title;
    var description= req.body.description

    



    // Create user in our database
    var c = await Case.create({
      title,
      description
    });
    
      res.status(200).json({message : "ajout avec succeés",c});
      

    
  } catch (err) {
    console.log(err);
  }
  
};



export async function UpdateCase(req,res){

  const  { title,description,traite } = req.body;
  
  var c = await Case.findOne({ _id: req.params.id });
  c.title= title;
 
  c.description=description;
  c.traite=traite;
  c.save()
    
  
  res.status(200).json({message : "update avec succeés",c});
   
   // res.status(404).json("Not found ")
    
    
}

export async function deleteCase(req,res){
  
    
      try {
        const  id=req.params.id;
  
        var c = await Case.findOne({_id:id})
        if(!c)
        res.status(404).json("categorie not found")

        c.remove();
        res.status(200).json("categorie Supprime")
      } catch (error) {
        console.log("prob");
      }
  
}
export async function GetCase(req,res){
  
  
    try {

      const  id=req.params.id;

      var c = await Case.findOne({_id:id})
      if(c)
      {
        res.send(c)
        res.status(200).json(c)
      }else
      res.status(404).json("user not found")
    } catch (error) {
      console.log("prob");
    }

}
export async function GetALLCase(req,res){
  
  
    try {


      var c = await Case.find({})
      if(c)
      {
        res.send(c)
        res.status(200).json(c)
      }else
      res.status(404).json("pack not found")
    } catch (error) {
      console.log("prob");
    }

}




