const express = require('express');

const app = express();
const initializer = require('./inits');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const handlers = require('./handlers');

const publicRoutes = require('./routes/public');

/* Handlebars */
app.set('views', './dist/views/templates');
app.engine('handlebars', exphbs({
    defaultLayout: 'basic',
    layoutsDir: './dist/views/layouts',
    partialsDir: './dist/views/partials',
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('./dist/static'));
app.use(require('cookie-parser')());

function registerRoutes() {
    app.use('/', publicRoutes);
}

initializer.init(app, () => {
    registerRoutes();

    app.use(handlers.notFoundHandler);

    app.use(handlers.{{@@Name@@}}ErrorHandler);
    app.use(handlers.logError);
    app.use(handlers.mongoErrorHandler);
    app.use(handlers.errorHandler);

    const PORT = 8082;
    app.listen(PORT, () => {
        console.log(`{{@@Name@@}} listening on port ${PORT}!`);
    });
});

process.on('SIGINT', () => {
    process.exit(0);
});
