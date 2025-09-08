import { useEffect, useState } from "react";
import Post from "../Components/Post";
import axios from "axios";

const base_url = "api";

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

const Collection = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  // SOLUTION: Formatting dates by creating a record and creating a global function for each individual
  // date to be passed into
  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    const monthFormat = monthNames[month];

    return `${monthFormat} ${day}, ${year}`;
  };

  const fetchPosts = async () => {
    const response = await axios.get(`${base_url}/get-posts`);
    const posts = await response.data.posts;

    console.log("list of posts:", posts);

    setPosts(posts);

    // Get an array that has all the unique dates from posts
    const uniqueDates = Array.from(
      new Set(posts.map((post: PostType) => post.post_date))
    ) as string[];

    setDates(uniqueDates);
  };

  // Takes the id of the entry to be deleted and then creates a new array excluding post that has post.id === id
  const handleDelete = (id: number) => {
    setPosts((posts) => posts.filter((post) => post.id !== id));

    console.log("updated posts:", posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="outer-page-div mb-20">
      <h2 className="page-heading flex">What others are saying 🤯</h2>
      {/* Map the dates: split() creates mutable copy of dates, reverse() reverses the copied array */}
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
    </div>
  );
};

export default Collection;
