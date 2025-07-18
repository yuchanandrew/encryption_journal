import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import "./index.css";
import Home from "./Pages/Home";
import Register from "./Pages/Register";

import axios from "axios";
import AddPost from "./Pages/AddPost";
import Collection from "./Pages/Collection";
import EmotionPage from "./Pages/EmotionPage";
import PostPage from "./Pages/PostPage";
import SignIn from "./Pages/SignIn";
import SignOutPage from "./Pages/SignOutPage";
import Profile from "./Pages/Profile";

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* TODO: Add more pages here when made */}
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<AddPost />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-out-confirmation" element={<SignOutPage />} />
          <Route path="/collection" element={<Collection />} />
          <Route
            path="/collection/emotions/:emotion"
            element={<EmotionPage />}
          />
          <Route path="/collection/posts/:id" element={<PostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
