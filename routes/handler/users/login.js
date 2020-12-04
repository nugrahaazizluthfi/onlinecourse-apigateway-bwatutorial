const apiAdapter = require("../../../utils/apiadapter");
const jwt = require("jsonwebtoken");
const {
  APP_URL_SERVICE_USER,
  APP_JWT_SECRET,
  APP_JWT_SECRET_REFRESH_TOKEN,
  APP_JWT_ACCESS_TOKEN_EXPIRED,
  APP_JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(APP_URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const user = await api.post("/users/login", req.body);
    const data = user.data.data;

    const token = jwt.sign({ data }, APP_JWT_SECRET, {
      expiresIn: APP_JWT_ACCESS_TOKEN_EXPIRED,
    });
    const refreshToken = jwt.sign({ data }, APP_JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: APP_JWT_REFRESH_TOKEN_EXPIRED,
    });

    await api.post("/refresh_tokens", {
      refresh_token: refreshToken,
      user_id: data.id,
    });

    return res.json({
      status: "success",
      data: {
        token,
        refresh_token: refreshToken,
      },
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
