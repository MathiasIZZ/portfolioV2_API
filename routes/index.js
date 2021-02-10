const express = require('express');
const router = express.Router();


const api = require('./api');



router.use('/api', api);

router.get('/', (req, res) => {

    const promesse = new Promise( (resolve, reject) => {
        //resolve('Promesse OK !! ');
        //reject('Promesse KO !! ');

        setTimeout( () => {
            resolve('timeout OK')
        }, 3000)
    }).then( (resolve) => {
            console.log(resolve);
            return 'mes couilles';
        }).then( (resolve) => {
        console.log(resolve);
            setTimeout( () => {
                console.log( 'valeur:', resolve, ' acquittée.');
            }, 5000)

    })

    res.render('home');
});


module.exports = router;


