import React, { useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
import { FaMapMarkerAlt, FaRegCalendar, FaRetweet } from "react-icons/fa";
import { useParams } from "react-router-dom";
import SmallTweet from "./tweet/SmallTweet";

const ProfileWrapper = styled.div`
  border: 1px solid #ccc;
`;

const Banner = styled.img`
  width: 100%;
  height: 200px;
  display: block;
`;

const Header = styled.div`
  padding: 16px;
  margin-top: -100px;
  position: relative;
`;

const ProfilePhoto = styled.img`
  border: 3px solid #fff;
  border-radius: 75px;
  height: 150px;
  width: 150px;
`;

const FollowBtn = styled.button`
  border-radius: 15px;
  border: none;
  background-color: ${COLORS.primary};
  color: #fff;
  padding: 8px;
  min-width: 100px;
  position: absolute;
  bottom: 8px;
  right: 8px;
  cursor: pointer;
`;

const UserInfo = styled.div`
  padding: 8px;
  font-size: medium;
`;

const UserName = styled.h2`
  margin: 0;
`;

const Span = styled.span`
  color: #707070;
  margin-right: 5px;
`;

const Remeowed = styled.span`
  color: #707070;
  margin-right: 5px;
  margin-left: 30px;
`;

const FollowInfo = styled.span`
  color: #707070;
  background-color: #ebebeb;
  border-radius: 5px;
  padding: 2px 4px;
`;

const MenuTab = styled.div`
  display: flex;
  margin-top: 16px;
  font-size: large;
  font-weight: 500;
`;

const MenuItem = styled.div`
  flex: 1;
  text-align: center;
  padding: 4px;

  &:first-child {
    color: ${COLORS.primary};
    border-bottom: 2px solid ${COLORS.pripmary};
  }
`;

const TweetListWrapper = styled.div`
  background-color: #fff;
`;

const Profile = () => {
  let { profileId } = useParams();
  const [feed, setFeed] = React.useState({ tweetIds: [] });

  const fetchFeed = async () => {
    const call = await fetch(
      "http://localhost:31415/api/" + profileId + "/feed"
    );
    const data = await call.json();
    console.log(data);
    setFeed(data);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <ProfileWrapper>
      <Banner
        src="https://image.shutterstock.com/image-photo/banner-cat-web-header-template-260nw-1030847524.jpg"
        alt="Cat Photo"
      />
      <Header>
        <ProfilePhoto src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg?resize=750px:*" />
        <FollowBtn>Follow</FollowBtn>
      </Header>
      <UserInfo>
        <UserName>Name Here</UserName>
        <Span>@diplomog</Span>
        <FollowInfo>Follows You</FollowInfo>
        <p>Bestfriends with asdsadsa</p>
        <div>
          <Span>
            <FaMapMarkerAlt /> Location
          </Span>
          <Span>
            <FaRegCalendar /> Joined Oct 2020
          </Span>
        </div>
      </UserInfo>
      <MenuTab>
        <MenuItem>Tweets</MenuItem>
        <MenuItem>Media</MenuItem>
        <MenuItem>Like</MenuItem>
      </MenuTab>
      <TweetListWrapper>
        {feed.tweetIds.map((id) => {
          return (
            <div key={id}>
              {feed.tweetsById[id].retweetFrom && (
                <Remeowed>
                  <FaRetweet /> Remeowed
                </Remeowed>
              )}
              <SmallTweet tweet={feed.tweetsById[id]} />
            </div>
          );
        })}
      </TweetListWrapper>
    </ProfileWrapper>
  );
};

export default Profile;
