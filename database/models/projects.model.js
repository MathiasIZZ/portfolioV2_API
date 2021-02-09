const mongoose = require('mongoose');
const schema = mongoose.Schema;


const projectsSchema = schema({
        title: String,
        index: Number,
        description: String,
        infos: {
            type: {
                author: ''
            },
            default: {
                author: 'Alice ISAAZ'
            }
        }
    },
    {
        timestamps: true
    });


projectsSchema.virtual('titleindex').get( function() {
    return ` ${ this.index }  ${ this.title } `;
});



projectsSchema.pre('validate', function(next) {
    console.log('pre validate');
    next();
})
projectsSchema.post('validate', function (doc, next) {

    return Projects.countDocuments().exec().then( (nombre) =>{
        doc.index = nombre + 1;
    })
})
projectsSchema.pre('save', function(next) {
    console.log('pre save');
    next();
});
projectsSchema.post('save', function () {
    console.log('post save');
});
projectsSchema.statics.findByTitle =  function(title, cb) {
    return Projects.find({title}, cb);
};

projectsSchema.methods.displayClassy = function() {
    return `${ this.index } : ${ this.title }`;
}

const Projects = mongoose.model('projects', projectsSchema);


module.exports = Projects;
