const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get('/beers', (req, res) => {
    const promise = punkAPI.getBeers();
    promise.then(beersArray => {
        console.log(beersArray);
        res.render('beers', {"beersArray": beersArray});
    })
    .catch(() => console.log('Not found'));
});

app.get('/random-beer', (req, res) => {
    const promise = punkAPI.getRandom();
    promise.then(randomBeer => {
        console.log(randomBeer);
        res.render('random-beer', randomBeer[0]);
    })
    .catch(() => console.log('Not found'));
});


app.listen(3001, () => console.log('🏃‍ on port 3000'));

