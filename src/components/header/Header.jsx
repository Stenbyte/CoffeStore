import React from "react";
import styled from "styled-components";
import { getAuth, signOut } from "firebase/auth";

export default function Header() {
  const auth = getAuth();
  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <Card>
      <Logo>Logo</Logo>
      <Wrapper>
        <Button>Cart</Button>
        <Button cart onClick={logOut}>
          LogOut
        </Button>
      </Wrapper>
    </Card>
  );
}

const Card = styled.div`
  background-color: var(--main);
  height: 10vh;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  width: 25vw;
  display: flex;
  justify-content: space-between;
`;
const Logo = styled.div`
  color: whitesmoke;
`;
const Button = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 3px;
  width: 10vw;
  transition: all 0.2s ease;
  background-color: ${(props) =>
    props.cart ? `var(--second)` : `var(--third)`};
  &:active {
    box-shadow: inset 0px 1px 1px var(--main), inset 1px 0px 1px var(--main),
      inset 0 -1px 2px var(--main), inset -1px 0 2px var(--main);
  }
`;
