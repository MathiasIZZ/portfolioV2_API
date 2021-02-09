const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://izza:admin@cluster0.iwyr4.mongodb.net/portfolio?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then( () => {
        console.log("Connexion OK");
    }).catch( err => console.log(err) );

