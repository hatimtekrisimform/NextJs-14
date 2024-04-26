"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./links.module.css";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink/NavLink";
import Image from "next/image";
import { handleLogout } from "../../../lib/action";

const Links = ({ session }) => {
  const [open, setOpen] = useState(false);
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
            {session.user?.isAdmin && (
              <NavLink item={{ title: "Admin", path: "/admin" }} />
            )}
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>

      <Image
        src="/menu.png"
        className="menuButton"
        alt=""
        height={20}
        width={20}
        onClick={() => setOpen((pre) => !pre)}
      ></Image>
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
