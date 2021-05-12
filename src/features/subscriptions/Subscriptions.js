import React from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import { selectSubscriptions } from "./subscriptionsSlice";
import { selectUser } from "../auth/authSlice";
import HorizontalChannelItem from "../../components/HorizontalChannelItem/HorizontalChannelItem";
import Error from "../../components/Error/Error";
import Spinner from "../../components/Spinner/Spinner";

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

      {status === "loading" && <Spinner />}
      {status === "failed" && <Error error={error} />}
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
