import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

export default function Notification() {
  const notification = useSelector((state) => state.ui.notification);
  return (
    <Box>
      <h3>{notification?.status}</h3>
      <h4>{notification?.message}</h4>
    </Box>
  );
}
const Box = styled.div`
  width: 100%;
  height: 5rem;
  background-color: var(--violet);
  color: var(--fifth);
  font-size: 2rem;
  font-weight: 500;
`;
