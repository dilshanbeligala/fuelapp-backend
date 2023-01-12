const jwt = require('jsonwebtoken');
const createError = require( "../utils/error.js");
// require("dotenv").config();

exports.verifyToken = async(req, _res, next)=> {
    const token = await req.header("Authorization");
    if (!token) {
        return  _res.status(400).json({
            sucess: false,
              message: "you are not authenticated"})}

    jwt.verify(token,process.env.SECRETE, async (err, vehicleowner) => {
        if (err)
            return next(createError(403, "Token is not valid!"));
        req.vehicleowner = vehicleowner;
        next();
    });
}

exports.verifyToken1 = async(req, _res, next)=> {
    const token = await req.header("Authorization");
    if (!token) {
        return  _res.status(400).json({
            sucess: false,
              message: "you are not authenticated"})}

    jwt.verify(token,process.env.SECRETE, async (err, shedowner) => {
        if (err)
            return next(createError(403, "Token is not valid!"));
        req.shedowner = shedowner;
        next();
    });
}