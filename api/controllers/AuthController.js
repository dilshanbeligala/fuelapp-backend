const { VehicleOwner } = require("../models/VehicleOwnerModel");
const {ShedOwner}=require("../models/ShedOwnerModel");

exports.registerVehicleOwner = (req,res)=>{
    const vehicleowner = new VehicleOwner(req.body);

    vehicleowner.save((err,doc)=>{
        if(err){
            return res.status(422).json({
                success:false,
                message:"Registration failed, Check the validation errors!",
                data:err
            });
        }else{
            return res.status(200).json({
                success:true,
                message:"Successfully Registered!"
            });
        }
    });
}

exports.loginVehicleOwner=(req,res)=>{
    VehicleOwner.findOne({email:req.body.email},(err,vehicleowner)=>{
        if(!vehicleowner){
            return res.status(404).json({
                success:false,
                message:"User email not found!"
            });
        }
        vehicleowner.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch){
                return res.status(400).json({
                    success:false,
                    message:"Password is incorrect!"
                });
            }
            vehicleowner.generateToken((err,token)=>{
                if(err){
                    return res.status(400).json({
                        success:false,
                        message:"Unable to generate jwt key!",
                        data:err
                    });
                }
                return res.status(200).json({
                    success:true,
                    message:"Successfully Logged In!",
                    data:{
                        "token":token
                    }
                });
            });
            
        });
    });
}

exports.getVehicleOwnerDetails= (req, res) => {
    res.json({status: true, message: "User Received!", data: req.vehicleowner});
};

//shedowner
exports.registerShedOwner = (req,res)=>{
    const shedowner = new ShedOwner(req.body);

    shedowner.save((err,doc)=>{
        if(err){
            return res.status(422).json({
                success:false,
                message:"Registration failed, Check the validation errors!",
                data:err
            });
        }else{
            return res.status(200).json({
                success:true,
                message:"Successfully Registered!"
            });
        }
    });
}

exports.loginShedOwner=(req,res)=>{
    ShedOwner.findOne({email:req.body.email},(err,shedowner)=>{
        if(!shedowner){
            return res.status(404).json({
                success:false,
                message:"User email not found!"
            });
        }
        shedowner.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch){
                return res.status(400).json({
                    success:false,
                    message:"Password is incorrect!"
                });
            }
            shedowner.generateToken((err,token)=>{
                if(err){
                    return res.status(400).json({
                        success:false,
                        message:"Unable to generate jwt key!",
                        data:err
                    });
                }
                return res.status(200).json({
                    success:true,
                    message:"Successfully Logged In!",
                    data:{
                        "token":token
                    }
                });
            });
            
        });
    });
}

exports.getShedOwnerDetails= (req, res) => {
    res.json({status: true, message: "User Received!", data: req.shedowner});
};