require('dotenv').config();

const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 5500;

const server = http.createServer();

server.on('request', handleRequest);

server.listen(port, () => console.log('Server has been started at http://localhost:' + port));

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
});

async function handleRequest(request, response) {
    const {method, url} = request;
    if (method == 'GET') {
        fs.readFile(url.slice(1) || 'index.html', (err, data) => {
            if (!err) return response.end(data);

            response.statusCode = 404;
            response.end('File or path not found in ' + url);
        });

    } else if (method == 'POST') {
        const jsonBody = await getBody(request);

        const body = JSON.parse(jsonBody);

        var mailOptions = {
            from:process.env.EMAIL,
            to: ['maxpanas008@gmail.com', 'm.opanasenko1997@gmail.com'],
            subject: 'New request from Node.js',
            text: `Message: ${body.message}`
        };
        
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'POST, GET, DELETE, OPTIONS, key');
        response.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                response.statusCode = 400;
                response.end('Error');
            } else {
                console.log('Email sent: ' + info.response);

                response.end('ok');
            }
        });
    }
}

async function getBody(request) {
    const chunks = [];

    for await (let chunk of request) chunks.push(chunk);

    return Buffer.concat(chunks).toString();
}