import { connectToDb } from "../../../lib/ConnectToDb";
import { NextResponse } from "next/server";
import {Post} from '../../../lib/models'

export const GET =  async (request)=>{
    try{

        await connectToDb();
        const posts = await Post.find();

        return NextResponse.json(posts)

    } catch(e){
       
         throw new Error("faled to fetch blogs")
    }
}