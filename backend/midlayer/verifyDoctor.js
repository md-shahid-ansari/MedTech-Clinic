import jwt from "jsonwebtoken";

export const verifyDoctor = (req,res,next) => {
    const token = req.cookies.doctorToken;
    try {
        if(!token){
            return res.status(401).json({success:false,message:"Unauthorized - no token provided"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({success:false,message:"Unauthorized - invalid token"})
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("Error in verify token :" , error);
        res.status(500).json({success:false,masseage:"Error in verify token"});
    }
}