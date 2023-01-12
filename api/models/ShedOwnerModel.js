var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const UseRole=require("../enums/UseRole");
const VehicleType = require('../enums/VehicleType');

const SALT = 10;

var Schema = mongoose.Schema;

var ShedOwnerSchema = new Schema({
    name:{
        type:String,
        required:[true,'Name field is required!'],
        maxlength:100
    },
    email:{
        type:String,
        required:[true,'Email field is required!'],
        unique:true
    },
    phone_number:{
        type:String,
        required:[true,'Phone number field is required!']
    },
    role:{
        type:String,
        enum:UseRole,
        required:[true,'User role field is required!'],
        //default:UseRole.VEHICLEOWNER
    },
    shed_name:{
        type:String,
        required:[true,'Shed Name field is required!'],
        maxlength:100
    },
    city:{
        type:String,
        required:[true,'City field is required!'],
        maxlength:100
    },
    business_license_number:{
        type:String,
        required:false
    }, 
    password:{
        type:String,
        required:[true,'Password field is required!'],
        minlength:5
    },
    create_date:{
        type:Date,
        default:Date.now
    }
});

//Saving user data
ShedOwnerSchema.pre('save',function(next){
    var shedowner=this;
    if(shedowner.isModified('password')){
        //checking if password field is available and modified
        bcrypt.genSalt(SALT,function(err,salt){
            if(err) return next(err)

            bcrypt.hash(shedowner.password,salt,function(err,hash){
                if(err) return next(err)
                shedowner.password=hash;
                next();
            });
        });
    }else{
        next();
    }
});

//For comparing the users entered password with database duing login
ShedOwnerSchema.methods.comparePassword=function(candidatePassword,callBack){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return callBack(err);
        callBack(null,isMatch);
    });
};

//For generating token when loggedin
ShedOwnerSchema.methods.generateToken=function(callBack){
    var shedowner=this;
    var token=jwt.sign(shedowner._id.toHexString(),process.env.SECRETE);

    callBack(null,token);
};

//Validating token for auth routes middleware
ShedOwnerSchema.statics.findByToken=function(token,callBack){
    jwt.verify(token,process.env.SECRETE,function(err,decode){
        //This decode must give user_id if token is valid.ie decode=user_id
        ShedOwner.findById(decode,function(err,shedowner){
            if(err){
                resizeBy.json({status:false,date:"Invalid User ID"});
            }
            callBack(null,shedowner);
        });
    });
};   

const ShedOwner = mongoose.model('ShedOwner',ShedOwnerSchema);
module.exports = {ShedOwner}