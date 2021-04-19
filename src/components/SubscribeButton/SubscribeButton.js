import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectUser } from "../../features/auth/authSlice";
import { StyledSubscribeButton } from "./SubscribeButton.styled";

import {
  selectSubscriptions,
  updateSubscription,
} from "../../features/subscriptions/subscriptionsSlice";

const SubscribeButton = ({ channelId }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const subscriptions = useSelector(selectSubscriptions);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check subscription status on user/subscriptions state change
    if (user) {
      const hasSubscription = subscriptions.items.find(
        (item) => item.channel.id === channelId
      );
      setIsSubscribed(hasSubscription);
    }
  }, [user, subscriptions, channelId]);

  const handleClick = () => {
    if (user) {
      dispatch(updateSubscription(channelId));
    }
  };

  const text = isSubscribed ? "Subscribed" : "Subscribe";

  return (
    <StyledSubscribeButton
      isSubscribed={isSubscribed}
      onClick={handleClick}
      disabled={subscriptions.updateInProgress.status === "loading"}
    >
      {text}
    </StyledSubscribeButton>
  );
};

export default SubscribeButton;
