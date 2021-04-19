import React from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import { selectSubscriptions } from "./subscriptionsSlice";
import { selectUser } from "../auth/authSlice";
import HorizontalChannelItem from "../../components/HorizontalChannelItem/HorizontalChannelItem";

const Subscriptions = () => {
  const user = useSelector(selectUser);
  const { status, error, items } = useSelector(selectSubscriptions);

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
          {items.map((item) => (
            <HorizontalChannelItem
              subscription
              channel={item.channel}
              key={item.channel.id}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Subscriptions;
