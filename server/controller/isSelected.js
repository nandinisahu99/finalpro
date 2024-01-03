const db=require("../model/db.js");

const isSelected= async(req,res)=>{
    try{
        const {roll}=req.body;
        let result;
        
        db.query("select count(*) as namecount from candidates where selected=2",async(err, results)=>{
            if(err){
                console.log(err);
                return res.json({selected:false});
            }  
            result=results[0].namecount;
            if(results[0].namecount<10){
                    db.query(`update candidates set selected=2 where roll=${roll}`, async(err)=>{
                    if(err){
                        return res.json({err});
                    }
                });
                
                return res.json({message:"", selected: true})
            }else{
                return res.json({message:"You have correctly answer the riddles but you were little late therefore Jerry counldn't be saved.", selected: false});
            }
        })   
    }
    catch(err){
        console.log(err);
        res.json({err});
    }
}
module.exports=isSelected;