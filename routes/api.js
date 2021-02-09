const express = require('express')
const router = express.Router();
const Projects = require('../database/models/projects.model');


router.get('/projects', (req, res) => {

    Projects.find({}).exec().then( data => res.json(data))
})

module.exports = router;
