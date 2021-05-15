import React from "react";
import PropTypes from "prop-types";

import { ErrorContainer } from "./Error.styled";

const Error = ({ error }) => {
  return (
    <ErrorContainer>
      <h4>{error}</h4>
    </ErrorContainer>
  );
};

Error.propTypes = {
  error: PropTypes.string.isRequired,
}

export default Error;
