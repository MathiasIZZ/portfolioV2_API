const mongoose = require('mongoose');
const schema = mongoose.Schema;





const languagesSchema = schema({
    name: { type: String, index: true},
    photo: String,
    projects: [{ type: schema.ObjectId, ref: 'projects'}]
});

languagesSchema.statics.findByName = function(name, cb) {
    return Languages.find({name}, cb);
}

const Languages = mongoose.model('languages', languagesSchema)
