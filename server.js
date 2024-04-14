const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const jsonSecretKey = process.env.JWT_SECRET;
const PORT = process.env.PORT || 8080;
const BASE_URL = process.env.BASE_URL || "http://localhost";
const { getToken } = require("./utils/helper");

const users = require("./routes/users");
// const collection = require("./routes/collection");
// const serviceRecord = require("./routes/service-record");

//middleware
app.use(cors());
app.use(express.json());

// apply authentication rule if routes being called are not login & register
app.use((req, res, next) => {
  if (req.url === "/api/register" || req.url === "/api/login") {
    next();
  } else {
    const token = getToken(req);

    if (token) {
      if (jwt.verify(token, jsonSecretKey)) {
        req.decode = jwt.decode(token);
        next();
      } else {
        res.status(403).json({ error: "Not Authorized." });
      }
    } else {
      res.status(403).json({ error: "No token. Unauthorized." });
    }
  }
});

// routes
app.use("/api/users", users);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .send(
      "An unexpected error occurred while processing your request. Please try again later"
    );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${BASE_URL}:${PORT}`);
});
