const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const mongoose = require('mongoose');
const schema = mongoose.Schema;


const port = process.env.PORT || 3000;
const index = require('./routes')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(index);



const languagesSchema = schema({
    name: String,
    photo: String,
    projects: [{ type: schema.ObjectId, ref: 'projects'}]
});


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

/* MODELE EMBEDDED
const projectsSchema = schema({
    title: String,
    index: Number,
    description: String,
    languages: {
        type: [languagesSchema]
    },
    infos: {
        type: {
            author: ''
        },
        default: {
            author: 'Alice ISAAZ'
        }
    }
});*/

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

languagesSchema.statics.findByName = function(name, cb) {
    return Languages.find({name}, cb);
}

projectsSchema.methods.displayClassy = function() {
    return `${ this.index } : ${ this.title }`;
}




const Languages = mongoose.model('languages', languagesSchema)
const Projects = mongoose.model('projects', projectsSchema);


mongoose.connect('mongodb://izza:admin@localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then( () => {
        console.log("Connexion OK");

        Projects.findOneAndUpdate({title: 'Bambunor'}, {$set: { 'infos.author': 'Michel Pirres' }  })
            .exec().then( (resolve) => console.log(resolve.infos.author));

    })









        /*Projects.findOne({})
                .exec()
                .then( (data) => {

                    const newLanguage = {
                        name: 'Angular'
                    };

                    data.language.push(newLanguage);
                })
                .catch( (err) => {
                    console.log(err);
                })
    })
    .catch( (err) => {
        console.log(err)
    })*/




//Projects.countDocuments({ index: { $gte: 4 } }).exec().then( (count) => console.log(count))

/*const newP = new Projects({
    title: 'Wordpress France Entraide',
    index: 6,
    description: 'MEAN STACK SERVER LINUX'
})

newP.save();*/


/*
Projects.findOneAndUpdate({title: "Kodomo"}, { $set: { 'infos.author': 'Mathias Guiguen' } })
    .exec()
    .then( (data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);

    })
*/
/*Projects.findOne( {title: "Kodomo"}, (err, documents) => {
    console.log(documents)
})*/

//Projects.find({ title: "Kodomo" }, (err, data) => { console.log(data) });

/*Projects.findOne({title: "Premium Wagen"})
        .exec()
        .then( (data) => {
           const leDernier = data;

            leDernier.title = "Kodomo";
            leDernier.index = 5;
            leDernier.description = 'Développé sous Wordpress';

            leDernier.save( (err, data) => {
                console.log(data);
            })
        }).catch( (err) => { console.log(err) });
*/



/*
const newProject = new Projects();
newProject.title = "Kodomo";
newProject.index = 4;
newProject.description = "Developpé sous Wordpress + Bootstrap"

newProject.save((err, documents) => {
    console.log(documents);
})
*/

/*
Projects.find({}, (err, documents) => {
    console.log(documents)
})
*/











app.listen(port);
