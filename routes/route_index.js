var nubanUtil = require("./nuban_util");

module.exports = function(server) {
  server.get("/", (req, res, next) => {
    res.send("Initial page here");
  });

  server.get("/account-banks/:account", (req, res, next) => {
    nubanUtil.getAccountBanks(req, res, next);
  });
};
