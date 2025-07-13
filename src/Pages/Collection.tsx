import React, { useEffect, useState } from "react";
import Post from "../Components/Post";
import axios from "axios";

type PostType = {
  id: number;
  title: string;
  content: string;
  image_url: string;
  post_date: string;
  post_time: string;
};

const Collection = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:3000/get-posts");
    const posts = await response.data.posts;

    console.log("list of posts:", posts);

    setPosts(posts);
  };

  // Takes the id of the entry to be deleted and then creates a new array excluding post that has post.id === id
  const handleDelete = (id: number) => {
    setPosts((posts) => posts.filter((post) => post.id !== id));

    console.log("updated posts:", posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="outer-page-div">
      <h2 className="page-heading flex">Let's reveal your secrets 🤯</h2>
      <div className="w-8/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {posts.map((post: PostType) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            image_url={post.image_url}
            date={post.post_date}
            time={post.post_time}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Collection;
