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
  const context = React.useContext(CurrentUserContext);

  const [feed, setFeed] = React.useState({ tweetIds: [] });

  const fetchFeed = async () => {
    const call = await fetch("http://localhost:31415/api/me/home-feed");
    const data = await call.json();
    setFeed(data);
  };

  useEffect(() => {
    fetchFeed();
  });

  const setTweet = (tweet) => {
    const newFeed = {
      ...feed,
    };

    newFeed.tweetsById[tweet.id] = tweet;

    setFeed(newFeed);
  };

  return (
    <Wrapper>
      <PageTitle>Home</PageTitle>
      <NewPostWrapper>
        <ImageColumn>
          {context.status === "idle" && (
            <UserImg src={context.currentUser.avatarSrc} />
          )}
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
          return (
            <SmallTweet
              key={id}
              tweet={feed.tweetsById[id]}
              setTweet={setTweet}
            />
          );
        })}
      </TweetListWrapper>
    </Wrapper>
  );
};

export default HomeFeed;
