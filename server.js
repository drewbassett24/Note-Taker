const http = require ('http');
const PORT = 8080;
const handleRequest = (request, response) => {
    response.end();

};
const server = httpcreateServer(handleRequest);

server.listen (PORT, () => {
    console.log('Server listening on: http//localhost${PORT}');
});
