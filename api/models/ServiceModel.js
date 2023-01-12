var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ServiceModelSchema=new Schema({
    city:{
        type:String,
        required:[true,'Shed Name field is required!'],
        maxlength:100
    },
    fuel_arrival_time:{
        type:Date,
        required:[true,'fuel arrival time is required!'],
    },
    fuel_depart_time:{
        type:Date,
        required:[true,'fuel arrival time is required!'],
    },
    fuel_status_petrol_92_octane:{
        type:Boolean,
        required:[true,'fuel status of petrol (92 octane) field is required!']
    },
    fuel_status_petrol_92_octane_euro_4:{
        type:Boolean,
        required:[true,'fuel status of petrol (92 octane EURO 4) field is required!']
    },
    fuel_status_diesel_auto_diesel:{
        type:Boolean,
        required:[true,'fuel status diesel (auto diesel) field is required!']
    },
    fuel_status_diesel_lanka_super_diesel:{
        type:Boolean,
        required:[true,'fuel status diesel (lanka super diesel 4 star) field is required!']
    },
    fuel_status_kerosene_oil:{
        type:Boolean,
        required:[true,'fuel status kerosene oil field is required!']
    },
    shed_owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ShedOwner',
        required:[true,'Shed owner field is required!']
    },
    created_date:{
        type:Date,
        default:Date.now
    }
});

ServiceModelSchema.index({
    city:'text'
},{
    weights:{
        city:5
    },
});

const Service=mongoose.model('Service',ServiceModelSchema);
module.exports={Service};