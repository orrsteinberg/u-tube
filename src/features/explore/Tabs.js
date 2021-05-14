import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

import {
  IoMusicalNotes,
  IoGameController,
  IoNewspaper,
  IoTrophy,
  IoHappy,
} from "react-icons/io5";
import { selectExplore } from "./exploreSlice";
import { TabsContainer, TabLink, StyledTab } from "./Tabs.styled";

const Tab = ({ title, icon }) => {
  const { currentCategory } = useSelector(selectExplore);
  const { url } = useRouteMatch();

  return (
    <TabLink to={`${url}/${title}`}>
      <StyledTab isActive={title === currentCategory}>
        {icon} <h2>{title}</h2>
      </StyledTab>
    </TabLink>
  );
};

const Tabs = () => {
  return (
    <TabsContainer>
      <Tab title="music" icon={<IoMusicalNotes />} />
      <Tab title="gaming" icon={<IoGameController />} />
      <Tab title="news" icon={<IoNewspaper />} />
      <Tab title="sports" icon={<IoTrophy />} />
      <Tab title="comedy" icon={<IoHappy />} />
    </TabsContainer>
  );
};

Tab.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
}

export default Tabs;
