import { useContext, useEffect, useState } from "react";
import AuthContext from "../Components/Context/AuthProvider";
import axios from "axios";
import Post from "../Components/Post";

const base_url = "api";

// Borrowed assets from Collection.tsx to replicate journal feature
type PostType = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image_url: string;
  post_date: string;
  post_time: string;
};

const monthNames: Record<string, string> = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

const PrivateJournal = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    const monthFormat = monthNames[month];

    return `${monthFormat} ${day}, ${year}`;
  };
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext must be used within AuthProvider.");
  }

  const { user, accessToken } = auth;

  // If the user is authorized, posts that are unique to the user should be queried
  useEffect(() => {
    if (user === null) {
      console.log("User is unauthorized");
    } else {
      const fetchJournal = async () => {
        try {
          // Make sure that accessToken is passed through for authentication
          const response = await axios.get(
            `${base_url}/get-posts/users/${user.id}`,
            {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const posts = response.data.posts;

          console.log("Posts:", posts);

          setPosts(posts);

          const uniqueDates = Array.from(
            new Set(posts.map((post: PostType) => post.post_date))
          ) as string[];

          setDates(uniqueDates);
        } catch (error) {
          console.error(
            `Something went wrong while retrieving private journal for user with id ${user.id}`,
            error
          );
        }
      };

      fetchJournal();
    }
  }, [user, accessToken]);

  const handleDelete = (id: number) => {
    setPosts((posts) => posts.filter((post) => post.id !== id));

    console.log("updated posts:", posts);
  };

  return (
    <div className="flex flex-col outer-page-div mb-12">
      {user === null ? (
        <h2 className="flex heading">
          Error 404: No user logged in. Please sign in.
        </h2>
      ) : (
        <>
          <h2 className="flex page-heading">Your Private Journal ✏️</h2>
          {/* Borrowed asset from Collection.tsx */}
          {dates
            .slice()
            .reverse()
            .map((date) => (
              <div key={date} className="flex w-full flex-col px-4">
                {/* Input the default formatted date into the custom format */}
                <h2 className="heading mb-4">{formatDate(date)}</h2>
                <div className="border-2 rounded-xl w-full text-gray-300 mb-4"></div>
                <div className="flex justify-center">
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Mapping the posts: filter() ensures that dates stay within their given date of creation */}
                    {posts
                      // Slicing and reversing (yet again) to ensure most recent post appears first
                      .slice()
                      .reverse()
                      .filter((post: PostType) => post.post_date === date)
                      .map((post: PostType) => (
                        <Post
                          key={post.id}
                          id={post.id}
                          title={post.title}
                          user_id={post.user_id}
                          content={post.content}
                          image_url={post.image_url}
                          date={post.post_date}
                          time={post.post_time}
                          clamp_mode={true}
                          onDelete={handleDelete}
                        />
                      ))}
                  </div>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PrivateJournal;
