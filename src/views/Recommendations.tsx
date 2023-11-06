import React from "react";
import "./Recommendations.css";
import { User } from "../helpers/types";
import UserFollowElement from "./UserFollowElement";
import axios, { AxiosResponse } from "axios";
import { HTTPS_REACT_APP_API_URL, HTTP_REACT_APP_API_URL } from "../react-app-env.d";

type RecommendationsProps = {
  recommendations: User[],
  getLatestPosts: () => void,
  getRecommendations:  () => void,

}

export default function Recommendations(props: RecommendationsProps) {


  console.log(props.recommendations);
  

  return (
    <div className="RecommendationsContainer">

      <h2>Recommendations</h2>
      <div className="RecommendationsUsersList">
        {props.recommendations.map(
          (user: User) => {
            // remember: here is only passing the reference to a function, not calling it out!
            return <UserFollowElement
              user={user}
              key={user.id}
              getLatestPosts={props.getLatestPosts}
              getRecommendations={props.getRecommendations}
            />

          }
        )}
        {/* {
          props.recommendations.length < 1 && <p className="FontItalic">No recommendations found.</p>
        } */}
      </div>
    </div>
  );
}