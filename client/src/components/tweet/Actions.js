import React from "react";
import styled from "styled-components";
import {
  FaRegComment,
  FaRetweet,
  FaRegHeart,
  FaHeart,
  FaShareSquare,
} from "react-icons/fa";

const Action = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;

const ButtonWrapper = styled.button`
  border: none;
  background-color: none;
`;

const Actions = ({ tweet, setTweet }) => {
  const like = async (action) => {
    const data = await fetch(
      "http://localhost:31415/api/tweet/" + tweet.id + "/like",
      {
        method: "PUT",
        body: JSON.stringify({ like: action }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const { success } = await data.json();
    if (success) {
      const updatedTweet = { ...tweet };
      if (action) {
        updatedTweet.isLiked = true;
        updatedTweet.numLikes += 1;
      } else {
        updatedTweet.isLiked = false;
        updatedTweet.numLikes -= 1;
      }
      setTweet(updatedTweet);
    }
  };

  return (
    <Action>
      <div>
        {" "}
        <FaRegComment />
      </div>
      <div>
        {" "}
        <FaRetweet /> {tweet.numRetweets > 0 ? tweet.numRetweets : ""}
      </div>
      <div>
        {" "}
        {!tweet.isLiked && (
          <ButtonWrapper onClick={like.bind(null, true)}>
            <FaRegHeart />
          </ButtonWrapper>
        )}
        {tweet.isLiked && (
          <ButtonWrapper onClick={like.bind(null, false)}>
            <FaHeart />
          </ButtonWrapper>
        )}
        {tweet.numLikes > 0 ? tweet.numLikes : ""}
      </div>
      <div>
        {" "}
        <FaShareSquare />
      </div>
    </Action>
  );
};

export default Actions;
