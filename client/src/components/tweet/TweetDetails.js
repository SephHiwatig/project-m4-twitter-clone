import React, { useEffect } from "react";
import styled from "styled-components";
import Actions from "./Actions";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";

const InfoCol = styled.div`
  flex: 10;
`;

const Name = styled.h2`
  font-size: x-large;
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

const NavigationLink = styled(NavLink)`
  cursor: pointer;
  text-decoration: none;
  color: #000;
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
      {tweet && (
        <>
          <Name>
            <NavigationLink to={"/diplomog"} exact>
              {tweet.author.displayName}
            </NavigationLink>
            <Username>@{tweet.author.handle}</Username>
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
