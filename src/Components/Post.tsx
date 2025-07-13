import axios from "axios";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import EmotionAnalyzer from "./EmotionAnalyzer";

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
    <div className="flex flex-col bg-matcha px-4 py-6 rounded shadow space-y-4">
      <div className="flex justify-between">
        <h2 className="heading">{title}</h2>
        <EmotionAnalyzer id={id} content={content} />
      </div>
      <div className="flex flex-row justify-between">
        <p className="">{content}</p>
        {image_url != "" && image_url != null && (
          <img className="w-48 h-48 object-cover" src={image_url} alt={title} />
        )}
      </div>
      <p className="text-gray-600 text-sm">
        Posted on {date} at {time}.
      </p>
      <div className="flex justify-between">
        <button
          onClick={handleDelete}
          className="flex bg-red-300 rounded-xl shadow hover-primary p-3 w-2/5 justify-center"
        >
          <FaTrash />
        </button>
        <button className="flex bg-sky-300 rounded-xl shadow hover-primary p-3 w-2/5 justify-center">
          <FaEdit />
        </button>
      </div>
    </div>
  );
};

export default Post;
