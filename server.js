const express = require("express");
require("dotenv").config();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const checkScope = require("express-jwt-authz");

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

app.get("/course", checkJwt, checkScope(["read:courses"]), (req, res) => {
  res.json({
    courses: [
      { id: 1, title: "Building Apps with React and Redux" },
      { id: 2, title: "Creating Reusable React Components" }
    ]
  });
});

const checkRole = role => (req, res, next) => {
  const assigntedRoles = req.user["http://localhost:3000/roles"];
  if (Array.isArray(assigntedRoles) && assigntedRoles.includes(role)) {
    return next();
  } else {
    return res.status(401).send("Insufficient role");
  }
};

app.get("/admin", checkJwt, checkRole("admin"), (req, res) => {
  res.json({
    message: "Hello from an admin API!"
  });
});

app.listen(3001);
console.log("API server listenting on " + process.env.REACT_APP_AUTH0_API_URL);
