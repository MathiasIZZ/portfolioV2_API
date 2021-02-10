const router = require('express').Router();
const Projects = require('../database/models/projects.model')

router.post('/', (req, res) => {

    const requete = req.body;

    const newProject = new Projects({
        ...requete,
        infos: {
            author: requete.author
        }
    })

    newProject.save().then( project => {
        console.log(project)

    })
        .catch( err => {
            console.log(err);
            res.status(400).render('index');
        })



    res.render('thankyou');
})

router.get('/', (req, res) => {
    res.render('projects');
})

module.exports = router;
