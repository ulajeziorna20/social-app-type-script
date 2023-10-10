import React from "react";
import { User } from "../helpers/types";
import "./UserFollowElement.css";
import axios, { AxiosResponse } from "axios";
import { HTTPS_REACT_APP_API_URL, HTTP_REACT_APP_API_URL } from "../react-app-env.d";


type UserFollowElementProps = {
  user: User,
  getLatestPosts: () => void,
  getRecommendations: () => void,
}

export default function UserFollowElement(props: UserFollowElementProps) {



  const followUser = (id: number) => {
    axios.post(`${HTTPS_REACT_APP_API_URL}/follows/follow`, {
      leader_id: id
    }).then((response: AxiosResponse<any>) => {
      console.log('resp2', response);

      if (response.status === 201) {
        props.getRecommendations()
        props.getLatestPosts();
  
      }
    })
      .catch((error) => {
        console.error('An error has occurred during setting a follow for an user:', error);
      });
  }



  return (
    <div className="RecommendationsUserElement">
      <img src={props.user.avatar_url} alt={'user ' + props.user.username + ' avatar'} />
      <h4>{props.user.username}</h4>
      <button type="button" className="Button PrimaryButton" onClick={() => followUser(props.user.id)}>Follow</button>
    </div>
  );
}