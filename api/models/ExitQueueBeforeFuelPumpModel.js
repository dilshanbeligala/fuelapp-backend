var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ExitQueueBeforeFuelPumpModelSchema=new Schema({
    vehicle_owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'VehicleOwner',
        required:[true,'Customer field is required!']
    },
    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Service',
        required:[true,'Service field is required!']
    },
    exit_before_or_after_status:{
        type:Boolean,
        //enum:['exit before fuel app','exit after fuel pump'],
        required:[true,'Exit before or after Status field is required!']
    },
    created_date:{
        type:Date,
        default:Date.now
    }
});

const ExitQueueBeforeFuelPump=mongoose.model('ExitQueueBeforeFuelPump',ExitQueueBeforeFuelPumpModelSchema);
module.exports={ExitQueueBeforeFuelPump};