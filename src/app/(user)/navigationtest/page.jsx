"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const page = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const q = searchParams.get("q");

  console.log("q - ", q);

  console.log("path name - ", pathName);
  const handleClick = () => {
    router.push("/");
  };
  return (
    <div>
      <Link href="/">Click Here</Link>
      <button onClick={handleClick}>Write and Redirect</button>
    </div>
  );
};

export default page;
