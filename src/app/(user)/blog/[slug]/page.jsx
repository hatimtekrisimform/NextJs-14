import Image from "next/image";
import styles from "./DynamicBlog.module.css";
import PostUser from "../../../../components/postuser/PostUser";
import { Suspense } from "react";

export const generateMetadata = async ({ params }) => {
  const { slug } = params;

  const post = {
    title:slug,
    desc:slug
  }

  return {
    title: post.title,
    description: post.desc,
  };
};

const DynamicBlog = ({ params }) => {
  const { slug } = params;

  const post = {
    img:"",
    title:slug,
    userId:"test id",
    createdAt:"",
    desc:slug
  }
  return (
    <div className={styles.container}>
      {post.img && (
        <div className={styles.imgContainer}>
          <Image src={post.img} alt="" fill className={styles.img} />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {post.createdAt.toString().slice(4, 16)}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  );
};

export default DynamicBlog;
