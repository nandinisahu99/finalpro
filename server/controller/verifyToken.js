const jwt=require("jsonwebtoken");

const verifyToken=async (req, res, next)=>{
    try{
        let bearerHeader= req.header("Authorization")
        if(!bearerHeader) return res.status(403).json({msg:"Access denied"})

        let temp=bearerHeader.split(" ");
        let token=temp[1];
        const verified=jwt.verify(token, process.env.JWT_SECRET);
        req.user=verified;
        next();


    }
    catch(err){
        res.status(500).json(err.message);
    }
}

module.exports=verifyToken;