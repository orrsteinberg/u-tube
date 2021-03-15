import React from "react";
import styled from "styled-components";

import Video from "../../components/Video/Video";

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const HomeView = () => {
  return (
    <Row>
      {[...Array(20)].map((x, i) => (
        <Video key={i} />
      ))}
    </Row>
  );
};

export default HomeView;
