import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
import data from './../techcrunch-top-articles-2022-07-07.json' assert {type: 'json'};

export function serverApp(port) {
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
    app.listen(port, () => {
        console.log(`App is running on port ${port}`)
    });

    return app;
}