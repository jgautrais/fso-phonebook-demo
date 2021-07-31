import React from "react";
import styled from "styled-components";

const Div = styled.div`
  padding: 1rem 2%;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  text-align: center;
  background: rgb(255, 235, 215);
  animation: showA 1s ease;
  position: absolute;
  width: 70%;
  left: 12.5%;
  border: 3px solid ${(props) => (props.class === "success" ? "green" : "red")};
  box-shadow: 0 10px 20px 15px rgba(0, 0, 0, 0.25);

  @keyframes showA {
    from {
      opacity: 50%;
      transform: scale(0);
      max-height: 0;
    }

    to {
      opacity: 100%;
      transform: scale(1);
      max-height: 100%;
    }
  }
`;

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <Div class={`${message.type}`}>{message.text}</Div>;
};

export default Notification;
