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
export const login = async (formData) => {
  console.log("login - 1")
  const { username, password } = Object.fromEntries(formData);
  console.log("login - 2 - ",username,password)
  try {
    await signIn("credentials", { username, password });
    console.log("success login")
  } catch (e) {
    console.log("login - 3 - ",e)
  }
};
export const handleLogout = async () => {
  await signOut("github");
};
export const register = async (previousState, formData) => {
  console.log("register func called");
  const { username, email, password, passwordRepeat } =
    Object.fromEntries(formData);
  console.log({ username, email, password, passwordRepeat });
  if (password !== passwordRepeat) {
    return { error: "password do not match" };
  }

  try {
    await connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "user already exsist" };
    }

    const newUser = new User({
      username,
      email,
      password,
      img: "",
      isAdmin: false,
    });
    newUser.save();
    return { success: true };
  } catch (e) {
    console.log({ e });
  }
};
