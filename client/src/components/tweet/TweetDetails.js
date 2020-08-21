import React, { useEffect } from "react";
import styled from "styled-components";
import Actions from "./Actions";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";

const InfoCol = styled.div`
  flex: 10;
  border: 1px solid #ccc;
  padding: 4px 10px;
`;

const Name = styled.h2`
  font-size: x-large;
  display: flex;
`;

const Username = styled.span`
  color: #757575;
  font-size: medium;
  display: block;
`;

const Caption = styled.p`
  margin: 8px 0;
  font-weight: 500;
  margin: 16px 0px;
`;

const Media = styled.img`
  display: block;
  width: 100%;
  border-radius: 15px;
  margin: 16px 0px;
`;

const NavigationLink = styled(NavLink)`
  cursor: pointer;
  text-decoration: none;
  color: #000;
`;

const PageTitle = styled.h1`
  margin: 0;
  border-bottom: 1px solid #ccc;
  font-size: x-large;
  background-color: #fff;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 8px;
`;

const TweetDetails = () => {
  let { tweetId } = useParams();
  const [tweet, setTweet] = React.useState(null);
  const fetchTweet = async () => {
    const tweetData = await fetch(
      "http://localhost:31415/api/tweet/" + tweetId
    );
    const tempData = await tweetData.json();
    setTweet(tempData.tweet);
  };

  useEffect(() => {
    fetchTweet();
  }, []);

  return (
    <InfoCol>
      <PageTitle>Meow</PageTitle>
      {tweet && (
        <>
          <Name>
            <UserImg src={tweet.author.avatarSrc} />
            <div>
              <NavigationLink to={"/diplomog"} exact>
                {tweet.author.displayName}
              </NavigationLink>
              <Username>@{tweet.author.handle}</Username>
            </div>
          </Name>
          <Caption>{tweet.status}</Caption>
          {tweet.media.length > 0 && <Media src={tweet.media[0].url} />}
          <Username>
            {moment(tweet.timestamp).format("hh:mm A")} &bull;{" "}
            {moment(tweet.timestamp).format("MMM DD YYYY")} &bull; Critter Web
            App
          </Username>
          <Actions tweet={tweet} setTweet={setTweet} />
        </>
      )}
    </InfoCol>
  );
};

export default TweetDetails;
