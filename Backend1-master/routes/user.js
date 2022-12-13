const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usercntrlr = require('../controllers/user')

// Token Verification

const verifyToken = (req, res, next) => {
   
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }

    const token = req.headers.authorization;
    // console.log('splitter Value :',token);
    if (token === null) {
        return res.status(401).send('Unauthorized request');
    }
    jwt.verify(token,'secretkey',(err,payLoad)=>{
        if(err){
            return res.status(401).send('Unauthorized request');
        }
        req.payload=payLoad
        next();
    })
    
   

}
// function verifytoken(req, res, next) {
//     if (!req.headers.authorization) {
//         return res.status(401).send('Unauthorised Request')
//     }
//     let token = req.headers.authorization.split(' ')[1]
//     if (token == 'null') {
//         return res.status(401).send('Unauthorised Request')
//     }
//     let payload = jwt.verify(token, 'secretKey')
//     console.log(payload)
//     if (!payload) {
//         return res.status(401).send('Unauthorised Request')
//     }
//     req.role = payload.subject
//     next()
// }

//read user list 
router.get('/userlist',  usercntrlr.getAllUser)

// read single user detail
router.get('/user/:id', usercntrlr.getOneUser)

// add new user
router.post('/user',  usercntrlr.addUser)

// update user detail
router.put('/user',  usercntrlr.updateUser)

// delete user detail
router.delete('/user/:id',  usercntrlr.deleteUser)


// Login Api
router.post('/login', usercntrlr.login);





module.exports = router;