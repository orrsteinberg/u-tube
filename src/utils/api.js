import axios from "axios";

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: process.env.REACT_APP_API_KEY,
  },
});

const api = {
  getHomeVideos: async (pageToken) => {
    return await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        maxResults: 6,
        pageToken,
      },
    });
  },
  getVideoById: async (videoId) => {
    return await request("/videos", {
      params: {
        part: "snippet,statistics",
        id: videoId,
      },
    });
  },
  getChannelsById: async (channelIds) => {
    const commaSeperatedIds = channelIds.reduce(
      (str, id) => (str === "" ? id : `${str},${id}`),
      "" // start with an empty string
    );

    return await request("/channels", {
      params: {
        part: "snippet",
        id: commaSeperatedIds,
      },
    });
  },
  getChannelById: async (channelId) => {
    return await request("/channels", {
      params: {
        part: "snippet,statistics",
        id: channelId,
      },
    });
  },
};

export default api;
