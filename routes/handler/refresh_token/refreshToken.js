const jwt = require("jsonwebtoken");
const { response } = require("../../../app");
const apiAdapter = require("../../../utils/apiadapter");
const {
  APP_URL_SERVICE_USER,
  APP_JWT_SECRET,
  APP_JWT_SECRET_REFRESH_TOKEN,
  APP_JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(APP_URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;
    const email = req.body.email;

    if (!refreshToken || !email) {
      return res
        .status(400)
        .json({ status: "error", message: "invalid token" });
    }

    await api.get("/refresh_tokens", {
      params: { refresh_token: refreshToken },
    });

    jwt.verify(refreshToken, APP_JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          status: "error",
          message: err.message,
        });
      }

      if (email !== decoded.data.email) {
        return res.status(400).json({
          status: "error",
          message: "email is not valid",
        });
      }

      const token = jwt.sign({ data: decoded.data }, APP_JWT_SECRET, {
        expiresIn: APP_JWT_ACCESS_TOKEN_EXPIRED,
      });

      return res.json({
        status: "success",
        data: token,
      });
    });
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unvailable" });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
