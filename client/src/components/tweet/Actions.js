import React from "react";
import styled from "styled-components";
import {
  FaRegComment,
  FaRetweet,
  FaRegHeart,
  FaShareSquare,
} from "react-icons/fa";

const Action = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;

const Actions = () => {
  return (
    <Action>
      <FaRegComment />
      <FaRetweet />
      <FaRegHeart />
      <FaShareSquare />
    </Action>
  );
};

export default Actions;
