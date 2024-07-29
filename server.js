const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const websiteList = [
  'https://flosenso.app',
  'https://flosenso.com',
  'https://hipl.hrss360.com',
  'https://hipl.hrss360.app',
  'https://energybots.tmsys360.com',
  'https://energybots.tmsys360.app'
]; // Replace with your list of websites

app.get('/check-ssl', async (req, res) => {
  try {
    const results = await Promise.all(websiteList.map(async (website) => {
      const options = {
        method: 'HEAD',
        host: website.replace(/^https?:\/\//, ''),
        port: 443,
        path: '/'
      };

      return new Promise((resolve, reject) => {
        const reqOptions = https.request(options, (response) => {
          const cert = response.connection.getPeerCertificate();
          if (cert && cert.valid_to) {
            const expirationDate = new Date(cert.valid_to);
            const daysRemaining = Math.ceil((expirationDate - new Date()) / (1000 * 60 * 60 * 24));
            let status = 'Valid';
            if (daysRemaining <= 30) {
              status = 'Expiring soon';
            }
            resolve({ website, expirationDate, status });
          } else {
            resolve({ website, expirationDate: 'N/A', status: 'Invalid certificate' });
          }
        });

        reqOptions.on('error', (e) => {
          reject({ website, expirationDate: 'N/A', status: 'Error fetching certificate' });
        });

        reqOptions.end();
      });
    }));

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
