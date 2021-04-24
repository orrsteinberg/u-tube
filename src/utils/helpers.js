// Truncate text
export const truncateTitle = (title) =>
  title.length > 70 ? title.substr(0, 67) + "..." : title;

export const truncateDescription = (description) =>
  description.length > 150 ? description.substr(0, 147) + "..." : description;

export const truncateSubscriptionTitle = (title) =>
  title.length > 18 ? title.substr(0, 15) + "..." : title;

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
