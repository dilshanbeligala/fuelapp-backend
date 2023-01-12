const { verifyToken1 } = require("../utils/verifyToken");
module.exports = function(app) {
    //const { Auth } = require("../middlewares/auth");
    //const { ShedOwner } = require("../middlewares/shedowner");

    const ShedOwnerController = require("../controllers/ShedOwnerController");
    
    app.post("/create_service",[verifyToken1],ShedOwnerController.createService);
    app.get("/services",[verifyToken1],ShedOwnerController.getAllServices);
    app.get("/service/:id", [verifyToken1], ShedOwnerController.getServiceById);
    app.put("/update_service/:id", [verifyToken1], ShedOwnerController.updateService);
    app.delete("/delete_service/:id", [verifyToken1], ShedOwnerController.deleteService);

    app.get("/join_total_vehicles",[verifyToken1],ShedOwnerController.getTotalVehicles);
    app.get("/all_join_vehicles",[verifyToken1],ShedOwnerController.getAllJoinVehicles);

    app.get("/total_vehicles_exit_before",[verifyToken1],ShedOwnerController.getTotalVehiclesExitBefore);
    app.get("/total_vehicles_exit_after",[verifyToken1],ShedOwnerController.getTotalVehiclesExitAfter);
    app.get("/vehicles_exit_before",[verifyToken1],ShedOwnerController.getVehiclesExitBefore);
    app.get("/vehicles_exit_after",[verifyToken1],ShedOwnerController.getVehiclesExitAfter);

    app.get("/current_vehicles_queue",[verifyToken1],ShedOwnerController.currentVehiclesInFuelQueue);
    //app.get("/fuel_queue_status_vehicle_type")
    
//     app.delete("/shedowner/:id",ShedOwnerController.DeleteShedOwner);
//     app.get("/shedowner/:id",ShedOwnerController.ShedOwnerID);
//     app.get("/shedownerss",ShedOwnerController.ShedOwners);
};