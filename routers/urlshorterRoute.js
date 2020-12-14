const router = require('express').Router();
const Client  = require('pg').Client;
const uuidGenerator = require('../helper/algorithms');
const QRcode = require('../helper/qrcodegenerator');
const path = require('path');

async function generateShortUrl(url) {
    // Set up DB connection
    const client = new Client({
        user: 'username',
        host: '127.0.0.1',
        database: 'dbname',
        password: 'password',
        port: 5432,
      });
    client.connect();
    let URLs = await client.query(`SELECT  id, url, uuid, type, "createdAt", "updatedAt", password
            FROM public.shortenurl
            WHERE public.shortenurl.url='${url}';`);
    if (URLs.rowCount > 0) {
        return URLs.rows[0];
    } else {
        let result = uuidGenerator.md5Digest(url).then(async function(uuids) {
            let i = 0, urlRecord, uuid ='';
            // Generate ID by md5 algorithm and check if it exists in database.
            // If ID is duplicated, try generating ID by random algorithm
            // Store link into database and Generate short link and QR code
            
        });
        return result;
    }
}

async function getURLByUuid(uuid) {
    const client = new Client({
        user: 'username',
        host: '127.0.0.1',
        database: 'dbname',
        password: 'password',
        port: 5432,
      });
    client.connect();
    let URLs = await client.query(`SELECT  id, url, uuid, type, "createdAt", "updatedAt", password
            FROM public.shortenurl
            WHERE public.shortenurl.uuid='${uuid}';`);
    console.log(URLs);
    if (URLs.rowCount > 0) {
        return URLs.rows[0];
    }
}


router.get('/', (req, res) => {
    res.render("urlshortener", {title: 'URL Shortener'});
});

router.post('/', (req, res) => {
    generateShortUrl(req.body.url).then((data) => {
        res.send(data);
    });
});

router.get('/download/:uuid/:extension', function(req, res){
    const file = `${path.dirname(__dirname)}/static/qrcode/${req.params.uuid}.${req.params.extension}`;
    res.download(file); 
});

router.get('/:uid', (req, res) => {
    getURLByUuid(req.params.uid).then((data) => {
        res.redirect(302, data.url);
    });
})

module.exports = router;
