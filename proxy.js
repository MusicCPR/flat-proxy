// include dependencies
const express = require("express");
const {
  createProxyMiddleware,
  responseInterceptor,
} = require("http-proxy-middleware");

const app = express();
const simpleRequestLogger = (proxyServer, options) => {
  proxyServer.on("proxyReq", (proxyReq, req, res) => {
    console.log(`[HPM] [${req.method}] ${req.url}`); // outputs: [HPM] GET /users
  });
};

// create the proxy
// /** @type {import('http-proxy-middleware/dist/types').RequestHandler<express.Request, express.Response>} */
const exampleProxy = createProxyMiddleware({
  pathFilter: (path, req) => path.match(/^\/proxy/),
  target: "https://flat-embed.com", // target host with the same base path
  changeOrigin: true, // needed for virtual hosted sites
  logger: console,
  selfHandleResponse: true,
  on: {
    error: (err, req, res) => {
      console.log("onerror");
      console.log(err);
    },
    // proxyReq: (proxyReq, req, res) => {
    //   console.log("onproxyreq");
    //   console.log(req);
    // },
    // proxyRes: responseInterceptor(
    //   async (responseBuffer, proxyRes, req, res) => {
    //     // res.statusCode = 418; // set different response status code

    //     const response = responseBuffer.toString("utf8");
    //     console.log("response");
    //     console.log(response);
    //     return response;
    //   }
    // ),
    proxyRes: responseInterceptor(
      async (responseBuffer, proxyRes, req, res) => {
        // log original request and proxied request info
        const exchange = `[DEBUG] ${req.method} ${req.path} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path} [${proxyRes.statusCode}]`;
        console.log(exchange); // [DEBUG] GET / -> http://www.example.com [200]

        // log complete response
        const response = responseBuffer.toString("utf8");
        console.log(response); // log response body

        return responseBuffer;
      }
    ),
  },
  // plugins: [simpleRequestLogger],
  // on: {
  //   // proxyReq: (proxyReq, req, res) => {
  //   //   console.log("onproxyreq");
  //   //   console.log(req);
  //   // },
  //   proxyRes: responseInterceptor(
  //     async (responseBuffer, proxyRes, req, res) => {
  //       const response = responseBuffer.toString("utf8"); // convert buffer to string
  //       console.log("response");
  //       console.log(response);
  //       return response;
  //       // return response.replace("Hello", "Goodbye"); // manipulate response and return the result
  //     }
  //   ),
  // },
  // selfHandleResponse: true, // res.end() will be called internally by responseInterceptor()

  /**
   * Intercept response and replace 'Hello' with 'Goodbye'
   **/
});

app.get("/embed.min.js", function (req, res) {
  res.sendFile(__dirname + "/public/embed.min.js");
});

app.get("/index.html", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/test.html", function (req, res) {
  res.sendFile(__dirname + "/public/test.html");
});

app.get("/thick.js", function (req, res) {
  res.sendFile(__dirname + "/public/thick.js");
});

// http://localhost:3000/proxy/64ca660de6985ecc31d8597b?jsapi=true&mode=edit&toolsetId=64be80de738efff96cc27edd&branding=false&controlsPlay=false&appId=60a51c906bcde01fc75a3ad0&sharingKey=3550a7834997bafab5d5fd1e1d2c10aa9e087f40f44c31fc98a447a5a962a6b7e2bb109d02f133430c0f330e90cfcf5dc1cf376349bad68a704c14d4caaccff5
// mount `exampleProxy` in web server
app.use(exampleProxy);
app.listen(3001);
