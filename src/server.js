const hapi = require("hapi");
const inert = require("inert");
const fs = require("fs");
const hapiAuthCookie = require("hapi-auth-cookie");

const login = require("./routes/login.js");
const home = require("./routes/home.js");
const welcome = require("./routes/welcome.js");
const loggedIn = require("./routes/logged-in.js");

console.log(home, login);
const server = new hapi.Server();

server.connection({
  port: process.env.PORT || 4000,
  tls: {
    key: fs.readFileSync(__dirname + "/../keys/key.pem"),
    cert: fs.readFileSync(__dirname + "/../keys/cert.pem")
  }
});

server.register([inert, hapiAuthCookie], (err) => {
  if (err) throw err;

  server.auth.strategy("bo-bok-auth", "cookie", {
    password: "alliwantforchristmasisapologiesyoloyoloyoloyoloyolo",
    cookie: "teamwork-cookie",
    ttl: 24 * 60 * 60 * 1000,
  });

  server.auth.default("bo-bok-auth");

  server.route([home, login, welcome, loggedIn]);


});

server.start((err) => {
  if (err) throw err;
  console.log(`server is running at ${server.info.uri}`);
});
