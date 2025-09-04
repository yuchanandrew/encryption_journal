import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import EmotionDisplay from "./EmotionDisplay";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const base_url = "api";

interface PostProps {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image_url: string;
  date: string;
  time: string;
  clamp_mode: boolean;
  onDelete: (id: number) => void;
}

type UserType = {
  id: number;
  username: string;
  profile_img_url: string;
};

const Post = ({
  id,
  user_id,
  title,
  content,
  date,
  time,
  image_url,
  clamp_mode,
  onDelete,
}: PostProps) => {
  const [user, setUser] = useState<UserType | null>(null);

  const handleDelete = async () => {
    const response = await axios.delete(`${base_url}/remove-post/${id}`);
    console.log(response.data.message);

    onDelete(id);
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${base_url}/get-user/${user_id}`);

      setUser(response.data.user[0]);
    } catch (error) {
      console.error("Something went wrong while retrieving user", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-72 hover-primary bg-gray-50 px-4 py-6 rounded-xl space-y-4 outline-1 outline-gray-400">
      <div className="flex justify-between">
        <Link to={`/collection/posts/${id}`}>
          <h2 className="heading hover:underline">{title}</h2>
        </Link>
        <EmotionDisplay id={id} />
      </div>
      <div className="flex flex-row justify-between">
        <Link to={`/collection/posts/${id}`}>
          {clamp_mode ? (
            <p className="text-sm line-clamp-3">{content}</p>
          ) : (
            <p className="text-sm">{content}</p>
          )}
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
      <div className="mt-auto flex flex-col space-y-4">
        <div className="border-1 w-full text-gray-200"></div>
        <p className="text-gray-600 text-sm">
          Posted on {date} at {time}.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleDelete}
            className="flex bg-red-300 rounded-xl shadow hover-primary p-2 justify-center border-2 border-red-400"
          >
            <FaTrash />
          </button>
          <button className="flex bg-sky-300 rounded-xl shadow hover-primary p-2 justify-center border-2 border-sky-400">
            <FaEdit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
