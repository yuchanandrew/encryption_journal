import React, { useState } from "react";
import AutoResizeText from "../Components/AutoResizeText";
import axios from "axios";

const Home = () => {
  // const [text, setText] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // const handleTextChange = (text: string) => {
  //   setText(text.trim().length > 0);
  // };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/create-post", {
        title,
        content,
        image_url: imageUrl,
      });

      console.log("Post created:", response.data);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="flex flex-col py-6 justify-center items-center space-y-12">
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
          <label htmlFor="content" className="flex text-center justify-center">
            What secret do you have for today?
          </label>
          <AutoResizeText
            value={content}
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
          <button
            type="submit"
            className="hover-primary flex shadow-lg flex-col p-4 w-10/12 rounded-xl font-bold bg-matcha"
          >
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

export default Home;
