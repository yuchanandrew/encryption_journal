import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import Post from "../Components/Post";

{
  /* VISION:

User page should have the following functionalities:

1. Displays user info including username, profile picture, bio, number of posts, number of likes(?)
2. Displays a preview of recent posts, top posts(?)

*/
}

type UserType = {
  id: number;
  username: string;
  profile_img_url: string;
  bio: string;
};

type PostType = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image_url: string;
  post_date: string;
  post_time: string;
};

const UserPage = () => {
  const { user_id } = useParams();

  const [user, setUser] = useState<UserType | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/get-user/${user_id}`
      );

      setUser(response.data.user[0]);
    } catch (error) {
      console.error("Something went wrong while retrieving user", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/get-public-posts/${user_id}`
      );

      console.log("Posts:", response.data.posts);

      setPosts(response.data.posts);
    } catch (error) {
      console.error(
        "Something went wrong while displaying user's public posts",
        error
      );
    }
  };

  const handleDelete = (id: number) => {
    setPosts((posts) => posts.filter((post) => post.id !== id));

    console.log("updated posts:", posts);
  };

  useEffect(() => {
    fetchUser();
  }, [user_id]);

  useEffect(() => {
    fetchPosts();
  }, [user_id]);
  return (
    <div className="flex flex-col outer-page-div">
      <h2 className="flex page-heading">{user?.username}'s Page</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 px-2 justify-center items-start w-full">
        <div className="flex flex-col md:sticky top-6 h-fit col-span-1 rounded-xl py-3 px-6 space-y-6 bg-gray-50 outline-1 outline-gray-400 shadow-md">
          {user?.profile_img_url === null || user?.profile_img_url === "" ? (
            <IoPersonCircle size={100} />
          ) : (
            <img
              className="flex w-24 h-24 object-cover rounded-full transition-all hover:w-30 hover:h-30 cursor-pointer"
              src={user?.profile_img_url ?? undefined}
              alt={user?.username}
            />
          )}
          <h2 className="flex heading">{user?.username}</h2>
          {user?.bio === null || user?.bio === "" ? (
            <p className="flex text-sm text-gray-600">User has no bio.</p>
          ) : (
            <p className="flex text-sm text-gray-600">{user?.bio}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 px-2 col-span-2">
          {posts.reverse().map((post: PostType) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              user_id={post.user_id}
              content={post.content}
              image_url={post.image_url}
              date={post.post_date}
              time={post.post_time}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
