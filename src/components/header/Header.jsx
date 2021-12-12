import React from "react";
import styled from "styled-components";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userAction } from "../../store/userSlice";
import Slider from "../slider/Slider";

export default function Header() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
    dispatch(
      userAction.logOut({
        token: "",
        load: true,
      })
    );
    // Clearing session Storage
    sessionStorage.clear();
  };

  return (
    <Container>
      <Card>
        <Logo>
          <img src="/beens.png" alt="" />
        </Logo>
        <Wrapper>
          <Button>Cart</Button>
          <Button cart onClick={logOut}>
            LogOut
          </Button>
        </Wrapper>
      </Card>
      <Slider />
    </Container>
  );
}

const Container = styled.div``;

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
  cursor: pointer;
  img {
    width: 42px;
  }
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
