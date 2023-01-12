// const { VehicleOwner } = require("../models/VehicleOwnerModel");
// const UseRole = require('../enums/UseRole');


// const VehicleOwner = (req, res, next) => {
//     let token = req.header('x-access-token') || req.header('authorization');

//     if(token) {
//         if(token.startsWith('Bearer')) {
//             token = token.slice(7, token.length);
//         }

//         VehicleOwner.findByToken(token, (err, vehicleowner) => {
//             if (err) throw err;

//             if (!vehicleowner) {
//                 res.status(400).json({
//                     success: false,
//                     message: "No valid token provided!"
//                 });
//             }

//             req.token = token;
//             req.vehicleowner = vehicleowner;

//             next();
//             if (vehicleowner.role != UseRole.VEHICLEOWNER) {
//                 res.status(403).json({
//                     success: false,
//                     message: "No authorization to access this route!"
//                 });
//             }
//             next();
//         });
//     } else {
//         res.status(400).json({
//             success: false,
//             message: "No valid token provided!"
//         });
//     }
// };

// module.exports = { VehicleOwner };