"use client";
import { getBlogs } from "@/helper/blogs/blogs";
import { BlogType } from "@/models/Blog";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Blog from "../Blog/Blog";
import BlogSkeleton from "../Blog/BlogSkeleton";

const LatestBlog = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Partial<BlogType[]>>([]);
  async function fetchBlog() {
    const blogs = await getBlogs({ page: 1, limit: 5 });
    setBlogs(blogs);
    setLoading(false);
  }
  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <section className="py-[50px]">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="dark:text-[#F6F5F2] text-[black] font-bold text-[30px] md:text-[50px] mb-[10px] text-center">
          Latest Blogs
        </h1>
        <div className="flex justify-center px-[55px] md:p-[20px] md:px-[55px] w-full">
          <Carousel
            opts={{
              align: "center",
            }}
            className="w-full max-w-screen-md"
          >
            {loading ? (
              <>
                <CarouselContent>
                  <CarouselItem key="0" className="w-full flex justify-center">
                    <div className="p-1">
                      <BlogSkeleton />
                    </div>
                  </CarouselItem>
                  <CarouselItem key="0" className="w-full flex justify-center">
                    <div className="p-1">
                      <BlogSkeleton />
                    </div>
                  </CarouselItem>
                  <CarouselItem key="0" className="w-full flex justify-center">
                    <div className="p-1">
                      <BlogSkeleton />
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </>
            ) : (
              <CarouselContent>
                {blogs.map((blog: any) => {
                  return (
                    <>
                      <CarouselItem
                        key={blog._id}
                        className="w-full flex justify-center items-stretch"
                      >
                        <div className="p-1">
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
                            isPublic={true}
                            name={blog?.postedBy.fullname}
                          />
                        </div>
                      </CarouselItem>
                    </>
                  );
                })}
              </CarouselContent>
            )}
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
