import React from "react";
import styled from "styled-components";

const Div = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  & p {
    text-transform: lowercase;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
`;

const Input = styled.input`
  border-radius: 0.3rem;
  padding: 0.3rem 0.4rem;
  border: none;
  background: ${(props) => props.theme.highlight};
  &:focus,
  &:not(:placeholder-shown) {
    background: white;
  }
`;

const Filter = ({ handleFilterChange, value }) => (
  <Div>
    <p>Search Phonebook:</p>
    <Input placeholder=" " value={value} onChange={handleFilterChange} />
  </Div>
);

export default Filter;
