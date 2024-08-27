import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { FaAngleUp } from "react-icons/fa6";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
interface DropdownItem {
  href: string;
  text: string;
}

interface DropdownType {
  title: string;
  items: DropdownItem[];
  className?: string;
  breakpoint?: string;
}

export default function DropdownMenuDemo({
  title,
  items,
  className,
  breakpoint,
}: DropdownType) {
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center outline-none",
          breakpoint === "sm"
            ? ""
            : "transition-colors hover:text-foreground/80",
          pathname.startsWith("/courses") && breakpoint !== "sm"
            ? "text-foreground"
            : breakpoint != "sm"
            ? "text-foreground/60"
            : ""
        )}
      >
        {title}{" "}
        <FaAngleUp
          className={cn(
            "ml-2 transition-colors hover:text-foreground/80",
            pathname.startsWith("/courses")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((value, index) => (
          <Link key={index} href={value.href}>
            {" "}
            <DropdownMenuItem key={index}>{value.text}</DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
