import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { uiAction } from "../../store/uiSlice";
export default function Modal() {
  const dispatch = useDispatch();
  const closeHandler = () => {
    dispatch(uiAction.confirm());
  };
  const Backdrop = () => {
    return (
      <Back>
        <h2>Purchase was successful. Thank you!</h2>
        <Btn type="button" onClick={closeHandler}>
          X
        </Btn>
      </Back>
    );
  };
  return ReactDOM.createPortal(
    <Backdrop />,
    document.getElementById("backdrop")
  );
}
const Back = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 20%;
  left: 30%;
  height: 5rem;
  width: 35rem;
  background-color: white;
  padding: 0.5rem;
  z-index: 10;
`;
const Btn = styled.button`
  padding: 0.4rem;
  cursor: pointer;
  border: none;
  background-color: var(--green);
`;
