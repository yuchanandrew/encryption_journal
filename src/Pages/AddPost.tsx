import React, { useContext, useState } from "react";
import AutoResizeText from "../Components/AutoResizeText";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Components/Context/AuthProvider";

axios.defaults.withCredentials = true;

const base_url = "api";

const AddPost = () => {
  const navigateToPost = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [toggle, setToggle] = useState(false);

  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext must be used within AuthProvider.");
  }

  const { user } = auth;

  // TODO: Add an alert to let user know that they must be logged in to make a post

  const handleAdd = async (e: React.FormEvent) => {
    // Handle on form change
    e.preventDefault();

    try {
      const post_response = await axios.post(`${base_url}/create-post`, {
        // Post title, content, and image to route
        title,
        user_id: user?.id,
        content,
        image_url: imageUrl,
        public_mode: toggle,
      });

      console.log("Post created:", post_response.data);

      const post = post_response.data.post;

      const emotion_response = await axios.post(`${base_url}/emotion`, {
        text: post.content,
      });

      const resultEmotion = emotion_response.data.js_emotion.emotion;

      const add_emotion_response = await axios.post(`${base_url}/add-emotion`, {
        id: post.id,
        emotion: resultEmotion,
      });

      console.log("message:", add_emotion_response.data.message);

      navigateToPost(`/collection/posts/${post.id}`);

      // Reset all form fields!
      setTitle("");
      setContent("");
      setImageUrl("");
      setToggle(false);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="outer-page-div">
      <h2 className="flex page-heading text-center">What's on your mind? 🫥</h2>
      <div className="flex flex-col rounded-xl justify-center w-full max-w-xl items-center py-6 mb-20 bg-gray-200 shadow-lg">
        <form
          onSubmit={handleAdd}
          className="flex flex-col justify-center items-center space-y-6 w-10/12"
        >
          <input
            id="title"
            className="input-field bg-white text-center text-xl"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your post a title"
            required
          />
          <label className="flex text-center justify-center">
            How do you feel about today?
          </label>
          {/* Refer to AutoResizeText */}
          <AutoResizeText
            value={content} // Fill in props for value, onTextChange, and placeholder (all handled in external component)
            onTextChange={setContent}
            placeholder={"Write your thoughts..."}
          />
          <label>Want an audience?</label>
          <input
            id="privacy"
            type="checkbox"
            className="hidden"
            onChange={() => setToggle(!toggle)}
          />
          <label
            htmlFor="privacy"
            className={`toggle-btn ${toggle ? "toggled" : ""}`}
          >
            <div className="thumb"></div>
          </label>
          {/* <label htmlFor="image_url">How about an image?</label>
          <input
            id="image_url"
            className="input-field w-1/2 bg-white"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Add an image"
          /> */}
          <button className="hover-primary flex shadow-lg flex-col p-4 w-10/12 rounded-xl font-bold bg-green-300 border-2 border-green-500">
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
