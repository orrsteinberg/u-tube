# U-Tube

YouTube client-side clone. This is a showcase project inspired by the original YouTube website with some customization.
Built with React and Redux (using RTK, which is now recommended as the [official standard way to write Redux logic](https://redux.js.org/redux-toolkit/overview)).

## Live demo

### 👉 [Click to view live demo](https://u-tube-app.netlify.app/)

<p align="center">
  <img src="https://i.postimg.cc/mgkQVzph/screenshot-1.png" alt="U-Tube screenshot" width="380"> <img src="https://i.postimg.cc/HsBwQ42f/screenshot-2.png" alt="U-Tube screenshot" width="380">
</p>

## API proxy

In order to hide the app's private API key, I put together a bare-bones [API proxy](https://www.github.com/orrsteinberg/u-tube-api-proxy) to pass incoming requests to the official YouTube API along with the secret key.
Because YouTube has a daily quota for requests, the proxy also includes a rate limiter.

## About the app

This single-page web app uses YouTube Data API v3 for interacting with YouTube data, and Google OAuth2 for signing in/out and persisting authentication state.

#### Some of the features so far include

- [x] Browsing the most popular videos chart on the home screen.
- [x] Watching videos, along with a list of related videos and comments.
- [x] Commenting and rating videos.
- [x] Viewing and subscribing to channels.
- [x] Searching for channels and videos.
- [x] An explorer section where users can explore the most popular videos under different categories.
- [x] Subscriptions page where authenticated users can track their subscriptions.
- [x] Persistent auth using Google OAuth2.
- [x] Light/dark theme modes, persisting in local storage.
- [x] Custom and fully responsive design to support different devices.
- [x] Infinite scroll and lazy image loading for optimization and better UX.

**Have fun exploring** ✨
