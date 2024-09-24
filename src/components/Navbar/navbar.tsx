"use client";
import React, { useEffect, useState } from "react";
import Dropdown from "@/components/dropdown/dropdown";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../mode-toggle";
import MobileNavbar from "./mobile-navbar";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/lib/store";
import { fetchUser } from "@/helper/authentication/isUserAvailable";
import Profile from "../profile/profile";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    const loadUser = async () => {
      await fetchUser(dispatch);
      setLoading(false);
    };
    loadUser();
  }, []);

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <div className="flex items-center">
            <div className="md:hidden block">
              <MobileNavbar user={user} loading={loading} />
            </div>
            <Link href="/" passHref>
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                ByteBlog
              </span>
            </Link>
          </div>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-dropdown"
          >
            <nav className="flex items-center gap-4 text-sm lg:gap-6">
              <Link
                href="/"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/" ? "text-foreground" : "text-foreground/60"
                )}
              >
                Home
              </Link>

              <Link
                href="/blogs"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/blogs"
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                Blogs
              </Link>

              {!loading
                ? user !== null && (
                    <>
                      <Link
                        href="/blogs/my"
                        className={cn(
                          "transition-colors hover:text-foreground/80",
                          pathname === "/blogs/my"
                            ? "text-foreground"
                            : "text-foreground/60"
                        )}
                      >
                        MyBlogs
                      </Link>
                      <Link
                        href="/blogs/add"
                        className={cn(
                          "transition-colors hover:text-foreground/80",
                          pathname === "/blogs/add"
                            ? "text-foreground"
                            : "text-foreground/60"
                        )}
                      >
                        Add Blog
                      </Link>
                    </>
                  )
                : null}
            </nav>
          </div>
          <div className="flex">
            {!loading ? (
              user === null ? (
                <div className="mx-3 hidden md:block">
                  <Link
                    className="text-[14px] md:text-[15px] font-medium text-[#666666] dark:text-white"
                    href={"/login"}
                  >
                    <Button className="mx-2 text-sm" size={"sm"}>
                      Login
                    </Button>
                  </Link>
                  <Link
                    className="text-[14px] md:text-[15px] font-medium text-[#666666] dark:text-white"
                    href={"/register"}
                  >
                    <Button size={"sm"} className="text-sm">
                      Register
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="mx-2 mr-4">
                  <Profile profileImage={user?.profileImage} />
                </div>
              )
            ) : null}

            <ModeToggle />
          </div>
        </div>
      </header>
    </>
  );
}
