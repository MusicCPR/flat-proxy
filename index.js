const express = require("express");
const app = express();
const port = 3000;
// const https = require("https");

const proxy = require("express-http-proxy");

app.use(
  "/proxy/:scoreId",
  proxy("flat-embed.com", {
    proxyReqPathResolver: function (req) {
      const qs = req.url.substring(req.url.indexOf("?"));
      var resolvedPathValue = `/${req.params.scoreId}${qs}`
      console.log('resolvedPathValue', resolvedPathValue)
      return resolvedPathValue;
    },
  })
);

app.use("/", express.static("public"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
