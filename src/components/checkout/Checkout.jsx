import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { uiAction } from "../../store/uiSlice";
import { productAction } from "../../store/productSlice";
// Helper function
const isEmpty = (value) => value.trim() === "";
//
export default function Checkout() {
  const dispatch = useDispatch();
  const switchHandler = () => {
    dispatch(uiAction.switchCheck());
  };

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    second: true,
    city: true,
  });
  const nameRef = useRef();
  const secondRef = useRef();
  const cityRef = useRef();
  const checkoutHandler = (e) => {
    e.preventDefault();
    const first = nameRef.current.value;
    const second = secondRef.current.value;
    const city = cityRef.current.value;
    // checking if valid
    const firstIsValid = !isEmpty(first);
    const secondIsValid = !isEmpty(second);
    const cityIsValid = !isEmpty(city);

    //
    setFormInputValidity({
      name: firstIsValid,
      second: secondIsValid,
      city: cityIsValid,
    });

    const formIsValid = firstIsValid && secondIsValid && cityIsValid;
    if (!formIsValid) {
      return;
    }
    //submit data
    dispatch(
      productAction.replaceCart({
        product: [],
        qty: 0,
        totalPrice: 0,
      })
    );
    // Reseting states
    dispatch(uiAction.showCart());
    dispatch(uiAction.confirm());
    dispatch(uiAction.switchCheck());
  };
  return (
    <React.Fragment>
      <Back onSubmit={checkoutHandler}>
        <label htmlFor="name">First Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formInputValidity.name && <p>Please enter a valid first name</p>}
        <label htmlFor="second" id="second">
          Second name
        </label>
        <input type="text" id="second" ref={secondRef} />
        {!formInputValidity.second && <p>Please enter a valid second name</p>}
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formInputValidity.city && <p>Please enter a valid city</p>}
        <div>
          <Btn type="button" onClick={switchHandler}>
            Cancel
          </Btn>
          <Btn type="submit">Confirm</Btn>
        </div>
      </Back>
    </React.Fragment>
  );
}

const Back = styled.form`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* opacity: 0.4; */
  position: absolute;
  top: 0;
  label {
    color: black;
    font-size: 1.1rem;
  }
  input {
    padding: 0.3rem;
  }
  p {
    color: var(--fourth);
    padding: 0.2rem 0;
  }
`;
const Btn = styled.button`
  padding: 0.5rem;
  width: 5rem;
  margin: 1rem 0.5rem 0 0;
  background-color: white;
  border: none;
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover {
    background-color: var(--green);
  }
`;
