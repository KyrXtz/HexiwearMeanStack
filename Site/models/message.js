const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    Sender: {
        type: String
    },
    Recipient: {
        type: String
    },
    Message: {
        type: String
    },
    Time: {
        type: Number
    }
});



const Message = module.exports = mongoose.model('Message', messageSchema);

module.exports.getData = function(callback){
  Message.find(callback);
}

