var request = require("request");
const express = require("express");
const app = express();
const port = 3000;

const { Transform } = require("stream");

function replaceStringInObject(
  obj,
  targetString,
  replacementString,
  visited = new WeakSet()
) {
  if (visited.has(obj)) {
    return;
  }

  visited.add(obj);

  for (const key in obj) {
    if (typeof obj[key] === "string" && obj[key].includes(targetString)) {
      obj[key] = obj[key].replace(targetString, replacementString);
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      replaceStringInObject(obj[key], targetString, replacementString, visited);
    }
  }
}

const replaceStream = new Transform({
  transform(chunk, encoding, callback) {
    // console.log("encoding", encoding);
    let data = chunk.toString();
    // .replaceAll("flat-embed.com", "localhost:3000/proxy");
    // console.log("data");
    // console.log(data);
    if (data) {
      // replaceStringInObject(data, "flat-embed.com", "localhost:3000/proxy");
      this.push(data);
    }
    callback();
  },
});

app.get("/embed.min.js", function (req, res) {
  res.sendfile(__dirname + "/public/embed.min.js");
});

app.get("/index.html", function (req, res) {
  res.sendfile(__dirname + "/public/index.html");
});

app.get("/test.html", function (req, res) {
  res.sendfile(__dirname + "/public/test.html");
});

app.get("/thick.js", function (req, res) {
  res.sendfile(__dirname + "/public/thick.js");
});

app.use("/*", function (req, res) {
  var url = "https://flat-embed.com" + req.url;
  req
    .pipe(
      request({ qs: req.query, uri: url, encoding: null }).on(
        "response",
        function (proxyResponse) {
          console.log("proxyResponse.headers", proxyResponse.headers);
          // Copy headers from the proxy response to your response
          res.set(proxyResponse.headers);
        }
      )
    )
    .pipe(replaceStream)
    .pipe(res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
