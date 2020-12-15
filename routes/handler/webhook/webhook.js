const apiAdapter = require("../../../utils/apiadapter");
const { APP_URL_SERVICE_ORDER_PAYMENT } = process.env;

const api = apiAdapter(APP_URL_SERVICE_ORDER_PAYMENT);

module.exports = async (req, res) => {
  try {
    const webhook = await api.post(`/webhook`, req.body);
    return res.json(webhook.data);
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
