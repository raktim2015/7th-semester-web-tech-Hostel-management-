const UserModel = require('../models/users.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.fname = '';
    req.body.lname = '';
    req.body.altEmail = '';
    req.body.enrollId = '';
    req.body.dept = '';
    req.body.code1 = '';
    req.body.phno1 = '';
    req.body.code2 = '';
    req.body.phno2 = '';
    req.body.country = '';
    req.body.state = '';
    req.body.address1 = '';
    req.body.address2 = '';
    req.body.income = undefined;
    req.body.distance = undefined;
    req.body.submittedStatus = 1;
    req.body.idDocName = '';
    req.body.incomeDocName = '';

    
    
    UserModel.createUser(req.body)
    .then((result) => {
        res.status(201).send({id: result._id});
    });
};

exports.checkDuplicates = (req,res,next) => {
    UserModel.findByEmail(req.body.email)
    .then((result) => {
        if(result.length > 0) 
            return res.status(409).send();
        else {
            return next();
        }
        
    })
    .catch((error) => {
        return res.status(400).send();
    })
    
}

exports.list = (req, res) => {
    
    UserModel.list()
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    UserModel.findByEmail(req.params.email)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch(() => {
            return res.status(404).send()
        })
};

exports.patchById = (req, res) => {
    console.log(req.body)
    UserModel.patchUser(req.params.email, req.body)
        .then((result) => {
            console.log(result)
            res.status(204).send({});
        })
        .catch((err) => {
            res.status(404).send();
        })

};

exports.patchAllStatus = (req, res) => {
    req.body.selectedEmailList.map((email) => {
        UserModel.patchUser(email,{submittedStatus: req.body.submittedStatus})
        .then((result) => {
        })
        .catch(()=>{
            console.log("error")
        })
    })

};

exports.removeById = (req, res) => {
    UserModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
};