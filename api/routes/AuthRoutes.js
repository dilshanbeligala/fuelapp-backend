module.exports = function(app){
    const { Auth } = require("../middlewares/auth");
    //const {Auth1} = require('../middlewares/auth');

    const AuthController = require("../controllers/AuthController");

    app.post("/register_vehicleowner", AuthController.registerVehicleOwner);
    app.post("/login_vehicleowner",AuthController.loginVehicleOwner);
    //app.get("/vehicleowner", AuthController.getVehicleOwnerDetails);

    app.post("/register_shedowner",AuthController.registerShedOwner);
    app.post("/login_shedowner",AuthController.loginShedOwner);
    //app.get("/shedowner", AuthController.getShedOwnerDetails);

}
