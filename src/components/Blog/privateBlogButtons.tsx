import Link from "next/link";
import { Button } from "../ui/button";
import { Popup } from "../popup/popup";
import { deleteBlog } from "@/helper/blogs/blogs";
import { Edit, Trash2 } from "lucide-react";

interface Props {
  blogId: string;
  fetchBlog: (...args: any[]) => void;
}

export function PrivateBlogButtons({ blogId, fetchBlog }: Props) {
  return (
    <>
      <div className="flex gap-2">
        <Button asChild variant="outline" size="icon">
          <Link href={"/blogs/update/" + blogId}>
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Link>
        </Button>
        <Popup
          title="Are you sure?"
          description="This action cannot be undone. This will permanently delete your blog and remove this blog data from our servers"
          onContinue={async () => {
            let isDeleted = await deleteBlog(blogId);
            if (isDeleted) fetchBlog();
          }}
        >
          <Button variant="outline" size="icon">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </Popup>
      </div>
    </>
  );
}
