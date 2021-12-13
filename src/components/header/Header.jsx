import React from "react";
import styled from "styled-components";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userAction } from "../../store/userSlice";
import Slider from "../slider/Slider";
import { Link } from "react-router-dom";
import { category } from "../../data";
import { Outlet, useSearchParams } from "react-router-dom";

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
  // Link styling if Active
  function CatLink({ name, children }) {
    let [searchParams] = useSearchParams();
    let isActive = searchParams.get("cat") === name;

    return (
      <Link
        to={`/?cat=${name}`}
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
          <Button>Cart</Button>
          <Button cart onClick={logOut}>
            LogOut
          </Button>
        </Wrapper>
      </Card>
      <Slider />
      <UL>
        <h3>Filter by category:</h3>
        <li>
          <Link to="/">ALL</Link>
        </li>
        {category.map((cat) => (
          <li key={cat.id}>
            <CatLink name={cat.name}>{cat.name.toUpperCase()}</CatLink>
          </li>
        ))}
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
`;
const Logo = styled.div`
  cursor: pointer;
  img {
    width: 42px;
  }
`;
const Wrapper = styled.div`
  width: 25vw;
  display: flex;
  justify-content: space-between;
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
const UL = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 45vw;
  margin: 0.3rem 0 1rem 1rem;
  padding: 1rem;
  border-radius: 10px;
  list-style-type: none;
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
