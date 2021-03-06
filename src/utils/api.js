import axios from "axios";

import {
  NUM_VIDS_TO_FETCH,
  NUM_RELATED_VIDS_TO_FETCH,
  NUM_COMMENTS_TO_FETCH,
  NUM_SEARCH_RESULTS_TO_FETCH,
  NUM_SUBSCRIPTIONS_TO_FETCH,
  NUM_RATINGS_TO_FETCH,
} from "./constants";

const request = axios.create({
  baseURL: process.env.REACT_APP_API_PROXY,
});

const api = {
  getHomeVideos: async (pageToken) => {
    return await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        maxResults: NUM_VIDS_TO_FETCH,
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
  getVideosById: async (videoIds) => {
    return await request("/videos", {
      params: {
        part: "snippet,statistics,contentDetails",
        id: videoIds.toString(),
      },
    });
  },
  getRelatedVideos: async (videoId) => {
    return await request("/search", {
      params: {
        type: "video",
        part: "snippet",
        relatedToVideoId: videoId,
        maxResults: NUM_RELATED_VIDS_TO_FETCH,
      },
    });
  },
  getVideosByChannelId: async (channelId, pageToken) => {
    return await request("/search", {
      params: {
        type: "video",
        part: "snippet",
        channelId,
        order: "date",
        maxResults: NUM_VIDS_TO_FETCH,
        pageToken,
      },
    });
  },
  getVideosByCategoryId: async (categoryId, pageToken) => {
    return await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        videoCategoryId: categoryId,
        maxResults: NUM_VIDS_TO_FETCH,
        pageToken,
      },
    });
  },
  getChannelById: async (channelId) => {
    return await request("/channels", {
      params: {
        part: "snippet,statistics,contentDetails",
        id: channelId,
      },
    });
  },
  getChannelsById: async (channelIds) => {
    return await request("/channels", {
      params: {
        part: "snippet,statistics",
        id: channelIds.toString(),
      },
    });
  },
  getCommentsByVideoId: async (videoId) => {
    return await request("/commentThreads", {
      params: {
        part: "snippet",
        videoId,
        maxResults: NUM_COMMENTS_TO_FETCH,
      },
    });
  },
  getSearchResults: async (query) => {
    return await request("/search", {
      params: {
        part: "snippet",
        maxResults: NUM_SEARCH_RESULTS_TO_FETCH,
        q: query,
        type: "video,channel",
        regionCode: "US",
      },
    });
  },
  getSubscriptions: async (accessToken) => {
    return await request("/subscriptions", {
      params: {
        part: "snippet,contentDetails",
        mine: true,
        maxResults: NUM_SUBSCRIPTIONS_TO_FETCH,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  addSubscription: async (channelId, accessToken) => {
    // Create a subscription resource to match YouTube API requirements
    const subscriptionResource = {
      snippet: {
        resourceId: {
          kind: "youtube#channel",
          channelId,
        },
      },
    };

    return await request("/subscriptions", {
      method: "POST",
      data: subscriptionResource,
      params: {
        part: "snippet,contentDetails",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  deleteSubscription: async (subscriptionId, accessToken) => {
    return await request("/subscriptions", {
      method: "DELETE",
      params: {
        id: subscriptionId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  addComment: async (videoId, text, accessToken) => {
    // Create a commentThread resource to match YouTube API requirements
    const commentThreadResource = {
      snippet: {
        videoId,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    };

    return await request("/commentThreads", {
      method: "POST",
      data: commentThreadResource,
      params: {
        part: "snippet",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  getLikedVideos: async (accessToken) => {
    return await request("/videos", {
      params: {
        part: "snippet,contentDetails",
        myRating: "like",
        maxResults: NUM_RATINGS_TO_FETCH,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  getDislikedVideos: async (accessToken) => {
    return await request("/videos", {
      params: {
        part: "snippet,contentDetails",
        myRating: "dislike",
        maxResults: NUM_RATINGS_TO_FETCH,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  rateVideo: async (videoId, rating, accessToken) => {
    return await request("/videos/rate", {
      method: "POST",
      params: {
        id: videoId,
        rating,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default api;
