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

// app.get("/:scoreId", (req, res) => {
//   console.log('reqUrl' , req.url)
//   console.log('got request for scoreId: ' , req.params.scoreId)
//   const qs = req.url.substring(req.url.indexOf('?'))
//   console.log('qs', qs)
//   https
//     .get(`https://flat-embed.com${qs}`, (resp) => {
//       let data = "";

//       // A chunk of data has been received.
//       resp.on("data", (chunk) => {
//         data += chunk;
//       });

//       // The whole response has been received. Print out the result.
//       resp.on("end", () => {
//         console.log(JSON.parse(data).explanation);
//       });
//     })
//     .on("error", (err) => {
//       console.log("Error: " + err.message);
//     });
//   // res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
