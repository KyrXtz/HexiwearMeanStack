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

//module.exports = mongoose.model('data', dataSchema, 'datas');

const Data = module.exports = mongoose.model('Todo', dataSchema);

module.exports.getData = function(callback){
  Data.find(callback);
}
