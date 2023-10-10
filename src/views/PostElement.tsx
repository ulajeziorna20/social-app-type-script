import React, { useState } from "react";
import { ObjectContext, Post, User } from "../helpers/types";
import './PostElement.css';
import axios, { AxiosResponse } from "axios";
import { useOutletContext } from "react-router-dom";
import { datePipe } from "../helpers/dateHelpers";
import { HTTPS_REACT_APP_API_URL, HTTP_REACT_APP_API_URL } from "../react-app-env.d";


type PostProps = {
  post: Post,
  getLatestPosts: () => any,
  setPosts: (res: Post[]) => void,
  // dislikePost: (id: number) => Promise<boolean>,
  getRecommendations: () => void
}


type disfollowRes = {
  leader_id: Number,
  followed: Boolean,
  message: String
}

export default function PostElement(props: PostProps) {



  const objectContext: ObjectContext = useOutletContext();
  const userLikedInit: User | undefined = props.post.likes.find((user: User) => user.username === objectContext.loggedUser.username);
  const dateOfPost: string = datePipe(props.post.created_at);


  const [likesCount, setLikesCount] = useState<number>(props.post.likes.length);
  const [userLiked, setUserLiked] = useState<boolean>(!userLikedInit);

  const [modalVisible, setModalVisible] = useState<boolean>(false);



  // home

  const deletePost = (id: number) => {
    axios.post(`${HTTPS_REACT_APP_API_URL}/post/delete`, {
      post_id: id
    }).then(
      (response: AxiosResponse<any>) => {
        if (response.status === 200) {
          props.getLatestPosts();
        }
      }
    )
      .catch((error) => {
        console.error('An error has occurred during deleting the post:', error);
      })
  }


  const likePost = (id: number, isLiked: boolean) => {


    axios.post(`${HTTP_REACT_APP_API_URL}/post/${(isLiked ? "like" : "dislike")}`, {
      post_id: id
    })
      .then((response: AxiosResponse<any>) => {

        setLikesCount(likesCount + (isLiked ? 1 : -1))
        setUserLiked(!userLiked)

        return response.status === 201;
      })
      .catch((error) => {
        console.error('An error has occurred during liking a post:', error);
        return false;
      });
  }



  const unfollowUser = (id: number) => {
    axios.post(`${HTTPS_REACT_APP_API_URL}/follows/disfollow`, {
      leader_id: id
    }).then((response: AxiosResponse<any>) => {
      // console.log('unfollow resp', response);

      if (response.status === 201) {
        props.getRecommendations()
        props.getLatestPosts();
      }
    }
    ).catch((error) => {
      console.error('An error has occurred during setting a unfollow for an user:', error);
    });
  }






  return (
    <div className="PostsContainer" key={props.post.id}>
      <div className="SinglePost">
        <div className="SinglePostHeader">
          <img src={props.post.user?.avatar_url} alt="user avatar" />
          <h3>{props.post.user?.username}</h3>
          {
            objectContext.loggedUser.username && props.post.user?.username !== objectContext.loggedUser?.username &&
            <button type="button" className="Button SecondaryButton" onClick={() => unfollowUser(props.post.user?.id!)}>Unfollow</button>
          }
          <span className="SinglePostDate">created: {dateOfPost}</span>
        </div>
        <div className="SinglePostBody">
          <p key={props.post.id}>{props.post.content}</p>
        </div>
        <div className="SinglePostFooter">
          <span>Likes: {likesCount}</span>
          {/* {
            objectContext.loggedUser.username && objectContext.loggedUser.username === props.post.user?.username &&
            <button className="Button DangerButton" onClick={() => setModalVisible(true)}>Delete</button>
          } */}

          {
            objectContext.loggedUser.username &&
            <button className="Button PrimaryButton" onClick={() => likePost(props.post.id, userLiked)}>{userLiked ? "Like" : "Dislike"}</button>
          }
        </div>
      </div>
      {/* {modalVisible &&
        <div className="SinglePostDeleteConfirm">
          <p className="FontBold FontUppercase">Are you sure?</p>
          <div className="DeleteConfirmButtonsContainer">
            <button className="Button PrimaryButton" onClick={() => setModalVisible(false)}>CANCEL</button>
            <button className="Button DangerButton" onClick={() => {
              setModalVisible(false);
              props.deletePost(props.post.id);
            }}>DELETE</button>
          </div>
        </div>
      } */}
    </div>
  );
}
