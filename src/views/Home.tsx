import React, { useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import { Post } from "../types";
import './Home.css';
import PostElement from "./PostElement";

export default function Home() {


  const API_URL = "https://akademia108.pl/api/social-app";

  const [posts, setPosts] = useState<Post[]>([]);

  const getLatestPosts = () => {
    axios.post(`${API_URL}/post/latest`).then(
      (response: AxiosResponse<any>) => {
        // how to map to correct interface type?
        console.log(response.data);
        setPosts(response.data as Post[]);
      }
    )
      .catch((error) => {
        console.error('An error has occured:', error);
      })
  }

  const getNextPosts = () => {
    axios.post(`${API_URL}/post/older-then`, {
      date: posts[posts.length - 1].created_at
    }).then(
      (response: AxiosResponse<any>) => {
        // how to map to correct interface type?
        console.log(response);
        setPosts(posts.concat(response.data as Post[]));
      }
    )
      .catch((error) => {
        console.error('An error has occured:', error);
      })
  }

  useEffect(() => {
    getLatestPosts();
  }, []);




  return (
    <div className="HomeContainer">
      <div className="PostList">
        {posts.map(
          (post: Post) => {
            return <PostElement post={post} key={post.id}></PostElement>
          }
        )}
      </div>
      <button className="LoadMoreButton" onClick={getNextPosts}>Load more</button>
    </div>
  )
}