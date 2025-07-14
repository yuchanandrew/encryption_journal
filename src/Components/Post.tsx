import axios from "axios";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import EmotionDisplay from "./EmotionDisplay";

import { Link } from "react-router-dom";

interface PostProps {
  id: number;
  title: string;
  content: string;
  image_url: string;
  date: string;
  time: string;
  onDelete: (id: number) => void;
}

const Post = ({
  id,
  title,
  content,
  date,
  time,
  image_url,
  onDelete,
}: PostProps) => {
  const handleDelete = async () => {
    const response = await axios.delete(
      `http://localhost:3000/remove-post/${id}`
    );
    console.log(response.data.message);

    onDelete(id);
  };
  return (
    <div className="flex flex-col h-72 hover-primary bg-gray-50 px-4 py-6 rounded-xl shadow space-y-4">
      <div className="flex justify-between">
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
      <div className="mt-auto flex flex-col space-y-4">
        <div className="border-1 w-full text-gray-200"></div>
        <p className="text-gray-600 text-sm">
          Posted on {date} at {time}.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleDelete}
            className="flex bg-red-300 rounded-xl shadow hover-primary p-2 justify-center"
          >
            <FaTrash />
          </button>
          <button className="flex bg-sky-300 rounded-xl shadow hover-primary p-2 justify-center">
            <FaEdit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
