import PostCard from "../../../components/postcard/PoastCard";
import styles from "./blog.module.css";

const blogs = async () => {
  const posts = [
    {
      img: "/contact.png",
      createdAt: "",
      title: "Test",
      body: "Body",
      slug: "test",
    },
    {
        img: "/contact.png",
      createdAt: "",
      title: "Test 2",
      body: "Body 2",
      slug: "test2",
    },
    {
        img: "/contact.png",
      createdAt: "",
      title: "Test 3",
      body: "Body 3",
      slug: "test3",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <PostCard post={posts[0]} />
      </div>
      <div className={styles.post}>
        <PostCard post={posts[1]}  />
      </div>
      <div className={styles.post}>
        <PostCard post={posts[2]}  />
      </div>
     
    </div>
  );
};

export default blogs;
