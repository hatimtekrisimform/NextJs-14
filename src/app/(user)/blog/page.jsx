import PostCard from "../../../components/postcard/PoastCard";
import styles from "./blog.module.css";

const getBlogsData = async () => {
  //https://jsonplaceholder.typicode.com/posts

  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("something went wrong");
  }
  return res.json();
};
const blogs = async () => {
  let posts = await getBlogsData();
  posts = posts.map((data) => {
    return {
      ...data,
      img: "/contact.png",
      createdAt: "",
      slug: "test" + data.userId,
    };
  });
  // const posts = [
  //   {
  //     img: "/contact.png",
  //     createdAt: "",
  //     title: "Test",
  //     body: "Body",
  //     slug: "test",
  //   },
  //   {
  //       img: "/contact.png",
  //     createdAt: "",
  //     title: "Test 2",
  //     body: "Body 2",
  //     slug: "test2",
  //   },
  //   {
  //       img: "/contact.png",
  //     createdAt: "",
  //     title: "Test 3",
  //     body: "Body 3",
  //     slug: "test3",
  //   },
  // ];
  return (
    <div className={styles.container}>
      {posts.map((post) => {
        return (
          <div className={styles.post}>
            <PostCard post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default blogs;
