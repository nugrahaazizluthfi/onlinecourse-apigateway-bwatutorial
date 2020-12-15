const apiAdapter = require("../../../utils/apiadapter");
const { APP_URL_SERVICE_ORDER_PAYMENT } = process.env;

const api = apiAdapter(APP_URL_SERVICE_ORDER_PAYMENT);

module.exports = async (req, res) => {
  try {
    const userId = req.user.data.id;
    const orders = await api.get(`/orders`, {
      params: {
        user_id: userId,
      },
    });
    return res.json(orders.data);
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
