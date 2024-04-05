import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <nav>
        <Link href="/dashboard/tab1">Tab 1</Link>
        <Link href="/dashboard/tab2">Tab 2</Link>
      </nav>
      <div>
        analytics layout
      </div>
      <div>{children}</div>
    </>
  );
}
