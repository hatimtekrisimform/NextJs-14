"use client";
import React from "react";
import Link from "next/link";
import styles from "./links.module.css";
import { usePathname } from "next/navigation";
import NavLink from './NavLink/NavLink'

const Links = ({ session }) => {
  const pathName = usePathname();
  const links = [
    {
      title: "Home Page",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
    {
      title: "Blog",
      path: "/blog",
    },
    {
      title: "Test",
      path: "/test",
    },
  ];
  return (
    <div className={styles.container}>
    <div className={styles.links}>
      {links.map((link) => (
        <NavLink item={link} key={link.title} />
      ))}
      {session?.user ? (
        <>
          {session.user?.isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
          <form action={handleLogout}>
            <button className={styles.logout}>Logout</button>
          </form>
        </>
      ) : (
        <NavLink item={{ title: "Login", path: "/login" }} />
      )}
    </div>
    </div>
  );
};

export default Links;
