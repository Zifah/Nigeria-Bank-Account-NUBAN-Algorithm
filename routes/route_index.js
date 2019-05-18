module.exports = function(server) {
  server.get("/", (req, res, next) => {
    res.send("Initial page here");
  });
};
