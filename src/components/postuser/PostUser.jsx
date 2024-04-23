import { getUser } from "../../lib/data";
import styles from "./PostUser.module.css";
import Image from "next/image";

const getUserData = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) {
    throw new Error("something went wrong");
  }
  return res.json();
};

const PostUser = async ({ userId }) => {
  // let user = await getUserData(userId);

  //  console.log("userId - ", userId);
  let user = await getUser(userId);
  console.log("user - ", user, userId);

  return (
    <div className={styles.container}>
      {/* <Image
        className={styles.avatar}
        src={user.img ? user.img : "/noavatar.png"}
        alt=""
        width={50}
        height={50}
      /> */}
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{user.username}</span>
      </div>
    </div>
  );
};

export default PostUser;
