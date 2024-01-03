const db=require("../model/db.js");

const Final= async(req,res)=>{
    try{
        const {roll}=req.body;
        let result;
        
        db.query("select count(*) as finalcount from candidates where selected=3",async(err, results)=>{
            if(err){
                console.log(err);
                return res.json({selected:false});
            }  
            result=results[0].finalcount;
            if(results[0].finalcount<3){
                    db.query(`update candidates set win=CURRENT_TIMESTAMP where roll=${roll}`, async(err)=>{
                    if(err){
                        return res.json({err});
                    }
                });
                
                return res.json({message:"Congratulations you successfully cleared the challenges", selected: true})
            }else{
                return res.json({message:"Unfortunately you are fail to save jerry!!", selected: false});
            }
        })   
    }
    catch(err){
        console.log(err);
        res.json({err});
    }
}
module.exports=Final;