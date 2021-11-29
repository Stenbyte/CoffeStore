import React from "react";
import styled from "styled-components";

export default function Login() {
  return (
    <Card>
      <Wrap></Wrap>
    </Card>
  );
}

const Card = styled.div`
  height: 100vh;
  background-color: var(--third);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrap = styled.div`
  background-color: var(--main);
  width: 40vw;
  border-radius: 3px;
  height: 60vh;
`;
