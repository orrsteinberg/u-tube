import axios from "axios";

const api = {
  get: axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3/",
    params: {
      key: process.env.REACT_APP_API_KEY,
    },
  }),
};

export default api;
