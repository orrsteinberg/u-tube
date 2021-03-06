import api from "./api";

/*
 * Utility functions
 */

// Truncate text
export const truncateText = (type, text) => {
  const truncate = (maxLength) =>
    text.length > maxLength ? text.substr(0, maxLength - 3) + "..." : text;

  switch (type) {
    case "title":
      return truncate(64);
    case "description":
      return truncate(150);
    case "subscription":
      return truncate(18);
    case "comment":
      return truncate(150);
    default:
      return text;
  }
};

// Parse query strings
export const getQueryStringParams = (query) => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split("&")
        .reduce((params, param) => {
          let [key, value] = param.split("=");
          params[key] = value
            ? decodeURIComponent(value.replace(/\+/g, " "))
            : "";
          return params;
        }, {})
    : {};
};

// Throw custom error message for error responses from the server
export const handleResultErrors = (error) => {
  if (error.response?.data?.message) {
    throw error.response.data.message;
  }
  throw error;
};

// Return new object with search results arranged by item type
const sortSearchResults = (results) => {
  return results.reduce(
    (obj, item) => {
      if (item.id.kind === "youtube#channel") {
        return {
          ...obj,
          channels: [...obj.channels, item.id.channelId],
        };
      } else if (item.id.kind === "youtube#video") {
        return {
          ...obj,
          videos: [...obj.videos, item.id.videoId],
        };
      }
      return obj;
    },
    {
      channels: [],
      videos: [],
    }
  );
};

/*
 * Transform API response data shape to fit the client store models
 */

const transformVideo = (videoData) => {
  return {
    id: videoData.id,
    title: videoData.snippet.title,
    thumbnail: videoData.snippet.thumbnails.medium.url,
    channelId: videoData.snippet.channelId,
    channelTitle: videoData.snippet.channelTitle,
    viewCount: videoData.statistics.viewCount,
    publishedAt: videoData.snippet.publishedAt,
    duration: videoData.contentDetails.duration,
    description: videoData.snippet.description,
  };
};

const transformVideosWithAvatars = ({ videos, channels }) => {
  // Create object with channel id for keys and avatar url for values
  const channelAvatars = channels.reduce((avatarsObj, channel) => {
    return {
      ...avatarsObj,
      [channel.id]: channel.snippet.thumbnails.default.url,
    };
  }, {});

  // Add appropriate channel avatars to videos by their id
  return videos.map(transformVideo).map((video) => ({
    ...video,
    channelAvatar: channelAvatars[video.channelId],
  }));
};

const transformChannelData = (channelData) => {
  return {
    id: channelData.id,
    title: channelData.snippet.title,
    avatar: channelData.snippet.thumbnails.default.url,
    subscriberCount: channelData.statistics.subscriberCount,
    videoCount: channelData.statistics.videoCount,
  };
};

const transformVideoToWatch = ({ videoData, channelData }) => {
  return {
    id: videoData.id,
    title: videoData.snippet.title,
    description: videoData.snippet.description,
    likeCount: videoData.statistics.likeCount,
    dislikeCount: videoData.statistics.dislikeCount,
    viewCount: videoData.statistics.viewCount,
    publishedAt: videoData.snippet.publishedAt,
    channel: {
      id: videoData.snippet.channelId,
      title: videoData.snippet.channelTitle,
      avatar: channelData.snippet.thumbnails.default.url,
      subscriberCount: channelData.statistics.subscriberCount,
    },
  };
};

const transformComment = (commentData) => {
  const {
    authorDisplayName,
    authorChannelId: { value: authorChannelId },
    authorProfileImageUrl,
    publishedAt,
    textDisplay,
    textOriginal,
  } = commentData.snippet.topLevelComment.snippet;

  return {
    id: commentData.id,
    authorDisplayName,
    authorChannelId,
    authorProfileImageUrl,
    publishedAt,
    textDisplay,
    textOriginal,
  };
};

const transformSubscription = (item) => {
  return {
    id: item.id,
    channel: {
      id: item.snippet.resourceId.channelId,
      title: item.snippet.title,
      avatar: item.snippet.thumbnails.default.url,
      videoCount: item.contentDetails.totalItemCount,
      newVideoCount: item.contentDetails.newItemCount,
    },
  };
};

/*
 * Handle API requests and return transformed data
 */

export const getVideosWithAvatars = async ({ pageToken, categoryId }) => {
  // Make appropriate API request
  const videosResponse = categoryId
    ? await api.getVideosByCategoryId(categoryId, pageToken)
    : await api.getHomeVideos(pageToken);

  // Channel avatars are not included in the API response so we have to make another request
  const channelIds = videosResponse.data.items.map((v) => v.snippet.channelId);
  const channelsResponse = await api.getChannelsById(channelIds);

  // Customize video data shape and merge channel avatars
  const videos = transformVideosWithAvatars({
    videos: videosResponse.data.items,
    channels: channelsResponse.data.items,
  });

  return {
    videos,
    nextPageToken: videosResponse.data.nextPageToken,
  };
};

