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
    req.body.submittedStatus = 1;

    
    
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
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    UserModel.list(limit, page)
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
    UserModel.patchUser(req.params.email, req.body)
        .then((result) => {
            console.log(result)
            res.status(204).send({});
        })
        .catch((err) => {
            res.status(404).send();
        })

};

exports.removeById = (req, res) => {
    UserModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
};