const apiAdapter = require("../../../utils/apiadapter");
const { APP_URL_SERVICE_COURSE } = process.env;

const api = apiAdapter(APP_URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const lesson = await api.get(`/lessons/${id}`);
    return res.json(lesson.data);
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
