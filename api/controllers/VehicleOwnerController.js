const UseRole = require("../enums/UseRole");
const { VehicleOwner } = require("../models/VehicleOwnerModel");
const { Service } = require("../models/ServiceModel");
const { JoinQueue } = require("../models/JoinQueueModel");
const { ExitQueueBeforeFuelPump }=require("../models/ExitQueueBeforeFuelPumpModel");
const { ExitQueueAfterFuelPump } = require("../models/ExitQueueAfterFuelPumpModel");
const { ShedOwner } = require("../models/ShedOwnerModel");

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



exports.searchServices = (req, res) => {
    var searchString = req.body.city;

    if(!searchString) {
        return res.status(422).json({
            success: false,
            message: "Searach term is required!"
        });
    }
    
    Service.find({
        $or: [
            {city: {$regex: searchString, $options: 'i'}}
        ]
    }, function(err, services){
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Error filteting services!",
                data: err
            });
        }

        return res.status(422).json({
            success: true,
            message: "Filtered services!",
            data: services
        });
    });
};

exports.viewShedOwnerById = async (req, res) => {
    ShedOwner.findById(req.params.id, async function(err, shedowner) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid shed owner id!"
            });
        }

        if(!shedowner) {
            return res.status(422).json({
                success: false,
                message: "Invalid shed owner id!"
            });
        }

        if(shedowner.role != UseRole.SHEDOWNER) {
            return res.status(422).json({
                success: false,
                message: "Invalid shed owner id!"
            });
        }
        
        return res.status(422).json({
            success: true,
            message: "Shed Owner received!",
            data: shedowner
        });
    });
};


//join queue
exports.joinQueue = async (req, res) => {
    var newJoinQueue = new JoinQueue(req.body);

    newJoinQueue.shedowner = req.vehicleowner._id;

    await newJoinQueue.save((err, join_queue) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to join the fuel queue!",
                data: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Join the fuel queue!",
                data: join_queue
            });
        }
    });
};



//exit queue
exports.exitQueueBeforeFuelPump = async (req, res) => {
    var newExitQueueBeforeFuelPump = new ExitQueueBeforeFuelPump(req.body);

    newExitQueueBeforeFuelPump.shedowner = req.user._id;

    await newExitQueueBeforeFuelPump.save((err, exit_queue_before) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to exit the fuel queue!",
                data: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Exit the fuel queue!",
                data: exit_queue_before
            });
        }
    });
};
exports.exitQueueAfterFuelPump = async (req, res) => {
    var newExitQueueAfterFuelPump = new ExitQueueAfterFuelPump(req.body);

    newExitQueueAfterFuelPump.shedowner = req.user._id;

    await newExitQueueAfterFuelPump.save((err, exit_queue_after) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to exit the fuel queue!",
                data: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Exit the fuel queue!",
                data: exit_queue_after
            });
        }
    });
};