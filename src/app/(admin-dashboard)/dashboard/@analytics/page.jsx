import Link from "next/link";

const analytics = () => {
  return (
    <div>
      <nav>
        <Link href="/dashboard/tab1">TAB 1</Link>
        <Link href="/dashboard/tab2">TAB 2</Link>
      </nav>
      analytics
    </div>
  );
};

export default analytics;
