import PostCard from "../../../components/postcard/PoastCard";
import styles from "./blog.module.css";
import { getPosts } from "../../../lib/data";
import { connectToDb } from "../../../lib/ConnectToDb";

const getBlogsData = async () => {
  //https://jsonplaceholder.typicode.com/posts

  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("something went wrong");
  }
  return res.json();
};
const getBlogsData2 = async () => {
  //https://jsonplaceholder.typicode.com/posts

  const res = await getPosts();

  return res;
};
export const revalidate = 0;
const blogs = async () => {
  console.log("blog page ");
  await connectToDb();
  //let posts = await getBlogsData();
  let posts = await getBlogsData2();
 // console.log("post list - ", posts);
  posts = posts?.map((data) => {
    return {
      ...data._doc,
      img: "/contact.png",
      createdAt: "",
      slug: "test" + data.userId,
    };
  });

  return (
    <div className={styles.container}>
      {posts?.map((post) => {
        return (
          <div className={styles.post}>
            <PostCard key={post.user} post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default blogs;
