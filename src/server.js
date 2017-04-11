const hapi = require("hapi");
const inert = require("inert");
const fs = require("fs");

const login = require("./routes/login.js");
const home = require("./routes/home.js");
const welcome = require("./routes/welcome.js");


console.log(home, login);
const server = new hapi.Server();

server.connection({
  port: process.env.PORT || 4000,
  tls: {
    key: fs.readFileSync(__dirname + "/../keys/key.pem"),
    cert: fs.readFileSync(__dirname + "/../keys/cert.pem")
  }
});

server.register(inert, (err) => {
  if (err) throw err;
  server.route([home, login, welcome]);
});

server.start((err) => {
  if (err) throw err;
  console.log(`server is running at ${server.info.uri}`);
});
