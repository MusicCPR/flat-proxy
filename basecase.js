const express = require("express");
const { createProxyMiddleware, responseInterceptor } = require("http-proxy-middleware");

const app = express();
const proxy = createProxyMiddleware({
  target: "http://www.example.com",
  changeOrigin: true, // for vhosted sites

  selfHandleResponse: true, // res.end() will be called internally by responseInterceptor()

  on: {
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
});
app.use('/api', proxy)
app.listen(3333)