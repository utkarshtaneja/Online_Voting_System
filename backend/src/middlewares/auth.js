const jwt = require('jsonwebtoken')
const Register = require('../models/register')

const auth = async(req,res,next) => {
try{
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token , "qwertyuioplkjhgfdsazxcvbnmhfiuyd");
    

    const user = await Register.findOne({ _id:verifyUser._id});
    req.token = token;
    req.user = user;
    next();

}catch(e){
res.status(400).send('Login to access this page');
}

}

module.exports = auth;