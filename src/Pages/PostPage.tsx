import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../Components/Post";

type PostType = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image_url: string;
  post_date: string;
  post_time: string;
};

const PostPage = () => {
  const { id } = useParams();

  const [post, setPost] = useState<PostType | null>(null);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/get-posts/${id}`);

      console.log("post:", response.data.post);

      setPost(response.data.post);
    } catch (error) {
      console.error("An error occurred while retrieving post:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  // Takes the id of the entry to be deleted and then creates a new array excluding post that has post.id === id
  const handleDelete = (id: number) => {
    id = id;
    setPost(null);
  };

  return (
    <div className="outer-page-div">
      <h2 className="page-heading flex">Post #{id}</h2>
      {post ? (
        <div className="flex w-1/2 min-w-1/2 justify-center">
          <Post
            id={post.id}
            title={post.title}
            user_id={post.user_id}
            content={post.content}
            image_url={post.image_url}
            date={post.post_date}
            time={post.post_time}
            onDelete={handleDelete}
          />
        </div>
      ) : (
        <p className="emotion-analysis-heading">
          Could not find post with post ID {id} 🕵️
        </p>
      )}
    </div>
  );
};

export default PostPage;
