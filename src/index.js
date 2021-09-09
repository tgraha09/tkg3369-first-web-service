// 1 - pull in the HTTP server module
const http = require('http');

// 2 - pull in URL and query modules (for URL parsing)
const url = require('url');
const query = require('querystring');
const jsonHandler = require('./jsonResponses');
const htmlHandler = require('./htmlResponses');
// const path = require('path');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// 6 - this will return a random number no bigger than `max`, as a string
// we will also doing our query parameter validation here

// 7 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code

const urlStruct = {
  '/': htmlHandler.getIndexResponse,
  '/random-number': jsonHandler.getRandomNumberResponse,
  notFound: htmlHandler.get404Response,
};

const onRequest = (request, response) => {
  // console.log(request.headers);
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  const params = query.parse(parsedUrl.query);
  // const { max } = params;
  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response, params);
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
