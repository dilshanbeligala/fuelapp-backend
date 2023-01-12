// const { VehicleOwner } = require("../models/VehicleOwnerModel");
// const {ShedOwner } = require("../models/ShedOwnerModel");

// var Auth = (req, res, next) => {
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
//         });
//     } else {
//         res.status(400).json({
//             success: false,
//             message: "No valid token provided!"
//         });
//     }
// };

// module.exports = { Auth };


// var Auth1 = (req, res, next) => {
//     let token = req.header('x-access-token') || req.header('authorization');

//     if(token) {
//         if(token.startsWith('Bearer')) {
//             token = token.slice(7, token.length);
//         }

//         ShedOwner.findByToken(token, (err, shedowner) => {
//             if (err) throw err;

//             if (!shedowner) {
//                 res.status(400).json({
//                     success: false,
//                     message: "No valid token provided!"
//                 });
//             }

//             req.token = token;
//             req.shedowner = shedowner;

//             next();
//         });
//     } else {
//         res.status(400).json({
//             success: false,
//             message: "No valid token provided!"
//         });
//     }
// };

// module.exports = { Auth1 };