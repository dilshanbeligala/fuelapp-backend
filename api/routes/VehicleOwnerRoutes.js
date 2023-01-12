const { verifyToken } = require("../utils/verifyToken");
module.exports = function(app) {

    const VehicleOwnerController = require("../controllers/VehicleOwnerController");
    
    app.get("/services",[verifyToken],VehicleOwnerController.getAllServices);
    app.get("/service/:id", [verifyToken], VehicleOwnerController.getServiceById);

    app.get("/shed_owner/:id",[verifyToken], VehicleOwnerController.viewShedOwnerById);
    app.post("/search_services", [verifyToken], VehicleOwnerController.searchServices);

    app.post("/join_queue",[verifyToken], VehicleOwnerController.joinQueue);

    app.post("/exit_queue_before_fuel_pump",[verifyToken],VehicleOwnerController.exitQueueBeforeFuelPump);
    
    app.post("/exit_queue_after_fuel_pump",[verifyToken],VehicleOwnerController.exitQueueAfterFuelPump);


    // app.put("/vehicleowner/:id",VehicleOwnerController.UpdateVehicleOwner);
    // app.delete("/vehicleowner/:id",VehicleOwnerController.DeleteVehicleOwner);
    // app.get("/vehicleowner/:id",VehicleOwnerController.VehicleOwnerID);
    // app.get("/vehicleowners" ,VehicleOwnerController.VehicleOwners);
};