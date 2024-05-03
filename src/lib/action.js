"use server";
import { revalidatePath } from "next/cache";
import { connectToDb } from "./ConnectToDb";
import { Message, Post, User } from "./models";
import { redirect } from "next/navigation";
import { signIn, signOut } from "./auth";

export const addPost = async (previousState, formData) => {
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
    revalidatePath("/admin");
    console.log("save to db");
  } catch (e) {
    console.log({ e });
  }

  console.log({ title, desc, slug });
};
export const deletePost = async (previousState, formData) => {
  try {
    const { id } = Object.fromEntries(formData);

    await Post.findByIdAndDelete(id);
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (e) {
    console.log({ e });
  }

  redirect("/blog");
};
export const githubLogin = async () => {
  await signIn("github");
};
export const login = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  const user = await signIn("credentials", { username, password });
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

export const deleteUser = async (previousState, formData) => {
  try {
    const { id } = Object.fromEntries(formData);
    await Post.deleteMany({ user: id });
    await User.findByIdAndDelete(id);
  } catch (e) {
    console.log({ e });
  }
  revalidatePath("/admin");
};
export const addUser = async (previousState, formData) => {
  const { username, email, password } = Object.fromEntries(formData);

  try {
    await connectToDb();
    const newUser = new User({
      username,
      email,
      password,
      isAdmin: false,
    });

    newUser.save();
  } catch (e) {}
  revalidatePath("/admin");
};

export const addMessage = async (formData) => {
  const { name, email, mobile, message } = Object.fromEntries(formData);

  try {
    await connectToDb();
    const newMessage = new Message({
      name,
      email,
      mobile,
      message,
    });
    await newMessage.save();
    formData.reset();
  } catch (e) {}
};
