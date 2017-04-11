const hapi = require("hapi");
const inert = require("inert");
const fs = require("fs");
const jwt2 = require("hapi-auth-jwt2");
const env = require("env2")("./config.env");

const login = require("./routes/login.js");
const home = require("./routes/home.js");
const welcome = require("./routes/welcome.js");
const secure = require("./routes/secure.js");
const validate = require("./validate.js");


console.log(home, login);
const server = new hapi.Server();

server.connection({
  port: process.env.PORT || 4000,
  tls: {
    key: fs.readFileSync(__dirname + "/../keys/key.pem"),
    cert: fs.readFileSync(__dirname + "/../keys/cert.pem")
  }
});

server.register([inert, jwt2], (err) => {
  if (err) throw err;
  server.route([home, login, welcome, secure]);
});
server.auth.strategy("jwtStrat", "jwt", {
  key: process.env.SECRET,
  verifyOptions: {algorithms: ["HS256"]},
  validateFunc: validate
});

server.start((err) => {
  if (err) throw err;
  console.log(`server is running at ${server.info.uri}`);
});
