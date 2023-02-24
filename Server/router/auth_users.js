const express = require('express')
const app = express();
const auth_users = express.Router();
const jwt = require('jsonwebtoken');

let users=[];
const isValid = (telnumber)=> {
    let userswithsamenumber = users.filter((user)=> {
        return user.telnumber === telnumber
    })
    if(userswithsamenumber.length > 0){
        return true
    } else {
        return false
    }
}

const authenticatedUser = (telnumber,password)=> {
    let validUsers = users.filter((user) => {
        return user.telnumber === telnumber && user.password === password;
    })
    if(validUsers.length > 0){
        return true;
    } else {
        return false;
    }
}

auth_users.post('/login', (req,res) => {
    console.log(req.body.telnumber)
    console.log(req.body.password)
    const telnumber = req.body.telnumber;
    console.log(telnumber)
    const password = req.body.password;
    if(!telnumber || !password) {
        return res.status(404).json({message: "Error logging in!"})
    }
    if(authenticatedUser(telnumber,password)){
        let accessToken = jwt.sign({
            data:password
        }, 'access', {expiresIn: 60 * 60});
        req.session.authorization = {
            accessToken,telnumber
        }
        console.log(accessToken)
        return res.redirect("http://localhost:8080/")
    } else {
        return res.status(208).json({message: "Invalid Login. Check telephone number or password!"})
    }
})

module.exports.authenticated = auth_users;
module.exports.isValid = isValid;
module.exports.users = users;