import { NextResponse } from "next/server";
import { connectToDb } from "../../../../lib/ConnectToDb";
import { Post } from "../../../../lib/models";

export const GET = async (request, { params }) => {
  const { slug } = params;
  try {
    await connectToDb();

    const post = await Post.findById(slug);
    console.log({ post });
    return NextResponse.json(post);
  } catch (e) {}
};
