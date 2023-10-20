const express = require('express');
const https = require('https');
const app = express();
const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync('key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Log function

const logConnection = (req, sentKB) => {
    const log = `--------------\n${new Date().toISOString()} || Connection from: ${req.ip}. Connected to ${req.path}. Sended: ${sentKB}kb.\n--------------`;
    fs.appendFile(path.join(__dirname, 'log.txt'), log + '\n', (err) => {
        if (err) throw err;
    });
    console.log(log);
};

// Function to read the JSON file and return the object
function getJsonObjectFromFile(fileName, key) {
    try {
        const data = fs.readFileSync(fileName, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData[key];
    } catch (error) {
        console.error('Error reading the JSON file:', error);
        return null;
    }
}

//get the conf
const conf = getJsonObjectFromFile('conf.json', 'config');

var pack = `server|${conf.ip}
port|${conf.port}
type|1
#maint|HTTP SERVER Free on Netflexs github

beta_server|127.0.0.1
beta_port|17091

beta_type|1
meta|localhost
RTENDMARKERBS1001
`;

// Middleware to log connections
app.use((req, res, next) => {
    const startTime = new Date();
    res.on('finish', () => {
        const endTime = new Date();
        const sentKB = res.get('Content-Length') / 1000 || 0;
        logConnection(req, sentKB);
    });
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

// Sample route
app.get('/', (req, res) => {
    res.send('NaN');
});

//server_data.php
app.post('/growtopia/server_data.php', (req,res) => {
    res.send(pack);
});
//Hosted host for powertunnel
app.get('/host', (req, res) => {
    if (conf) {
        res.send(`#Powertunnel enjoyer : )<br>${conf.ip} www.growtopia1.com<br>${conf.ip} www.growtopia2.com
        `);
    } else {
        res.status(500).send('Internal Server Error');
    }
});

// Route for downloading the file
app.get('/downhost', function (req, res) {
    const filePath = path.join(__dirname, 'public', 'host.txt');

    // Sending the file as a response with a custom filename
    const fileName = 'host.txt';
    res.sendFile(filePath, {
        headers: {
            'Content-Disposition': `attachment; filename="${fileName}"`,
        },
    }, function (err) {
        if (err) {
            if (err.code === 'ECONNABORTED') {
                console.log('Request aborted by the client');
            } else {
                console.error('Error while sending file:', err);
                res.status(err.status).end();
            }
        } else {
            console.log('File sent successfully');
        }
    });
});

// Starting the express server on port 80
const HTTP_PORT = 80;
app.listen(HTTP_PORT, () => {
    console.log(`Server is running on http://localhost:${HTTP_PORT}`);
});


// Starting the HTTPS server on port 443
const httpsServer = https.createServer(credentials, app);
const HTTPS_PORT = 443;
httpsServer.listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server is running on https://localhost:${HTTPS_PORT}`);
});