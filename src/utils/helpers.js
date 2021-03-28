export const truncateTitle = (title) =>
  title.length > 70 ? title.substr(0, 67) + "..." : title;

export const truncateDescription = (description) =>
  description.length > 150 ? description.substr(0, 147) + "..." : description;
