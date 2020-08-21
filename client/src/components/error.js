import React, { useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
import { u1F4A3 as bomb } from "react-icons-kit/noto_emoji_regular/u1F4A3";
import { Icon } from "react-icons-kit";

const Wrapper = styled.div`
  display: flex;
  padding: 5%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  min-height: 200px;
`;

const ErrorPage = () => {
  return (
    <Wrapper>
      <Icon size={32} icon={bomb} />
      <h1>An Unknown error occured.</h1>
      <p>
        Please try refreshing the page, or <a href="#">contact support</a> if
        the problem persist
      </p>
    </Wrapper>
  );
};

export default ErrorPage;
