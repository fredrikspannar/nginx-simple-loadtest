import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
import data from './../techcrunch-top-articles-2022-07-07.json' assert {type: 'json'};

// setup handlebars template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// setup static files
app.use(express.static('public'));

// default route
app.get('/', (req, res) => {
    const articles = data.articles;

    // render handlebars with static json data
    res.render('home',{"articles":articles});
});

// start server
app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`)
});
