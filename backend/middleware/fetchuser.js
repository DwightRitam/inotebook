var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$oy';
const fetchuser=(req,res,next)=>{

    // get the user from authtoken and append the user id from that
    const token=req.header('auth-token')
    if(!token){
        res.status(401).send({error:"please authenticate using proper credentials" })
    }
    try {
        const data= jwt.verify(token,JWT_SECRET)
    req.user=data.user
    next()
    } catch (error) {
        res.status(401).send({error:"please authenticate using proper credentials" })
    }
    
}


module.exports= fetchuser;