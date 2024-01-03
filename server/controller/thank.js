const db=require("../model/db.js");

const Final= async(req,res)=>{
    try{
        const {roll}=req.body;
        
        db.query(`update candidates set win=CURRENT_TIMESTAMP where roll=${roll}`, async(err)=>{
            if(err){
                return res.json({selected:false});
            }  
        })  
        return res.json({message:"", selected: true})
    }
    catch(err){
        res.json({err});
    }
}
module.exports=Final;

