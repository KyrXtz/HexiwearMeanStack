const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    Device: {
        type: String
    },
    time: {
        type: Number
    },
    HeartRate: {
        type: Number
    },
    Steps: {
        type: Number
    }
});



const Data = module.exports = mongoose.model('Todo', dataSchema);

module.exports.getData = function(callback){
  Data.find(callback);
}
