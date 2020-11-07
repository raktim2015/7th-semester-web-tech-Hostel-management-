const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: {type: String},
    lname: {type: String},
    email: {type: String, unique: true, required: true, dropDups: true},
    altEmail: {type: String, unique: true, dropDups: true},
    password: {type: String},
    code1: {type: String},
    phno1: {type: String},
    code2: {type: String},
    phno2: {type: String},
    country: {type: String},
    state: {type: String},
    address1: {type: String},
    address2: {type: String},
    enrollId: {type: String},
    dept: {type: String},
    distance: {type: Number},
    income: {type: Number},
    submittedStatus: {type: Number},
    permissionLevel: {type: Number}
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

userSchema.findById = function (cb) {
    return this.model('Users').find({id: this.id}, cb);
};

const User = mongoose.model('Users', userSchema);


exports.findByEmail = (email) => {
    return User.find({email: email})
            .then((result) => {
                delete result._id;
                delete result.__v;
                return result;
            })
};

exports.findById = (id) => {
    return User.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

exports.list = () => {
    return new Promise((resolve, reject) => {
        User.find()
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.patchUser = (email, userData) => {
    return User.findOneAndUpdate({
        email: email
    }, userData);
};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteMany({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

