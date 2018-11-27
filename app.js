const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;
    
    res.setHeader('Content-Type', 'text/html');

    if (url === '/') {

        res.write('<html');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>');
        res.write('</html>');

        return res.end();

    }
    
    if (url === '/message' && method === 'POST') {

        const body = [];

        req.on('data', (chunk) => {

            body.push(chunk);

        });

        return req.on('end', () => {

            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];

            // fs.writeFileSync('message.txt', message); // Syncronous execution
            fs.writeFile('message.txt', message, (error) => {  // Async execution

                res.writeHead(302, {
                    location: '/'
                });
        
                return res.end();

            });

            // res.writeHead(302, {
            //     location: '/'
            // });
    
            // return res.end();

        });

    }

    res.write('<html');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from Node.js</h1></body>');
    res.write('</html>');
    res.end();

});

server.listen(3000, () => console.log('Server listening on localhost:3000.'));