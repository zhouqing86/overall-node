import express from 'express';
import exphbs from 'express-handlebars';

/* global process*/

const app = express();

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', 'src/views');

app.get('/', function(req, res) {
    res.render('home');
});

app.listen(process.env.PORT || 3000);