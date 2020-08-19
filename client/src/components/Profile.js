import React, { useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
import { FaMapMarkerAlt, FaRegCalendar, FaRetweet } from "react-icons/fa";
import { useParams } from "react-router-dom";
import SmallTweet from "./tweet/SmallTweet";
import moment from "moment";
import { CurrentUserContext } from "../CurrentUserContext";

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
  const context = React.useContext(CurrentUserContext);
  const [profileInfo, setProfileInfo] = React.useState({});
  const [feed, setFeed] = React.useState({ tweetIds: [] });

  const fetchProfile = async () => {
    const profile = await fetch(
      "http://localhost:31415/api/" + profileId + "/profile"
    );
    const profileData = await profile.json();
    setProfileInfo(profileData.profile);

    const feed = await fetch(
      "http://localhost:31415/api/" + profileId + "/feed"
    );
    const feedData = await feed.json();
    setFeed(feedData);
  };

  useEffect(() => {
    fetchProfile();
  }, [profileId]);

  const follow = async (action) => {
    const data = await fetch(
      "http://localhost:31415/api/" + profileId + "/" + action,
      { method: "PUT" }
    );
    const { success } = await data.json();
    console.log(success);
    if (success) {
      const newProfileInfo = {
        ...profileInfo,
      };
      if (action === "follow") {
        newProfileInfo.isBeingFollowedByYou = true;
      } else if (action === "unfollow") {
        newProfileInfo.isBeingFollowedByYou = false;
      }
      setProfileInfo(newProfileInfo);
    }
  };

  const setTweet = (tweet) => {
    const newFeed = {
      // tweetIds: { ...tweet.tweetIds },
      // tweetsById: { ...tweet.tweetsById },
      ...feed,
    };
    newFeed.tweetsById[tweet.id] = tweet;

    setFeed(newFeed);
  };

  return (
    <ProfileWrapper>
      {profileInfo && (
        <>
          <Banner src={profileInfo.bannerSrc} alt="Cat Photo" />
          <Header>
            <ProfilePhoto src={profileInfo.avatarSrc} />
            {context.currentUser &&
              context.currentUser.handle !== profileId &&
              !profileInfo.isBeingFollowedByYou && (
                <FollowBtn onClick={follow.bind(null, "follow")}>
                  Follow
                </FollowBtn>
              )}
            {context.currentUser &&
              context.currentUser.handle !== profileId &&
              profileInfo.isBeingFollowedByYou && (
                <FollowBtn onClick={follow.bind(null, "unfollow")}>
                  Unfollow
                </FollowBtn>
              )}
          </Header>
          <UserInfo>
            <UserName>{profileInfo.displayName}</UserName>
            <Span>@diplomog</Span>
            {profileInfo.isFollowingYou && <FollowInfo>Follows You</FollowInfo>}
            <p>{profileInfo.bio}</p>
            <div>
              <Span>
                <FaMapMarkerAlt /> {profileInfo.location}
              </Span>
              <Span>
                <FaRegCalendar /> Joined{" "}
                {moment(profileInfo.joined).format("MMM YYYY")}
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
                  <SmallTweet tweet={feed.tweetsById[id]} setTweet={setTweet} />
                </div>
              );
            })}
          </TweetListWrapper>
        </>
      )}
    </ProfileWrapper>
  );
};

export default Profile;
