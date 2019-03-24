const express = require("express");
require("dotenv").config();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const checkJwt = jwt({
  // provide a signing key
  secret: jwksRsa.expressJwtSecret({
    cache: true, // cache the signing key
    rateLimit: true,
    jwksRequestsPerMinute: 5, // prevent multu requests
    jwksUri: `http://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/.well-known/jwks.json`
  }),

  // validate the audience and the issuer
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

  algorithms: ["RS256"]
});

const app = express();

app.get("/public", (req, res) => {
  res.json({
    message: "Hello from a public API!"
  });
});

app.get("/private", checkJwt, (req, res) => {
  res.json({
    message: "Hello from a private API!"
  });
});

app.listen(3001);
console.log("API server listenting on " + process.env.REACT_APP_AUTH0_API_URL);
