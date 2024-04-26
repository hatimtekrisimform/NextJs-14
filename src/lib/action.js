"use server";
import { revalidatePath } from "next/cache";
import { connectToDb } from "./ConnectToDb";
import { Post, User } from "./models";
import { redirect } from "next/navigation";
import { signIn, signOut } from "./auth";

export const addPost = async (formData) => {
  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    await connectToDb();
    const user = await User.findById(userId);

    const newPost = new Post({
      title,
      desc,
      slug,
      user,
      img: "",
    });

    await newPost.save();
    revalidatePath("/blog");
    console.log("save to db");
  } catch (e) {
    console.log({ e });
  }

  console.log({ title, desc, slug });
};

export const deletePost = async (formData) => {
  try {
    const { id } = Object.fromEntries(formData);

    await Post.findByIdAndDelete(id);
  } catch (e) {
    console.log({ e });
  }
  revalidatePath("/blog");
  redirect("/blog");
};

export const githubLogin = async () => {
  await signIn("github");
};
export const handleLogout = async () => {
  await signOut("github");
};
