import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full h-auto py-12 bg-ultra-violet min-h-[75vh]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 px-8">
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

        {/* About me card! */}
        <div className="footer-column-div col-span-2">
          <div className="grid grid-cols-2 gap-12 bg-gray-200 rounded-xl p-4 shadow-xl border-3 border-gray-400">
            <div className="flex flex-col">
              <h2 className="text-xl text-gray-700">About Me</h2>
              <div className="name-underline"></div>
              <div className="flex flex-col space-y-2">
                <h2 className="flex text-lg text-gray-700 mt-4 font-medium">
                  Andrew Rho
                </h2>
                <p className="flex text-sm text-gray-500">
                  Computer science undergrad at the University of Colorado
                  Boulder. Aspiring software developer.
                </p>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <Link to="https://github.com/yuchanandrew">
                    <FaGithub size={25} className="about-icon" />
                  </Link>
                  <Link to="https://www.linkedin.com/in/andrew-rho-4b3940154/">
                    <FaLinkedin size={25} className="about-icon" />
                  </Link>
                  <Link to="https://www.instagram.com/yuchanandrew/">
                    <FaInstagram size={25} className="about-icon" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="photo-wrapper justify-center items-center">
                <img
                  src="../public/headshot.JPG"
                  alt="Andrew Rho"
                  className="about-photo justify-self-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-24">
        <p className="flex text-sm text-gray-200">© 2025 Andrew Rho</p>
      </div>
    </div>
  );
};

export default Footer;
