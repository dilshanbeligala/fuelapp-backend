var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const UseRole=require("../enums/UseRole");
const VehicleType = require('../enums/VehicleType');

const SALT = 10;

var Schema = mongoose.Schema;

var VehicleOwnerSchema = new Schema({
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
    nic:{
        type:String,
        required:[true,'NIC field is required!'],
        maxlength:20
    },
    vehicle_number:{
        type:String,
        required:[true,'Vehicle number field is required!']
    },
    vehicle_type:{
        type:String,
        enum:VehicleType,
        required:[true,'Vehicle type field is required!']
    },
    password:{
        type:String,
        required:[true,'Password field is required!'],
        minlength:5
    },
    role:{
        type:String,
        enum:UseRole,
        required:[true,'User role field is required!'],
        default:UseRole.VEHICLEOWNER
    },
    create_date:{
        type:Date,
        default:Date.now
    }
});

//Saving user data
VehicleOwnerSchema.pre('save',function(next){
    var vehicleowner=this;
    if(vehicleowner.isModified('password')){
        //checking if password field is available and modified
        bcrypt.genSalt(SALT,function(err,salt){
            if(err) return next(err)

            bcrypt.hash(vehicleowner.password,salt,function(err,hash){
                if(err) return next(err)
                vehicleowner.password=hash;
                next();
            });
        });
    }else{
        next();
    }
});

//For comparing the users entered password with database duing login
VehicleOwnerSchema.methods.comparePassword=function(candidatePassword,callBack){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return callBack(err);
        callBack(null,isMatch);
    });
};

//For generating token when loggedin
VehicleOwnerSchema.methods.generateToken=function(callBack){
    var vehicleowner=this;
    var token=jwt.sign(vehicleowner._id.toHexString(),process.env.SECRETE);

    callBack(null,token);
};

//Validating token for auth routes middleware
VehicleOwnerSchema.statics.findByToken=function(token,callBack){
    jwt.verify(token,process.env.SECRETE,function(err,decode){
        //This decode must give user_id if token is valid.ie decode=user_id
        User.findById(decode,function(err,vehicleowner){
            if(err){
                resizeBy.json({status:false,date:"Invalid User ID"});
            }
            callBack(null,vehicleowner);
        });
    });
};   

const VehicleOwner = mongoose.model('VehicleOwner',VehicleOwnerSchema);
module.exports = {VehicleOwner}