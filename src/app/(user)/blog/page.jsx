import PostCard from "../../../components/postcard/PoastCard";
import styles from "./blog.module.css";
import { getPosts } from "../../../lib/data";
import { connectToDb } from "../../../lib/ConnectToDb";
import { Suspense } from "react";

export const metadata = {
  title: "Blog Page",
  description: "Blog description",
};

const getBlogsData = async () => {
  //https://jsonplaceholder.typicode.com/posts

  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("something went wrong");
  }
  return res.json();
};
const getBlogsData2 = async () => {
  const res = await getPosts();

  return res;
};
const getBlogsData3 = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("something went wrong");
  }
  return res.json();
};
export const revalidate = 0;
const blogs = async () => {
  console.log("blog page ");

  //let posts = await getBlogsData();
  let posts = await getBlogsData3();
  console.log("post list - ", posts);
  posts = posts?.map((data) => {
    return {
      ...data,
      img: "/contact.png",
      createdAt: "",
      slug: "test" + data.userId,
    };
  });

  return (
    <div className={styles.container}>
      <Suspense fallback="Loading...">
        {posts?.map((post) => {
          return (
            <div className={styles.post}>
              <PostCard key={post.user} post={post} />
            </div>
          );
        })}
      </Suspense>
    </div>
  );
};

const PostList = async () => {};

export default blogs;
