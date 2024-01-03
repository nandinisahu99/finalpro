const db=require("../model/db.js");

const sendToken=async(req, res)=>{
 const token=Math.round(Math.random()*1000000);
 try{
    const {roll}=req.body;

    db.query(`update candidates set token=${token} where roll=${roll}`, async(err)=>{
        if(err){
            return res.json({err});
        }
    })
    return res.json({token})
 }
 catch(err){
    throw(err);
 }

}

module.exports=sendToken;