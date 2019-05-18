var restify = require("restify");
var config = require("./config/config");
const restifyPlugins = require("restify-plugins");
var route_link = require("./routes/route_index");
var restify_err = require("restify-errors");

const server = restify.createServer({
  name: config.name,
  version: config.version
});

server.use(
  restifyPlugins.jsonBodyParser({
    mapParams: true
  })
);

server.use(restifyPlugins.acceptParser(server.acceptable));

server.use(
  restifyPlugins.queryParser({
    mapParams: true
  })
);

server.use(restifyPlugins.fullResponse());

server.listen(config.port, function() {
  console.log("%s listening at %s", server.name, config.base_url);
});

route_link(server);
