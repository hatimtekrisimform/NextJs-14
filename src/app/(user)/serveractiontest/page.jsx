import React from "react";
import { addPost, deletePost } from "../../../lib/action";

function page() {
  const serveractionFunc = async () => {
    "use server";
    console.log("it works");
  };

  return (
    <div>
      <form action={addPost}>
        <input type="text" placeholder="title" name="title" ></input>
        <input type="text" placeholder="desc" name="desc" ></input>
        <input type="text" placeholder="slug" name="slug" ></input>
        <input type="text" placeholder="user id" name="userId" ></input>
        <button>Create Post</button>
      </form>
      <form action={deletePost} >
      <input type="text" placeholder="title" name="id" ></input>
      <button>Delete Post</button>
      </form>
    </div>
  );
}

export default page;
