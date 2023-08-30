const express = require("express");
const app = express();
const port = 3000;
// const https = require("https");

// const proxy = require("express-http-proxy");

// function replaceString(obj, searchValue, replaceValue) {
//   // Check if the current value is an object
//   if (typeof obj === "object" && obj !== null) {
//     // Iterate over each property of the object
//     for (let key in obj) {
//       // Recursively call the function for nested objects
//       obj[key] = replaceString(obj[key], searchValue, replaceValue);
//     }
//   } else if (typeof obj === "string") {
//     // Replace the matching string with the new value
//     obj = obj.replace(new RegExp(searchValue, "g"), replaceValue);
//   }

//   return obj;
// }

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

// wonder if this is right, seems like it is because my embed work 🤷‍♂️
// https://github.com/villadora/express-http-proxy#proxyreqpathresolver-supports-promises
app.use(
  "/proxy/:scoreId",
  proxy("flat-embed.com", {
    proxyReqPathResolver: function (req) {
      console.log(req);
      console.log("req.url", req.url);
      const qs = req.url.substring(req.url.indexOf("?"));
      var resolvedPathValue = `/${req.params.scoreId}${qs}`;
      console.log("resolvedPathValue", resolvedPathValue);
      return resolvedPathValue;
    },
    userResHeaderDecorator(headers, userReq, userRes, proxyReq, proxyRes) {
      // recieves an Object of headers, returns an Object of headers.
      let filteredHeaders = headers;
      // console.log("filtered headers");
      // // console.log(filteredHeaders);
      // console.log(Object.keys(filteredHeaders))
      // // Object.keys(filteredHeaders).forEach(console.log)
      // delete filteredHeaders["content-security-policy"];
      // filteredHeaders["location"] = filteredHeaders["location"]
      //   .replaceAll("https://flat-embed.com/", "http://localhost:3000/proxy/")
      //   console.log('filtered headers')
      //   // console.log(filteredHeaders)
      return filteredHeaders;
    },
    // userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
    //   // 
    //   // return replaceString(
    //   //   proxyRes,
    //   //   "https://flat-embed.com/",
    //   //   "http://localhost:3000/proxy/"
    //   // )

    //   replaceStringInObject(
    //     proxyResData,
    //     "https://flat-embed.com/",
    //     "http://localhost:3000/proxy/"
    //   );
    //   return proxyResData;
    // },
  })
);

app.use("/", express.static("public"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
