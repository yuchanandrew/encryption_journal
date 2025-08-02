import axios from "axios";
import EmotionDisplay from "./EmotionDisplay";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface PostProps {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image_url: string;
}

type UserType = {
  id: number;
  username: string;
  profile_img_url: string;
};

const PostHero = ({ id, user_id, title, content, image_url }: PostProps) => {
  const [user, setUser] = useState<UserType | null>(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/get-user/${user_id}`
      );

      setUser(response.data.user[0]);
    } catch (error) {
      console.error("Something went wrong while retrieving user", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col max-w-[75 vw] hover-primary bg-gray-50 px-4 py-6 rounded-xl space-y-4 outline-1 outline-gray-400">
      <div className="flex justify-between gap-4">
        <Link to={`/collection/posts/${id}`}>
          <h2 className="heading hover:underline">{title}</h2>
        </Link>
        <EmotionDisplay id={id} />
      </div>
      <div className="flex flex-row justify-between">
        <Link to={`/collection/posts/${id}`}>
          <p className="text-sm line-clamp-3">{content}</p>
        </Link>
        {image_url != "" && image_url != null && (
          <img className="w-48 h-48 object-cover" src={image_url} alt={title} />
        )}
      </div>
      <h2 className="text-gray-600 text-sm">
        Posted by{" "}
        <Link
          to={`/users/${user?.id}`}
          className="hover:underline hover:text-gray-800"
        >
          {user?.username}
        </Link>
      </h2>
    </div>
  );
};

export default PostHero;
