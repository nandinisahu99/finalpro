const db=require("../model/db.js");

const firstlogin= async(req,res)=>{
    try{
        const {roll}=req.body;
        let result;
        console.log(roll)
        db.query(`select selected as logincount from candidates where roll=${roll}`,async(err, results)=>{
            if(err){
                console.log(err);
                return res.json({selected:false});
            }  
            result=results[0].logincount;
            if(results[0].logincount==0){
                db.query(`update candidates set selected=1 where roll=${roll}`, async(err)=>{
                    if(err){
                        return res.json({err});
                    }
                });
                db.query(`update candidates set selected=1,starttime=CURRENT_TIMESTAMP where roll=${roll}`, async(err)=>{
                    if(err){
                        return res.json({err});
                    }
                });
                return res.json({message:"success", selected: true})
            }else{
                return res.json({message:"You have already Participated", selected: false});
            }
        })   
    }
    catch(err){
        console.log(err);
        res.json({err});
    }
}
module.exports=firstlogin;