"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ProfileSettingsNavigation() {
  const pathname = usePathname();

  return (
    <>
      <nav
        className="grid gap-4 text-sm text-muted-foreground"
        x-chunk="dashboard-04-chunk-0"
      >
        <Link
          href="/user/settings"
          className={
            pathname == "/user/settings" ? "font-semibold text-primary" : ""
          }
        >
          Profile
        </Link>
        <Link
          href="/user/settings/change-password"
          className={
            pathname == "/user/settings/change-password"
              ? "font-semibold text-primary"
              : ""
          }
        >
          Change Password
        </Link>
      </nav>
    </>
  );
}
