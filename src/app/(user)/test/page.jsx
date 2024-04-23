
import {connectToDb}  from '../../../lib/ConnectToDb'
export default async function testPage() {
    console.log("before");
    await connectToDb();
    console.log("after");
}