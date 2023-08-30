const axios = require("axios").default;
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use("/", express.static("public"));

const flatUrl = 'https://flat-embed.com'

app.get('/proxy/:scoreId', (req, res) => {
  const qs = req.url.substring(req.url.indexOf("?"));
  var resolvedPathValue = `/${req.params.scoreId}${qs}`;
  axios.get(`${flatUrl}${resolvedPathValue}`).then((proxied) => {
    res.set(proxied.headers).send(proxied.data)
  });
})

app.post('*', (req, res) => {
  const qs = req.url.substring(req.url.indexOf("?"));
  var resolvedPathValue = `/${qs}`;
  axios.post(`${flatUrl}${resolvedPathValue}`, req.body
  ).then((proxied) => {
    
    res.set(proxied.headers).send(proxied.data)
  });
})

app.get("*", (req, res) => {
  const qs = req.url.substring(req.url.indexOf("?"));
  var resolvedPathValue = `/${qs}`;
  axios.get(`${flatUrl}${resolvedPathValue}`).then((proxied) => {
    res.set(proxied.headers).send(proxied.data);
  });
});

app.listen(port, () => {
});