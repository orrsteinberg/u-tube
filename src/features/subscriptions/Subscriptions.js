import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";

import {
  fetchSubscriptions,
  selectSubscriptions,
  subscriptionsLoginRequired,
} from "./subscriptionsSlice";
import { selectUser } from "../auth/authSlice";
import HorizontalChannelItem from "../../components/HorizontalChannelItem/HorizontalChannelItem";

const Subscriptions = () => {
  const user = useSelector(selectUser);
  const { status, error, channels } = useSelector(selectSubscriptions);
  const dispatch = useDispatch();

  useEffect(() => {
    // Only fetch data if the user is logged in
    if (user) {
      dispatch(fetchSubscriptions());
    } else {
      dispatch(subscriptionsLoginRequired());
    }
  }, [user, dispatch]);

  return (
    <>
      <Helmet>
        {user ? (
          <title>{user.name}'s subscriptions | U-Tube</title>
        ) : (
          <title>Subscriptions | U-Tube</title>
        )}
      </Helmet>

      {status === "loading" && <h3>Loading subscriptions...</h3>}
      {status === "failed" && <h3>{error}</h3>}
      {status === "succeeded" && (
        <>
          {channels.map((channel) => (
            <HorizontalChannelItem
              subscription
              channel={channel}
              key={channel.id}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Subscriptions;
