const express = require('express')
const bodyParser = require('body-parser')
const env = process.env.NODE_ENV ||  'development';
const shortnerRouter = require('./routers/urlshorterRoute');
const cookieSession = require('cookie-session');
const keys = require('./config/keys')



const app = express()



// Set port 
const port = 80
// Register ExpressHandlebars instance-level helpers
app.set('view engine', 'ejs')
app.use("/static", express.static(__dirname + '/static'));
app.use("/statics", express.static(__dirname + '/dist'));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use('/redirect', shortnerRouter);

app.use(cookieSession({
    maxAge: 1 * 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));





app.get('/', (req, res) => {
    res.send("OK");
})




app.listen(port, () => {
    console.log(`Express is listening on http://localhost:${port}`)
});
