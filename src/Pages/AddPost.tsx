import React, { useState } from "react";
import AutoResizeText from "../Components/AutoResizeText";
import axios from "axios";

axios.defaults.withCredentials = true;

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    // Handle on form change
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/create-post", {
        // Post title, content, and image to route
        title,
        content,
        image_url: imageUrl,
      });

      console.log("Post created:", response.data);

      // Reset all form fields!
      setTitle("");
      setContent("");
      setImageUrl("");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="outer-page-div">
      <h2 className="flex page-heading text-center">Tell your secret 🫥</h2>
      <div className="flex flex-col rounded justify-center w-full max-w-xl items-center py-6 bg-gray-200 shadow-lg">
        <form
          onSubmit={handleAdd}
          className="flex flex-col justify-center items-center space-y-6 w-10/12"
        >
          <input
            id="title"
            className="input-field bg-white text-center text-2xl"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Name your secret"
            required
          />
          <label className="flex text-center justify-center">
            What secret do you have for today?
          </label>
          {/* Refer to AutoResizeText */}
          <AutoResizeText
            value={content} // Fill in props for value, onTextChange, and placeholder (all handled in external component)
            onTextChange={setContent}
            placeholder={"Write your secret..."}
          />
          <label htmlFor="image_url">How about an image?</label>
          <input
            id="image_url"
            className="input-field w-1/2 bg-white"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Add an image"
          />
          <button className="hover-primary flex shadow-lg flex-col p-4 w-10/12 rounded-xl font-bold bg-matcha">
            Submit
          </button>
          {/* {content && (
            <button
              type="submit"
              className="hover-primary flex shadow-lg flex-col p-4 w-10/12 rounded-xl font-bold bg-matcha"
            >
              Submit
            </button>
          )} */}
        </form>
      </div>
    </div>
  );
};

export default AddPost;
