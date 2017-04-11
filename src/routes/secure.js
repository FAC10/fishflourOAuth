module.exports = {
  method: "GET",
  path: "/secure",
  config: {
    auth: "jwtStrat",
    handler: (req, reply) => {
      reply("finally verified");
    },
  },
};
