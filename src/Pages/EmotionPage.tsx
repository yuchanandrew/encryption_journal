import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../Components/Post";

const base_url = "api";

type PostType = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image_url: string;
  post_date: string;
  post_time: string;
};

const EmotionPage = () => {
  const { emotion } = useParams();

  const [listOfPosts, setListsOfPosts] = useState<PostType[]>([]);

  const fetchTaggedPosts = async () => {
    try {
      const response = await axios.get(`${base_url}/emotion/${emotion}`);

      const taggedPosts = response.data.posts;

      setListsOfPosts(taggedPosts);
    } catch (error) {
      console.error(
        "Something went wrong while retrieving posts with emotion type",
        error
      );
    }
  };

  // Takes the id of the entry to be deleted and then creates a new array excluding post that has post.id === id
  const handleDelete = (id: number) => {
    setListsOfPosts((listOfPosts) =>
      listOfPosts.filter((post) => post.id !== id)
    );
  };

  useEffect(() => {
    fetchTaggedPosts();
  }, [emotion]);
  return (
    <div className="outer-page-div mb-12">
      <h2 className="page-heading flex">#{emotion}</h2>
      <div className="px-4 w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {listOfPosts.map((post: PostType) => (
          <Post
            key={post.id}
            id={post.id}
            user_id={post.user_id}
            title={post.title}
            content={post.content}
            image_url={post.image_url}
            date={post.post_date}
            time={post.post_time}
            clamp_mode={true}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default EmotionPage;
