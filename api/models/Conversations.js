const moogoose = require("mongoose");

const ConversationsSchema = new moogoose.Schema({
    members:{
        type:Array,
    },
},
{timestamps : true}
);

module.exports = moogoose.model("Conversations", ConversationsSchema);