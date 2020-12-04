const jwt = require("jsonwebtoken");
const { APP_JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  jwt.verify(token, APP_JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).json({
        status: "error",
        message: err.message,
      });
    }

    req.user = decoded;
    return next();
  });
};