export const getHomeVideos = (pageToken) => getVideosWithAvatars({ pageToken });

export const getCategoryVideos = (categoryId, pageToken) =>
  getVideosWithAvatars({ pageToken, categoryId });

export const getChannelData = async (channelId) => {
  const channelResponse = await api.getChannelById(channelId);

  if (channelResponse.data.pageInfo.totalResults === 0) {
    throw new Error("Channel not found");
  }

  return transformChannelData(channelResponse.data.items[0]);
};

export const getChannelVideos = async (channelId, pageToken) => {
  // Get list of video IDs (with pageToken so we continute from previous fetch)
  const channelVideosResponse = await api.getVideosByChannelId(
    channelId,
    pageToken
  );

  // Get videos by ID so we can have their contentData (needed for video duration)
  const channelVideoIds = channelVideosResponse.data.items.map(
    (item) => item.id.videoId
  );
  const videosResponse = await api.getVideosById(channelVideoIds);

  return {
    videos: videosResponse.data.items.map(transformVideo),
    nextPageToken: channelVideosResponse.data.nextPageToken,
  };
};

export const getVideoToWatch = async (videoId) => {
  // Get video
  const videoResponse = await api.getVideoById(videoId);

  if (videoResponse.data.items.length === 0) {
    throw new Error("Video not found");
  }

  // Channel data is not included in the API response so we have to make another request
  const channelId = videoResponse.data.items[0].snippet.channelId;
  const channelResponse = await api.getChannelById(channelId);

  return transformVideoToWatch({
    videoData: videoResponse.data.items[0],
    channelData: channelResponse.data.items[0],
  });
};

export const getRelatedVideos = async (videoId) => {
  // Get list of related video IDs
  const relatedVideosResponse = await api.getRelatedVideos(videoId);
  const relatedVideosIds = relatedVideosResponse.data.items.map(
    (item) => item.id.videoId
  );

  // Get videos by ID so we can have their contentData (needed for video duration)
  const videosResponse = await api.getVideosById(relatedVideosIds);
  return videosResponse.data.items.map(transformVideo);
};

export const getComments = async (videoId) => {
  const commentsResponse = await api.getCommentsByVideoId(videoId);
  return commentsResponse.data.items.map(transformComment);
};

export const addComment = async (videoId, text, accessToken) => {
  const commentResponse = await api.addComment(videoId, text, accessToken);
  return transformComment(commentResponse.data);
};

const getChannelsById = async (channelIds) => {
  const channelsResponse = await api.getChannelsById(channelIds);
  return channelsResponse.data.items.map(transformChannelData);
};

const getVideosById = async (videoIds) => {
  const videosResponse = await api.getVideosById(videoIds);
  return videosResponse.data.items.map(transformVideo);
};

export const getSearchResults = async (query) => {
  // Get search results
  const searchResponse = await api.getSearchResults(query);

  if (searchResponse.data.items.length === 0) {
    throw new Error("No results found");
  }

  // Arrange results by type (channel or video) as different arrays of item IDs
  const results = sortSearchResults(searchResponse.data.items);

  const channels =
    results.channels.length > 0 ? await getChannelsById(results.channels) : [];

  const videos =
    results.videos.length > 0 ? await getVideosById(results.videos) : [];

  return {
    channels,
    videos,
  };
};

export const getSubscriptions = async (accessToken) => {
  const subResponse = await api.getSubscriptions(accessToken);
  return subResponse.data.items.map(transformSubscription);
};

export const addSubscription = async (channelId, accessToken) => {
  const subResponse = await api.addSubscription(channelId, accessToken);
  return transformSubscription(subResponse.data);
};

export const deleteSubscription = async (subscriptionId, accessToken) => {
  await api.deleteSubscription(subscriptionId, accessToken);
  return subscriptionId;
};

export const getRatings = async (accessToken) => {
  const likedVideos = await api.getLikedVideos(accessToken);
  const dislikedVideos = await api.getDislikedVideos(accessToken);

  const extractVideoId = (videoData) => videoData.id;

  return {
    likedVideos: likedVideos.data.items.map(extractVideoId),
    dislikedVideos: dislikedVideos.data.items.map(extractVideoId),
  };
};

export const rateVideo = async (videoId, rating, accessToken) => {
  await api.rateVideo(videoId, rating, accessToken);
  return videoId;
};
