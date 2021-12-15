import React from "react";
import styled from "styled-components";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userAction } from "../../store/userSlice";
import Slider from "../slider/Slider";
import { Link } from "react-router-dom";
import { names } from "../../data";
import { Outlet, useSearchParams } from "react-router-dom";
import cart from "../../img/cart.png";
import { useSelector } from "react-redux";

export default function Header() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  console.log(product);
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
  // Link styling if Active
  function CatLink({ name, children, props }) {
    let [searchParams] = useSearchParams();
    let isActive = searchParams.get("cat") === name;

    return (
      <Link
        to={`/?cat=${name}`}
        {...props}
        style={{ color: isActive ? `var(--violet)` : `var(--third)` }}
      >
        {children}
      </Link>
    );
  }
  return (
    <Container>
      <Card>
        <Logo>
          <Link to="/">
            <img src="/beens.png" alt="" />
          </Link>
        </Logo>
        <Wrapper>
          <Button>
            <img src={cart} alt="" />
            <span>1</span>
          </Button>
          <Button
            cart
            onClick={logOut}
            style={{ color: "white", letterSpacing: "3px" }}
          >
            LOGOUT
          </Button>
        </Wrapper>
      </Card>
      <Slider />
      <UL>
        <h3>Filter by category:</h3>
        <li>
          <Link to="/">ALL</Link>
        </li>
        {names.map((cat) => (
          <li key={cat}>
            <CatLink name={cat}>{cat.toUpperCase()}</CatLink>
          </li>
        ))}
        <Span>Created By: Sten Scheifel</Span>
      </UL>

      <Outlet />
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
  position: sticky;
  top: 0;
  z-index: 10;
`;
const Logo = styled.div`
  cursor: pointer;
  img {
    width: 42px;
  }
`;
const Wrapper = styled.div`
  min-width: 15vw;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 0.1rem;
  border: none;
  border-radius: 3px;
  min-width: 7vw;
  transition: all 0.2s ease;
  position: relative;
  cursor: pointer;
  background-color: ${(props) =>
    props.cart ? `var(--green)` : `var(--third)`};
  &:active {
    box-shadow: inset 0px 1px 1px var(--main), inset 1px 0px 1px var(--main),
      inset 0 -1px 2px var(--main), inset -1px 0 2px var(--main);
  }
  img {
    width: 32px;
    height: 32px;
  }
  span {
    position: absolute;
    top: 0.5vh;
    right: 1vw;
    background-color: var(--violet);
    min-width: 17px;
    padding: 1px;
    color: var(--third);
    border-radius: 3px;
  }
`;
const UL = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 45vw;
  margin: 0.3rem 0 1rem 1rem;
  padding: 1rem;
  border-radius: 10px;
  list-style-type: none;
  position: relative;
  background-color: var(--second);
  h3 {
    color: var(--main);
    font-weight: 400;
  }
  li {
    color: var(--third);
    a {
      color: var(--third);
      text-decoration: none;
      letter-spacing: 2px;
      &:focus {
        color: var(--violet);
      }
    }
  }
`;
const Span = styled.span`
  position: absolute;
  top: 3%;
  right: -53vw;
  font-weight: 300;
`;
