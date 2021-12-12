import React, { useState } from "react";
import styled from "styled-components";
import { data } from "../../data";
import left from "../../img/left-arrow.png";
import right from "../../img/arrow-right.png";
export default function Slider() {
  const [slide, setSlide] = useState(0);
  // Slider movement
  const slideHandler = (way) => {
    way === "left"
      ? setSlide(slide > 0 ? slide - 1 : data.length - 1)
      : setSlide(slide < data.length - 1 ? slide + 1 : 0);
  };
  // Text change on slider
  let text;
  switch (slide) {
    case 0:
      text = "Drink Fresh";
      break;
    case 1:
      text = "Galvanizing";
      break;
    case 2:
      text = "Coffee";
      break;
    case 3:
      text = "Everyday";
      break;
    default:
      break;
  }
  //Dot handler
  const dotHandler = (e) => {
    let { slide } = e.target.dataset;
    setSlide(+slide);
  };

  return (
    <ImgCard>
      {data.map((img, i) => (
        <>
          <ImgSlider
            key={img.id}
            style={{ transform: `translateX(${(i - slide) * 100}%)` }}
          >
            <img src={img.img} alt="" />
          </ImgSlider>
          <Typo>
            <p>{text}</p>
          </Typo>
          <Dots data-slide={0} left="47%" onClick={dotHandler}></Dots>
          <Dots data-slide={1} left="49%" onClick={dotHandler}></Dots>
          <Dots data-slide={2} left="51%" onClick={dotHandler}></Dots>
          <Dots data-slide={3} left="53%" onClick={dotHandler}></Dots>
          <img
            src={left}
            alt=""
            className="left"
            onClick={() => slideHandler("left")}
          />
          <img
            src={right}
            alt=""
            className="right"
            onClick={() => slideHandler()}
          />
        </>
      ))}
    </ImgCard>
  );
}
const ImgCard = styled.div`
  height: calc(100vh - 10vh);
  margin-top: 1rem;
  max-width: 100vw;
  /* transform: scale(0.4); */
  overflow: hidden;
  position: relative;
  .left,
  .right {
    position: absolute;
  }
  .left {
    top: 23%;
    left: 1.2rem;
    width: 4rem;
    filter: invert(1);
  }
  .right {
    top: 23%;
    right: 1.2rem;
    width: 4rem;
    filter: invert(1);
  }
`;
const Typo = styled.div`
  width: 20rem;
  position: absolute;
  top: 23%;
  left: 49vw;
  p {
    color: white;
    font-size: 3rem;
    font-weight: 300;
    z-index: 100;
  }
`;
const Dots = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: ${(props) => props.left};
  background-color: ${(props) => (props.active ? "var(--green)" : "white")};
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
  /* background-color: red; */
  transition: all 1s ease;
  filter: saturate(1.3) sepia(1.9) contrast(0.5);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;
