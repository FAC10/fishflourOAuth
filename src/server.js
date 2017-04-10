const hapi = require("hapi");
const inert = require("inert");

const server = new hapi.Server();

server.connection({
  port: process.env.PORT || 4000,
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
});

server.start((err) => {
  if (err) throw err;
  console.log(`server is running at ${server.info.uri}`);
});
