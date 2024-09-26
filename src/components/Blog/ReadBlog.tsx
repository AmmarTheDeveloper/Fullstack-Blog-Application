import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CommentSection from "./CommentSection";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { UserType } from "@/models/User";
import Image from "next/image";

const ReadBlog = () => {
  const blog = useSelector((state: RootState) => state.blog.blog);
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
      new Date(date)
    );
  };

  const postedBy = blog?.postedBy as UserType;

  return (
    <article className=" text-foreground w-full">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-6">
              {blog?.title}
            </h1>
          </div>
          <div>
            <Image
              src={`${blog?.thumbnail}?t=${new Date().getTime()}`}
              alt="Blog Thumbnail"
              width={1200}
              height={600}
              className="aspect-video w-full h-auto rounded-lg object-cover"
            />
          </div>
          <div className="border border-x-transparent flex justify-between space-x-4 text-muted-foreground">
            <div className="py-2 flex space-x-2">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={`${postedBy?.profileImage}?t=${new Date().getTime()}`}
                  alt={`@${postedBy?.fullname}`}
                />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-between py-1">
                <span className="text-sm font-medium">
                  {postedBy?.fullname}
                </span>
                <p className="text-sm">{formatDate(blog?.date!)}</p>
              </div>
            </div>
            <div></div>
          </div>
          <div
            className="prose prose-gray max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: blog?.content! }}
          ></div>
          <div className="w-full mt-12 space-y-8">
            <CommentSection />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ReadBlog;
