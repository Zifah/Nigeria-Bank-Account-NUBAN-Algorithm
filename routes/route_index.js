var nubanUtil = require("./nuban_util");

module.exports = function(server) {
  server.get("/", (req, res, next) => {
    res.send("Initial page here");
  });

  server.get("/accounts/:account/banks", (req, res, next) => {
    nubanUtil.getAccountBanks(req, res, next);
  });
};
