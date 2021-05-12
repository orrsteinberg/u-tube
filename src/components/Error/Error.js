import React from "react";

import { ErrorContainer } from "./Error.styled";

const Error = ({ error }) => {
  return (
    <ErrorContainer>
      <h4>{error}</h4>
    </ErrorContainer>
  );
};

export default Error;
