"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

export default function Navbar() {
  const handleNavClick = (navItem: string) => {
    posthog.capture(`nav_${navItem}_clicked`, {
      nav_item: navItem,
      nav_location: "header",
    });
  };

  return (
    <header>
      <nav>
        <Link
          href={"/"}
          className="logo"
          onClick={() => handleNavClick("logo")}
        >
          <Image src={"/icons/logo.png"} alt="logo" width={24} height={24} />

          <p>DevEvents</p>
        </Link>

        <ul>
          <Link href={"/"} onClick={() => handleNavClick("home")}>
            Home
          </Link>
          <Link href={"/"} onClick={() => handleNavClick("events")}>
            Events
          </Link>
          <Link href={"/"} onClick={() => handleNavClick("create_event")}>
            Create Event
          </Link>
        </ul>
      </nav>
    </header>
  );
}
