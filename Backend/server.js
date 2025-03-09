
const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080 ;

const server = http.createServer(app);
 server.listen(port,()=>
{
  console.log(`Server Is Running on Port : ${port}`);
});
