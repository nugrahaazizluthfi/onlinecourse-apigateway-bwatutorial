const apiAdapter = require("../../../utils/apiadapter");
const { APP_URL_SERVICE_COURSE, APP_HOSTNAME } = process.env;

const api = apiAdapter(APP_URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const courses = await api.get("/courses", {
      params: {
        ...req.query,
        status: "published",
      },
    });

    const coursesData = courses.data;
    const firstPage = coursesData.data.first_page_url.split("?").pop();
    const lastPage = coursesData.data.last_page_url.split("?").pop();

    coursesData.data.first_page_url = `${APP_HOSTNAME}/courses?${firstPage}`;
    coursesData.data.last_page_url = `${APP_HOSTNAME}/courses?${lastPage}`;

    if (coursesData.data.next_page_url) {
      const nextPage = coursesData.data.next_page_url.split("?").pop();
      coursesData.data.next_page_url = `${APP_HOSTNAME}/courses?${nextPage}`;
    }

    if (coursesData.data.prev_page_url) {
      const prevPage = coursesData.data.prev_page_url.split("?").pop();
      coursesData.data.prev_page_url = `${APP_HOSTNAME}/courses?${prevPage}`;
    }

    coursesData.data.path = `${APP_HOSTNAME}/courses`;

    return res.json(coursesData);
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
