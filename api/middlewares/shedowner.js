// // const { ShedOwner } = require("../models/ShedOwnerModel");
// const UseRole = require('../enums/UseRole');

// const { ShedOwner } = require("../models/ShedOwnerModel");

// const ShedOwner = (req, res, next) => {
//     let token = req.header('x-access-token') || req.header('authorization');

//     if(token) {
//         if(token.startsWith('Bearer')) {
//             token = token.slice(7, token.length);
//         }

//         User.findByToken(token, (err, shedowner) => {
//             if (err) throw err;

//             console.log(shedowner);
//             if (shedowner.role != UseRole.SHEDOWNER) {
//                 res.status(403).json({
//                     success: false,
//                     message: "No authorization to access this route!"
//                 });
//             }
            

//             req.token = token;
//             req.shedowner = shedowner;

//             next();
//             if (!shedowner) {
//                 res.status(400).json({
//                     success: false,
//                     message: "No valid token provided!"
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

// module.exports = { ShedOwner };