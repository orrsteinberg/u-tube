import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdThumbUp, MdThumbDown } from "react-icons/md";

import {
  selectRatings,
  like,
  dislike,
  removeRating,
} from "../../features/ratings/ratingsSlice";
import { selectUser } from "../../features/auth/authSlice";
import { RatingBox, LikeButton, DislikeButton } from "./RatingButtons.styled";

const RatingButtons = ({ videoId, likeCount, dislikeCount }) => {
  const [rating, setRating] = useState("none"); // "liked" |"disliked" | "none"
  const user = useSelector(selectUser);
  const ratings = useSelector(selectRatings);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      // Check current rating on user state change
      const liked = ratings.likedVideos.find((id) => id === videoId);
      const disliked =
        !liked && ratings.dislikedVideos.find((id) => id === videoId);

      setRating(liked ? "liked" : disliked ? "disliked" : "none");
    }
  }, [user, ratings, videoId]);

  const handleLikeClick = () => {
    if (!user) return;

    if (rating === "none") {
      dispatch(like(videoId));
    } else {
      dispatch(removeRating(videoId));
    }
  };

  const handleDislikeClick = () => {
    if (!user) return;

    if (rating === "none") {
      dispatch(dislike(videoId));
    } else {
      dispatch(removeRating(videoId));
    }
  };

  return (
    <RatingBox>
      <span className="count">
        <LikeButton
          disabled={ratings.updateInProgress.status === "loading"}
          highlight={rating === "liked"}
          onClick={handleLikeClick}
        >
          <MdThumbUp />
        </LikeButton>
        {likeCount}
      </span>
      <span className="count">
        <DislikeButton
          disabled={ratings.updateInProgress.status === "loading"}
          highlight={rating === "disliked"}
          onClick={handleDislikeClick}
        >
          <MdThumbDown />
        </DislikeButton>
        {dislikeCount}
      </span>
    </RatingBox>
  );
};

export default RatingButtons;
