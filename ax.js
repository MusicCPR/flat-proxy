const axios = require("axios").default;
const express = require("express");
const app = express();
const port = 3000;

app.use("/", express.static("public"));

const flatUrl = 'https://flat-embed.com'

app.get('/proxy/:scoreId', (req, res) => {
  const qs = req.url.substring(req.url.indexOf("?"));
  var resolvedPathValue = `/${req.params.scoreId}${qs}`;
  console.log('req.url')
  console.log(req.url)
  axios.get(`${flatUrl}${resolvedPathValue}`).then(res.send);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});