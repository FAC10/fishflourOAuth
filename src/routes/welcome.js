const request = require("request");
const env = require("env2")("./config.env");
const querystring = require("querystring");
const jwt = require("jsonwebtoken");

module.exports = {
  method: "GET",
  path: "/welcome{githubCode?}",
  handler: (req, reply) => {
    request.post(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${req.url.query.code}`,
      function (error, response, body) {
        const accessToken = querystring.parse(body).access_token;
        const headers = {
          "User-Agent": "oauth_github_jwt",
          Authorization: `token ${accessToken}`
        };
        request.get({url: "https://api.github.com/user", headers,}, (error, response, myBody) => {
          if (error) throw error;
          const body = JSON.parse(myBody);
          console.log(body.login, accessToken);
          let options = {
            "expiresIn": Date.now() + 24 * 60 * 60 * 1000,
            "subject": "github-data"
          };
          let payload = {
            "user": {
              "username": body.login,
              "img_url": body.avatar_url,
              "user_id": body.id
            },
            accessToken,
          };
          jwt.sign(payload, process.env.SECRET, options, (err, token) => {
            console.log(token);
            let config = {
              path: "/",
            };
            reply.redirect("/secure").state("token", token, config);
          });
        });
        reply.redirect("/");
      });

  // console.log(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
  // reply(req.url.query.code);

  // config file (require it in)
  // request.post method
  // having the correct query string

  }
};
