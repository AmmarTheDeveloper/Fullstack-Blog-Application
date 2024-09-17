"use client";
import Blog from "@/components/Blog/Blog";
import BlogSkeleton from "@/components/Blog/BlogSkeleton";
import { Message } from "@/components/Message/Message";
import { Button } from "@/components/ui/button";
import { getMyBlogs } from "@/helper/blogs/blogs";
import { Spinner } from "@/helper/loader/spinner";
import { BlogType } from "@/models/Blog";
import Link from "next/link";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Blogs = () => {
  const [page, setPage] = useState(0);
  const [blogs, setBlogs] = useState<Partial<BlogType[]>>([]);
  const [isLoading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (page != 0) {
      fetchBlog();
    } else {
      setLoading(true);
      setPage(1);
    }
  }, [page]);

  async function fetchBlog() {
    const nextBlogs: Partial<BlogType[]> = await getMyBlogs({
      page,
      limit: 5,
    });
    setBlogs((prevBlogs) => [...prevBlogs, ...nextBlogs]);
    setLoading(false);
    if (nextBlogs.length === 0) {
      setHasMore(false);
    }
  }

  return (
    <>
      <div className="min-h-[100vh]">
        <h1 className="text-center text-2xl md:text-4xl font-bold mb-12">
          My Blogs
        </h1>

        {isLoading ? (
          <div className="px-[20px] flex flex-col gap-[20px] justify-center items-center my-2">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        ) : blogs.length == 0 ? (
          <div className="flex justify-center flex-col items-center">
            <Message
              title="You Haven't Posted Any Blogs Yet"
              description="Start sharing your thoughts and experiences with the world! Click the button below to create your first blog post."
            />
            <Link href="/blogs/add" className="block text-center">
              <Button type="button" className="mt-2">
                Add Blog
              </Button>
            </Link>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={blogs.length}
            next={() => setPage((prev) => prev + 1)}
            hasMore={hasMore}
            loader={<Spinner />}
            scrollableTarget={"scrollableDiv"}
            style={{ overflow: "hidden", paddingBottom: "20px" }}
            endMessage={<p className="text-center">No more blogs to show.</p>}
            refreshFunction={() => {
              setPage(0);
              setBlogs([]);
              setHasMore(true);
            }}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
              <h3 className="text-center my-2">&#8595; Pull down to refresh</h3>
            }
            releaseToRefreshContent={
              <h3 className="text-center my-2">&#8593; Release to refresh</h3>
            }
          >
            <div className="w-full max-w-3xl mx-auto flex flex-wrap justify-center md:px-[40px] p-[20px] gap-[30px]">
              {blogs.map((blog: any) => (
                <Blog
                  key={blog._id}
                  id={blog._id}
                  title={blog.title}
                  description={blog.description}
                  content={blog.content}
                  category={blog.category}
                  time={blog.date}
                  thumbnail={blog.thumbnail}
                  profileImage={blog?.postedBy.profileImage}
                  isPublic={false}
                  name={blog?.postedBy.fullname}
                  fetchBlog={fetchBlog}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default Blogs;
