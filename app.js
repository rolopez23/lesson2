//Get HTTP
const http = require('http');
const fs = require('fs');
const axios = require('axios');

const port = 4005;
const hostname = '127.0.0.1';

const logger = (request) => {
  console.log(`Request Type: ${request.method} and to ${request.url}`)
}

const server = http.createServer((request, response) => {
  logger(request);
  //Respond to a GET requeston the root directory
  if (request.method === 'GET' && (request.url === '/' || request.url === '/index.html')) {
    //Read it
    fs.readFile('./index.html', (err, file) => {
      if (err) {
        console.log(err)
      } else {
        //return file
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html')
        response.end(file)
      }
    })
  } else if (request.url === '/contact') {
    axios.get('https://www.google.com/search?q=helloworld')
      .then((res) => {
        response.statusCode = 200;
        console.log(res.data)
        response.end(res.data)
      })
      .catch((error) => {
        console.log('error')
        response.statusCode = 404;
        response.end('error');
      })
  } else {
    response.statusCode = 404;
    response.end('Resource not found')
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
});