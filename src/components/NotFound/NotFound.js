import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import Error from "../Error/Error";

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 3.5rem;
    margin: 0;
    margin-top: 1rem;
  }
`;

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page not found | U-Tube</title>
      </Helmet>
      <NotFoundContainer>
        <h1>404</h1>
        <Error error="Page not found, please check that the URL is valid" />
      </NotFoundContainer>
    </>
  );
};

export default NotFound;
