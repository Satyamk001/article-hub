require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    console.log('authheader :  ',authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        res.send(403).send({message: " error in token "}); // res.status(400) requires you to explicitly send the response body using methods like res.send() or res.json().
    }
    jwt.verify(token,process.env.ACCESS_TOKEN,(err, result)=>{
        if(err){
            res.status(403).send({message: " kadbad "})
            //res.sendStatus(403); // Automatically sends the default response body associated with the 400 status code ("Bad Request").
        }
        res.locals = result;
        next();
       
    })

}

module.exports = {authenticateToken : authenticateToken};