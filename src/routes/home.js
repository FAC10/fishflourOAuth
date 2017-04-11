module.exports = {
  method: "GET",
  path: "/",
  config: {
    auth: false,
    handler: {
      file: __dirname + "/../../public/index.html",
    }
  }
};
