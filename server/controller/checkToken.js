const db=require("../model/db.js");

const giveAccess=(req, res)=>{

    const {token, roll}=req.body;

    try{
        db.query('select token from candidates where roll= ?',[roll],async(err,result)=>{
            if(err) throw err;
            if(result.length) {
                if(result[0].token==token){
                    return res.json({status: true, message: "correct"});
                }
            }
            else{
                return res.json({status: false, message: "incorrect"});
            }
        })
    }
    catch(err){
        throw(err);
    }
}
module.exports=giveAccess;