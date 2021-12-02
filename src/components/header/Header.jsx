import React, { useState } from "react";
import styled from "styled-components";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userAction } from "../../store/userSlice";
import { data } from "../../data";

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
      ? setSlide(slide > 0 ? slide - 1 : data.length - 1)
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
      <ImgCard>
        {data.map((img, i) => (
          <>
            <ImgSlider
              key={img.id}
              style={{ transform: `translateX(${(i - slide) * 100}%)` }}
            >
              <img src={img.img} alt="" />
            </ImgSlider>
            <p className="left" onClick={() => slideHandler("left")}>
              Left
            </p>
            <p className="right" onClick={() => slideHandler()}>
              Right
            </p>
          </>
        ))}
      </ImgCard>
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
  height: calc(100vh - 10vh);
  margin-top: 1rem;
  max-width: 100vw;
  /* transform: scale(0.4); */
  /* overflow: hidden; */
  position: relative;
  .left,
  .right {
    position: absolute;
  }
  .left {
    top: 10rem;
    left: 1rem;
  }
  .right {
    top: 10rem;
    right: 1rem;
  }
`;
const ImgSlider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 100%;
  position: absolute;
  top: 0;
  height: 50vh;
  background-color: red;
  transition: all 1s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
