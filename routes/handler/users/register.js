const apiAdapter = require("../../../utils/apiadapter");
const { APP_URL_SERVICE_USER } = process.env;

const api = apiAdapter(APP_URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const user = await api.post("/users/register", req.body);
    return res.json(user.data);
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
