import React from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { category, filterByCategory } from "../../data";

export default function Category() {
  let [searchParams] = useSearchParams();
  let search = searchParams.get("cat");

  const list = React.useMemo(() => {
    if (!search) return category;

    return filterByCategory(search);
  }, [search]);
  return (
    <Box>
      {list.map((cat) => (
        <Container key={cat.id}>
          <img src={cat.pic} alt="" />
          <h3>
            {cat.name.slice(0, 1).toUpperCase()}
            {cat.name.slice(1)}
          </h3>
          <p>Price: {cat.price}</p>
          <p>Quantity: {cat.qty}</p>
        </Container>
      ))}
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 3.5rem;
  padding: 1rem;
`;
const Container = styled.div`
  width: 30vw;
  height: 40vh;
  background-color: white;
  border-radius: 0 0 10px 10px;
  box-shadow: 3px 0 2px rgba(0, 0, 255, 0.2), -3px 0 2px rgba(0, 0, 255, 0.2);
  transition: all 1s ease;
  &:hover {
    transform: translateY(11px);
  }
  img {
    width: 30vw;
    height: 20vh;
    object-fit: cover;
  }
`;
