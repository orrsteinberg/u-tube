import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { loadUserData, clearUserData } from "../features/auth/authSlice";

const useGoogleAuth = () => {
  const [authInstance, setAuthInstance] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize gapi if no current auth instance exists
    if (window.gapi && !authInstance) {
      window.gapi.load("client:auth2", () => {
        window.gapi.auth2
          .init({
            client_id: process.env.REACT_APP_OAUTH2_CLIENT_ID,
            scope: "https://www.googleapis.com/auth/youtube.force-ssl",
          })
          .then(() => {
            // Update auth instance after client initialization
            const updateAuthInstance = () => {
              const auth = window.gapi.auth2.getAuthInstance();
              setAuthInstance(auth);
            };

            updateAuthInstance();

            // Listen for signIn/signOut and update local state
            window.gapi.auth2
              .getAuthInstance()
              .isSignedIn.listen(() => updateAuthInstance());
          });
      });
    }
  }, [authInstance]);

  useEffect(() => {
    // On auth state change, dispatch appropriate action
    if (authInstance) {
      const isSignedIn = authInstance.isSignedIn.get();

      if (isSignedIn) {
        const profile = authInstance.currentUser.get().getBasicProfile();

        const userData = {
          name: profile.getName(),
          avatar: profile.getImageUrl(),
          accessToken: authInstance.currentUser.fe.qc.access_token,
        };

        dispatch(loadUserData(userData));
      } else {
        dispatch(clearUserData());
      }
    }
  }, [authInstance, dispatch]);

  const signIn = () => {
    window.gapi?.auth2?.getAuthInstance().signIn();
  };

  const signOut = () => {
    window.gapi?.auth2?.getAuthInstance().signOut();
  };

  return { signIn, signOut };
};

export default useGoogleAuth;
