import React from "react";
import styled from "styled-components";
import Actions from "./Actions";
import moment from "moment";

const TweetWrapper = styled.div`
  display: flex;
  padding: 4px 10px;
  border-bottom: 1px solid #ccc;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const ImageCol = styled.div`
  flex: 1;
`;

const InfoCol = styled.div`
  flex: 10;
`;

const Name = styled.h2`
  font-size: medium;
  margin: 0;
`;

const Username = styled.span`
  color: #757575;
  font-size: medium;
`;

const Caption = styled.p`
  margin: 8px 0;
  font-weight: 500;
`;

const Media = styled.img`
  display: block;
  width: 100%;
  border-radius: 15px;
`;

const SmallTweet = ({ tweet }) => {
  return (
    <TweetWrapper>
      <ImageCol>
        <UserImg src={tweet.author.avatarSrc} />
      </ImageCol>
      <InfoCol>
        <Name>
          {tweet.author.displayName}{" "}
          <Username>
            @{tweet.author.handle} &bull;{" "}
            {moment(tweet.timestamp).format("MMM DD")}
          </Username>
        </Name>
        <Caption>{tweet.status}</Caption>
        {tweet.media.length > 0 && <Media src={tweet.media[0].url} />}
        <Actions />
      </InfoCol>
    </TweetWrapper>
  );
};

export default SmallTweet;
