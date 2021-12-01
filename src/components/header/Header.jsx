import React, { useState } from "react";
import styled from "styled-components";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userAction } from "../../store/userSlice";
import { data } from "../../data";
import { current } from "@reduxjs/toolkit";
export default function Header() {
  const [slide, setSlide] = useState(0);
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
  const slideHandler = (way) => {
    way === "left"
      ? setSlide(slide > 0 ? slide - 1 : 2)
      : setSlide(slide < data.length - 1 ? slide + 1 : 0);
  };
  return (
    <Container>
      <Card>
        <Logo>Logo</Logo>
        <Wrapper>
          <Button>Cart</Button>
          <Button cart onClick={logOut}>
            LogOut
          </Button>
        </Wrapper>
      </Card>
      <ImgCard style={{ transform: `translateX(-${slide * 100}vw)` }}>
        {data.map((img) => (
          <ImgSlider key={img.id}>
            <img src={img.img} alt="" />
          </ImgSlider>
        ))}
      </ImgCard>
      <p className="left" onClick={() => slideHandler("left")}>
        Left
      </p>
      <p className="right" onClick={() => slideHandler()}>
        Right
      </p>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .left,
  .right {
    position: absolute;
  }
  .left {
    top: 10rem;
  }
  .right {
    top: 10rem;
    right: 10rem;
  }
`;

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
const ImgCard = styled.div`
  height: calc(70vh - 10vh);
  background-color: red;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  transition: all 1s ease;
`;
const ImgSlider = styled.div`
  background-color: white;
  height: 20rem;
  margin: 0 1rem;
  width: 100vw;
  display: flex;
  align-items: center;
  /* position: absolute;
  left: 0; */
  justify-content: center;
  img {
    width: 5rem;
    height: 5rem;
  }
`;
