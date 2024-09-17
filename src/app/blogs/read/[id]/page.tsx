"use client";
import ReadBlog from "@/components/Blog/ReadBlog";
import ReadBlogSkeleton from "@/components/Blog/ReadBlogSkeleton";
import { Message } from "@/components/Message/Message";
import { fetchBlog } from "@/helper/blogs/blogs";
import { Spinner } from "@/helper/loader/spinner";
import { RootState } from "@/lib/store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Blogs = () => {
  const dispatch = useDispatch();
  const blog = useSelector((state: RootState) => state.blog.blog);
  const params = useParams();
  const id = params.id as string;
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog(dispatch, id).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="w-full max-w-screen-2xl mx-auto flex justify-center min-h-[100vh]">
        {isLoading ? (
          // <Spinner size="lg" />
          <ReadBlogSkeleton />
        ) : blog == null ? (
          <Message
            title="No blog found"
            description="We couldn’t find the blog you were looking for. It might have been moved or deleted. Please check the URL for any typos, or explore other sections of the site to find related content."
          />
        ) : (
          <ReadBlog />
        )}
      </div>
    </>
  );
};

export default Blogs;
