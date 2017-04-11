module.exports = {
  method: "GET",
  path: "/logged-in",
  handler: (req, reply) => {
    console.log(req.state["teamwork-cookie"].access_token);
    reply("hello world");
  }
};
