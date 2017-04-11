const users = {
  21139983: {
    name: "Zooey Miller",
    id: 21139983
  }
};

const validate = (token, request, cb) => {
  if(!users[token.user.user_id]){
    return cb(null, false);
  }
  return cb(null, true);
};

module.exports = validate;
