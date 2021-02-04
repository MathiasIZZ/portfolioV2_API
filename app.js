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
    name: String
});



const projectsSchema = schema({
    title: String,
    index: Number,
    description: String,
    languages: [{
        type: schema.ObjectId, ref: languagesSchema
    }],
    infos: {
        type: {
            author: ''
        },
        default: {
            author: 'Alice ISAAZ'
        }
    }
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


const Languages = mongoose.model('Languages', languagesSchema)
const Projects = mongoose.model('projects', projectsSchema);


mongoose.connect('mongodb://izza:admin@localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then( (resolve) => {
        console.log("Connexion OK");

        const newLanguage = new Languages({
            name: 'Angular'
        })

        /*newLanguage.save().then( nl => {

            Projects.findOne({} )
                .exec()
                .then( (data) => {
                    data.languages.push(nl._id);
                    data.save();

                });
        });*/
    })
    .catch( (err) => {
        console.log(err);
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
