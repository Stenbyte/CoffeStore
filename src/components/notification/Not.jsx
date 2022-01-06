import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { productAction } from "../../store/productSlice";

export default function Not() {
  const dispatch = useDispatch();
  // closing error modal
  const closeHandler = () => {
    dispatch(productAction.closeErr());
  };
  return (
    <Box>
      <h3>Sorry you have reached product limit</h3>
      <span onClick={closeHandler} style={{ cursor: "pointer" }}>
        X
      </span>
    </Box>
  );
}
const Box = styled.div`
  width: 40rem;
  height: 7rem;
  background-color: var(--fifth);
  color: white;
  font-size: 2rem;
  font-weight: 500;
  position: absolute;
  top: 7rem;
  left: 10%;
  z-index: 100;
  padding: 1rem;
  display: flex;
`;
