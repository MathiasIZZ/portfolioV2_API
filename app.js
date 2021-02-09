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
    title: {type: String, index: true},
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






const Languages = mongoose.model('Languages', languagesSchema)
const Projects = mongoose.model('projects', projectsSchema);


mongoose.connect('mongodb://izza:admin@localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then( (resolve) => {
        console.log("Connexion OK");






    }).catch( err => console.log(err) );
app.listen(port);
