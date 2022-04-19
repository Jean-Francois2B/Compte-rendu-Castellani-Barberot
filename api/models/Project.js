const moogoose = require("mongoose");

const ProjectSchema = new moogoose.Schema({
    userId: {
        type: String,
        require: true
    },
    obj: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    }
},
{timestamps : true}
);

module.exports = moogoose.model("Project", ProjectSchema);