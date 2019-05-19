var nubanUtil = require("./nuban_util");

module.exports = function(server) {
  server.get("/", (req, res, next) => {
    res.send("Initial page here");
  });

  server.get("/accounts/:account(^\\d{10}$)/banks", (req, res, next) => {
    nubanUtil.getAccountBanks(req, res, next);
  });

  server.post("/banks/:bank(^\\d{3}$)/accounts", (req, res, next) => {
    nubanUtil.createAccountWithSerial(req, res, next);
  });
};
