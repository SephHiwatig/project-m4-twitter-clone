import React, { useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
import SmallTweet from "./tweet/SmallTweet";
import { CurrentUserContext } from "../CurrentUserContext";

const Wrapper = styled.div`
  border: 1px solid #ccc;
  background-color: #ccc;
`;

const PageTitle = styled.h1`
  margin: 0;
  padding: 4px 10px;
  border-bottom: 1px solid #ccc;
  font-size: x-large;
  background-color: #fff;
`;

const NewPostWrapper = styled.div`
  display: flex;
  padding: 8px;
  background-color: #fff;
  margin-bottom: 8px;
`;

const ImageColumn = styled.div`
  flex: 1;
`;

const InputColumn = styled.div`
  flex: 9;
  text-align: right;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const TextAreaInput = styled.textarea`
  width: 95%;
  border: none;
  padding: 15px 5px;
  display: block;
  resize: none;
  margin-bottom: 4px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #ccc;
    font-size: x-large;
  }
`;

const CharCounter = styled.span`
  font-size: small;
  margin-right: 8px;
  color: #5c5c5c;
`;

const PostBtn = styled.button`
  background-color: ${COLORS.primary};
  color: #fff;
  border-radius: 25px;
  padding: 8px;
  border: none;
  min-width: 70px;
  cursor: pointer;
`;

const TweetListWrapper = styled.div`
  background-color: #fff;
`;

const HomeFeed = () => {
  const [feed, setFeed] = React.useState({ tweetIds: [] });

  const fetchFeed = async () => {
    const call = await fetch("http://localhost:31415/api/me/home-feed");
    const data = await call.json();
    setFeed(data);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <Wrapper>
      <PageTitle>Home</PageTitle>
      <NewPostWrapper>
        <ImageColumn>
          <UserImg src="data:image/jpeg;base64,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" />
        </ImageColumn>
        <InputColumn>
          <TextAreaInput
            rows="5"
            placeholder="What's Happening?"
          ></TextAreaInput>
          <CharCounter>280</CharCounter>
          <PostBtn>Meow</PostBtn>
        </InputColumn>
      </NewPostWrapper>
      <TweetListWrapper>
        {feed.tweetIds.map((id) => {
          return <SmallTweet key={id} tweet={feed.tweetsById[id]} />;
        })}
      </TweetListWrapper>
    </Wrapper>
  );
};

export default HomeFeed;
