const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/check-ssl', (req, res) => {
    const { website } = req.body;
    const options = {
        method: 'HEAD',
        host: website.replace(/^https?:\/\//, ''),
        port: 443,
        path: '/'
    };

    const reqOptions = https.request(options, (response) => {
        const cert = response.connection.getPeerCertificate();
        if (cert && cert.valid_to) {
            const expirationDate = new Date(cert.valid_to);
            const daysRemaining = Math.ceil((expirationDate - new Date()) / (1000 * 60 * 60 * 24));
            let status = 'Valid';
            if (daysRemaining <= 30) {
                status = 'Expiring soon';
            }
            res.json({
                website,
                expirationDate: cert.valid_to,
                status
            });
        } else {
            res.json({
                website,
                expirationDate: 'N/A',
                status: 'Invalid certificate'
            });
        }
    });

    reqOptions.on('error', (e) => {
        res.json({
            website,
            expirationDate: 'N/A',
            status: 'Error fetching certificate'
        });
    });

    reqOptions.end();
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
