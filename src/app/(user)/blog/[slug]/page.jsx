import Image from "next/image";
import styles from "./DynamicBlog.module.css";
import PostUser from "../../../../components/postuser/PostUser";
import { Suspense } from "react";
import { getPost } from "../../../../lib/data";

export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  let post = await getPost(slug);

  return {
    title: post.title,
    description: post.desc,
  };
};
const getBlogData = async (id) => {
  //https://jsonplaceholder.typicode.com/posts

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    throw new Error("something went wrong");
  }
  return res.json();
};
const getBlogData3 = async (id) => {
  

  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  if (!res.ok) {
    throw new Error("something went wrong");
  }
  return res.json();
};
const DynamicBlog = async ({ params }) => {
  const { slug } = params;
  // let post = await getBlogData(slug);
  //let post = await getPost(slug);
  const post = await getBlogData3(slug);
  // console.log("single post  - ", post);
  //console.log("post user ID- ", post.userId);

  return (
    <div className={styles.container}>
      {post?.img && (
        <div className={styles.imgContainer}>
          {/* <Image src={post.img} alt="" fill className={styles.img} /> */}
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.user} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {post?.createdAt?.toString().slice(4, 16)}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  );
};

export default DynamicBlog;
