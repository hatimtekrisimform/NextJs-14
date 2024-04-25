import { connectToDb } from "./ConnectToDb";
import { Post, User } from "./models";
import { unstable_noStore as noStore } from "next/cache";
export const getPosts = async () => {
  
  try {
    await connectToDb();

    const posts = await Post.find();

    return posts;
  } catch (e) {}
};
export const getUsers = async () => {
  try {
    await connectToDb();
    const users = await User.find();
    return users;
  } catch (e) {}
};

export const getUser = async (id) => {
  noStore()
  try {
    await connectToDb();
    console.log("id in user - ", id);
    const user = await User.findById(id);
    return user;
  } catch (e) {}
};
export const getPost = async (id) => {
  await connectToDb();
  try {
    const post = await Post.findById(id);
    return post;
  } catch (e) {}
};
