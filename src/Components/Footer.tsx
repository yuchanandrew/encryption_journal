import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full h-auto py-12 bg-ultra-violet">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-8">
        <div className="footer-column-div">
          <h2 className="footer-column-header">Pages</h2>
          <Link to="/home" className="footer-column-contents">
            Home
          </Link>
          <Link to="/register" className="footer-column-contents">
            Register
          </Link>
          <Link to="/sign-in" className="footer-column-contents">
            Sign In
          </Link>
          <Link to="/collection" className="footer-column-contents">
            Collective
          </Link>
          {/* TODO: Add user auth!! */}
          <Link to="/create-post" className="footer-column-contents">
            Add a Post
          </Link>
        </div>
        <div className="footer-column-div">
          <h2 className="footer-column-header">Resources</h2>
          {/* TODO: Make these actual landing pages. These do not exist as of 8/1/2025 */}
          <Link to="/" className="footer-column-contents">
            Tutorial
          </Link>
          <Link to="/" className="footer-column-contents">
            Blogs
          </Link>
          <Link to="/" className="footer-column-contents">
            Articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
