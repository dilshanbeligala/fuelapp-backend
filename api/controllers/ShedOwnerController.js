const { Service } = require("../models/ServiceModel");
const { JoinQueue } = require("../models/JoinQueueModel");
const { ExitQueueBeforeFuelPump } = require("../models/ExitQueueBeforeFuelPumpModel");
const { ExitQueueAfterFuelPump } = require("../models/ExitQueueAfterFuelPumpModel");

exports.createService = async (req, res) => {
    var newService = new Service(req.body);

   // newService.shedowner = req.vehicleowner._id;

    await newService.save((err, service) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to create service!",
                data: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "New service is created!",
                data: service
            });
        }
    });
};

exports.getAllServices = async (req, res) => {
    Service.find(function(err, services) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to retrive services!",
                data: err
            });
        }
    
        return res.status(200).json({
            success: true,
            message: "Received services!",
            data: services
        });
    });
};

exports.getServiceById = async (req, res) => {
    Service.findById(req.params.id, async function(err, service) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid service id!"
            });
        }

        if(!service) {
            return res.status(422).json({
                success: false,
                message: "Invalid service id!"
            });
        }

        return res.status(422).json({
            success: true,
            message: "Service received!",
            data: service
        });
    });
};

exports.updateService = async (req, res) => {
    Service.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, service) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid service id!"
            });
        }

        if(!service) {
            return res.status(422).json({
                success: false,
                message: "Invalid service id!"
            });
        }

        return res.status(422).json({
            success: true,
            message: "Service updated!",
            data: service
        });
    });
};

exports.deleteService = async (req, res) => {
    Service.remove({_id: req.params.id}, function(err, service) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid service id!"
            });
        }

        return res.status(422).json({
            success: true,
            message: "Service deleted!"
        });
    });
};
//{ _id: req.params.id }
exports.getTotalVehicles = async (req, res) => {
    JoinQueue.estimatedDocumentCount(function (err, count) {
        if (err){
            return res.status(422).json({
                success: false,
                message: "Unable to retrive services!",
                data: err
            });
        }
      
        return res.status(200).json({
            success: true,
            message:`Total vehicles are ${count} in the fuel queue!`,
            data: count   
        });
    });
};

exports.getAllJoinVehicles = async (req, res) => {
    JoinQueue.find(function(err, join_queue) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to retrive join vehicles!",
                data: err
            });
        }
    
        return res.status(200).json({
            success: true,
            message: "Received join vehicles!",
            data: join_queue
        });
    });
};

exports.getVehiclesExitBefore = async (req, res) => {
    ExitQueueBeforeFuelPump.find(function(err, join_queue_exit_before) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to retrive exit vehicles before fuel pump!",
                data: err
            });
        }
    
        return res.status(200).json({
            success: true,
            message: "Received exit vehicles before fuel pump!",
            data: join_queue_exit_before
        });
    });
};


exports.getVehiclesExitAfter = async (req, res) => {
    ExitQueueAfterFuelPump.find(function(err, join_queue_exit_after) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to retrive exit vehicles after fuel pump!",
                data: err
            });
        }
    
        return res.status(200).json({
            success: true,
            message: "Received exit vehicles after fuel pump!",
            data: join_queue_exit_after
        });
    });
};
//getTotalVehiclesExitBefore
exports.getTotalVehiclesExitBefore = async (req, res) => {
    ExitQueueBeforeFuelPump.estimatedDocumentCount(function (err, count) {
        if (err){
            return res.status(422).json({
                success: false,
                message: "Unable to retrive before exit total vehicles!",
                data: err
            });
        }
      
        return res.status(200).json({
            success: true,
            message:`Total vehicles are ${count} exit before fuel pump!`,
            data: count   
        });
    });
};
exports.getTotalVehiclesExitAfter = async (req, res) => {
    ExitQueueAfterFuelPump.estimatedDocumentCount(function (err, count) {
        if (err){
            return res.status(422).json({
                success: false,
                message: "Unable to retrive after exit total vehicles!",
                data: err
            });
        }
      
        return res.status(200).json({
            success: true,
            message:`Total vehicles are ${count} exit after fuel pump!`,
            data: count   
        });
        
    });
};
//currentVehiclesInFuelQueue
exports.currentVehiclesInFuelQueue= async(req,res)=>{
    var currentvehiclesinfuelqueue=JoinQueue.estimatedDocumentCount()-(ExitQueueBeforeFuelPump.estimatedDocumentCount()+ExitQueueAfterFuelPump.estimatedDocumentCount());
    return res.status(200).json({
        success:true,
        message:`Current vehicles in fuel queue is ${currentvehiclesinfuelqueue}`
    });
};