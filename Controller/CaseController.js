
import Case from "../Model/Case.js"




export async function addCase(req , res){
 
 try {
    
    var title  = req.body.title;
    var description= req.body.description

    var nameUser= req.body.nameUser;
    var LastnameUser= req.body.LastnameUser;
    var Prix= req.body.Prix;




    // Create user in our database
    var c = await Case.create({
      title,
      description,
      nameUser,
      LastnameUser,
      Prix
    });
    
      res.status(200).json({message : "ajout avec succeés",c});
      

    
  } catch (err) {
    console.log(err);
  }
  
};



export async function UpdateCase(req,res){

  const  { title,description,traite,nameUser,LastnameUser,Prix } = req.body;
  
  var c = await Case.findOne({ _id: req.params.id });
  c.Prix=Prix;
  c.title= title;
  c.nameUser= nameUser;
  c.LastnameUser = LastnameUser;
  c.description=description;
  c.traite=traite;
  c.save()
    
  
  res.status(200).json({message : "update avec succeés",c});
   
   // res.status(404).json("Not found ")
    
    
}

export async function deleteCase(req,res){
  
    
      try {
        var  id=req.params.id;
  
        var c = await Case.findOne({_id:id})
        if(!c)
        res.status(404).json("categorie not found")

        c.remove();
        res.status(200).json("categorie Supprime")
      } catch (error) {
        console.log(error);
      }
  
}
export async function GetCase(req,res){
  
  
    try {

      var  id=req.params.id;

      var c = await Case.findOne({_id:id})
      if(c)
      {
        res.send(c)
        res.status(200).json(c)
      }else
      res.status(404).json("user not found")
    } catch (error) {
      console.log(error);
    }

}
export async function GetALLCase(req,res){
  
  
    try {


      var c = await Case.find({})
      if(c)
      {
        
        res.status(200).json(c)
      }else
      res.status(404).json("pack not found")
    } catch (error) {
      console.log(error);
    }

}

export async function GetCasebyUser(req,res){
  
  
  try {

    var a =req.body.nameUser; 
    var b=req.body.LastnameUser;   
    var c = await Case.find({ nameUser:a,LastnameUser:b})
    if(c)
    {
      res.send(c)
      res.status(200).json(c)
    }else
    res.status(404).json("pack not found")
  } catch (error) {
    console.log(error);
  }

}




