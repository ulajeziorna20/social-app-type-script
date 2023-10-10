import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import { ObjectContext, Post, User } from "../helpers/types";
import './Home.css';
import PostElement from "./PostElement";

import { useOutletContext } from "react-router-dom";
import { HTTPS_REACT_APP_API_URL, HTTP_REACT_APP_API_URL } from "../react-app-env.d";
import Recommendations from "./Recommendations";

export default function Home() {


  const objectContext: ObjectContext = useOutletContext();

  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [recommendations, setRecommendations] = useState<User[]>([]);



  axios.defaults.headers.common['Authorization'] = "Bearer " + (objectContext.loggedUser?.jwt_token.length > 0 ? objectContext.loggedUser.jwt_token : '');

  const isLoggedUser = () => {
    return objectContext.loggedUser?.jwt_token.length > 0;
  }


  const getLatestPosts = () => {
    axios.post(`${HTTP_REACT_APP_API_URL}/post/latest`)
    .then( (response: AxiosResponse<Post[]>) => {

      console.log('wchodze');
      
        setPosts(response.data);

      }).catch((error) => {
        console.error('An error has occured:', error);
      })
  }

  const getNewestPosts = () => {
    axios.post(`${HTTPS_REACT_APP_API_URL}/post/newer-then`, {
      date: posts[0].created_at
    }).then(
      (response: AxiosResponse<Post[]>) => {
        // how to map to correct interface type?
        setPosts((response.data).concat(posts));
      }
    )
      .catch((error) => {
        console.error('An error has occured:', error);
      })
  }

  const getOlderPosts = () => {

    axios.post(`${HTTPS_REACT_APP_API_URL}/post/older-then`, {
      date: posts[posts.length - 1].created_at
    }).then((response: AxiosResponse<Post[]>) => {


      console.log(response);

      // how to map to correct interface type?
      setPosts(posts.concat(response.data));
    }
    )
      .catch((error) => {
        console.error('An error has occured:', error);
      })
  }


  const addNewPost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(`${HTTPS_REACT_APP_API_URL}/post/add`, {
      content: newPostContent
    }).then(
      (response: AxiosResponse<any>) => {
        if (response.status === 200) {
          setNewPostContent('');
          getNewestPosts();
        }
      }
    )
      .catch((error) => {
        console.error('An error has occurred during adding new post:', error);
      })
  }


 

  const getRecommendations = () => {
    axios.post(`${HTTPS_REACT_APP_API_URL}/follows/recommendations`)
      .then( (response: AxiosResponse<User[]>) => {
          if (response.status === 200) {
            setRecommendations(response.data);
          }
        }
      )
      .catch((error) => {
        console.error('An error has occurred during getting recommendations:', error);
      });
  }




  useEffect(() => {
    getLatestPosts();
    if (isLoggedUser()) {
      getRecommendations();
    }
  }, [objectContext.loggedUser]);




  return (
    <div className="HomeContainer">
      {objectContext.loggedUser.jwt_token.length > 0 &&
        <div className="NewPostContainer">
          <form className="NewPostForm" onSubmit={(event: FormEvent<HTMLFormElement>) => addNewPost(event)}>
            <textarea rows={3}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewPostContent(e.target.value)}
              value={newPostContent}
              className="NewPostTextarea"
              placeholder="Write new post" />
            <button className="Button PrimaryButton">Add</button>
          </form>
        </div>
      }

      {objectContext.loggedUser.jwt_token.length > 0 &&
        <Recommendations recommendations={recommendations} getLatestPosts={getLatestPosts} getRecommendations={getRecommendations} />
      }
      <div className="PostList">
        <h2>Posts</h2>
        {posts.map(
          (post: Post) => {
            return <PostElement
              post={post}
              key={post.id}
              getLatestPosts={getLatestPosts}
              setPosts={setPosts}
              getRecommendations={getRecommendations}
            />
          }
        )}
      </div>
      <button className="Button PrimaryButton LoadMoreButton" onClick={getOlderPosts}>Load more</button>
    </div>
  )
}
