var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var JoinQueueModelSchema=new Schema({
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
    join_queue:{
        type:Boolean,
        required:[true,'Join Queue field is required!']
    },
    //current fuel status
    created_date:{
        type:Date,
        default:Date.now
    }
});

//before exit
//import process from 'node:process';

process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});

console.log('This message is displayed first.');

//exit
process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
  });

//exit_2
process.on('exit', (code) => {
    setTimeout(() => {
      console.log('This will not run');
    }, 0);
  });

const JoinQueue=mongoose.model('JoinQueue',JoinQueueModelSchema);
module.exports={JoinQueue}