import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Components/Context/AuthProvider";
import { IoPersonCircle } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

// TODO: Ensure that if user is not logged in, the profile page is not accessible (404 error)

const Profile = () => {
  const auth = useContext(AuthContext);
  const [image, setImage] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);

  const [edit, setEdit] = useState(false);

  // All the edit components:
  const [editBio, setEditBio] = useState("");
  const [editImage, setEditImage] = useState("");

  if (!auth) {
    throw new Error("AuthContext must be used within AuthProvider.");
  }

  const { user, updateUser } = auth;

  // TODO: Fix the data that is parsed into UserType. For some reason, displaying user object only gives username, email, user_id...
  useEffect(() => {
    setImage(user?.profile_img_url ?? null);
    setBio(user?.bio ?? null);
  }, [edit]);

  console.log("User:", user);

  // Initial logic to setEdit to true
  const handleClick = () => {
    setEdit(!edit);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put("http://localhost:3000/update-profile", {
        id: user?.id,
        bio: editBio,
        profile_img_url: editImage,
      });

      console.log("Response message:", response.data.message);

      updateUser({ bio: editBio, profile_img_url: editImage });

      // Assuming that user presses save, setEdit back to false state
      setEdit(false);
    } catch (error) {
      console.error("Something went wrong while updating profile.", error);
    }
  };

  useEffect(() => {
    if (user !== null && user?.profile_img_url !== null) {
      setImage(user.profile_img_url);
    }
  }, [user]);

  return (
    <div className="flex flex-col outer-page-div mb-12">
      {user === null ? (
        <h2 className="flex heading">
          Error 404: No user logged in. Please sign in.
        </h2>
      ) : (
        <>
          <h2 className="flex page-heading">Profile</h2>
          {!edit ? (
            <div className="flex flex-col w-8/10 rounded-xl items-center justify-center bg-gray-50 border-3 border-gray-300 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-3 py-4">
                <div className="flex flex-col justify-center space-y-6">
                  <h2 className="flex">User: {user?.username}</h2>
                  <p className="flex">Bio: {user?.bio}</p>
                </div>
                <div className="flex flex-col justify-center space-y-6">
                  <h2 className="flex">Profile Picture</h2>
                  {image !== null && image === "" ? (
                    <img
                      className="flex"
                      src={user?.profile_img_url ?? undefined}
                      alt={user?.username}
                    />
                  ) : (
                    <IoPersonCircle size={100} />
                  )}
                </div>
                <Link to="/journal">Journal</Link>
              </div>
              <div className="flex w-full justify-end py-2 px-2">
                <button
                  onClick={handleClick}
                  className="relative py-2 px-8 bg-sky-300 rounded-xl shadow justify-self-end"
                >
                  <FaEdit size={25} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-8/10 rounded-xl items-center justify-center bg-gray-50">
              <form
                onSubmit={handleEdit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-3 py-4"
              >
                <div className="flex flex-col justify-center space-y-6">
                  <h2 className="flex">User: {user?.username}</h2>
                  <label htmlFor="bio" className="flex">
                    Bio:
                  </label>
                  <input
                    id="bio"
                    className="input-field"
                    type="text"
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                  />
                </div>
                <div className="flex flex-col justify-center space-y-6">
                  <label htmlFor="profile_img" className="flex">
                    Profile Picture
                  </label>
                  <input
                    id="profile_img"
                    className="input-field"
                    type="file"
                    value={editImage}
                    onChange={(e) => setEditImage(e.target.value)}
                  />
                </div>
                <div className="flex w-full justify-end py-2 px-2 gap-2">
                  <button className="relative py-2 px-8 bg-sky-300 rounded-xl shadow justify-self-end">
                    Save
                  </button>
                  <button
                    onClick={handleClick}
                    className="relative py-2 px-8 bg-red-300 rounded-xl shadow justify-self-end"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
