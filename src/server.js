const hapi = require("hapi");
const inert = require("inert");
const fs = require('fs');

const server = new hapi.Server();

server.connection({
  port: process.env.PORT || 4000,
  tls: {
    key: fs.readFileSync(__dirname + '/../keys/key.pem'),
    cert: fs.readFileSync(__dirname + '/../keys/cert.pem')
    }
});

server.register(inert, (err) => {
  if (err) throw err;
  server.route({
    method: "GET",
    path: "/",
    handler: {
      file: __dirname + "/../public/index.html",
    }
  });
  // console.log(server.info);
});

server.start((err) => {
  if (err) throw err;
  console.log(`server is running at ${server.info.uri}`);
});
