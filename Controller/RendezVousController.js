
import RendezVous from "../Model/RendezVous.js"




export async function addRendezVous(req , res){
 
 try {
    
    var name  = req.body.name;
    var date= req.body.date

    



    // Create user in our database
    var c = await RendezVous.create({
      name,
      date
    });
    
      res.status(200).json({message : "ajout avec succeés",c});
      

    
  } catch (err) {
    console.log(err);
  }
  
};



export async function UpdateRendezVous(req,res){

  const  { name,date } = req.body;
  
  var c = await RendezVous.findOne({ _id: req.params.id });
  c.name= name;
 
  c.date=date;
  
  c.save()
    
  
  res.status(200).json({message : "update avec succeés",c});
   
   // res.status(404).json("Not found ")
    
    
}

export async function deleteRendezVous(req,res){
  
    
      try {
        const  id=req.params.id;
  
        var c = await RendezVous.findOne({_id:id})
        if(!c)
        res.status(404).json("RendezVous not found")

        c.remove();
        res.status(200).json("RendezVous Supprime")
      } catch (error) {
        console.log("prob");
      }
  
}
export async function GetRendezVous(req,res){
  
  
    try {

      const  id=req.params.id;

      var c = await RendezVous.findOne({_id:id})
      if(c)
      {
        res.send(c)
        res.status(200).json(c)
      }else
      res.status(404).json("RendezVous not found")
    } catch (error) {
      console.log("prob");
    }

}
export async function GetALLRendezVous(req,res){
  
  
    try {


      var c = await RendezVous.find({})
      if(c)
      {
        res.send(c)
        res.status(200).json(c)
      }else
      res.status(404).json("RendezVous not found")
    } catch (error) {
      console.log("prob");
    }

}




