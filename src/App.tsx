import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import "./index.css";
import Home from "./Pages/AddPost";
import Register from "./Pages/Register";

import axios from "axios";
import AddPost from "./Pages/AddPost";
import Collection from "./Pages/Collection";

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* TODO: Add more pages here when made */}
          <Route path="/create-post" element={<AddPost />} />
          <Route path="/register" element={<Register />} />
          <Route path="/collection" element={<Collection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
