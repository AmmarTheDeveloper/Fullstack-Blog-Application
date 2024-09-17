import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CommentSection from "./CommentSection";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { UserType } from "@/models/User";
import { Skeleton } from "../ui/skeleton";

const ReadBlogSkeleton = () => {
  return (
    <article className=" text-foreground w-full">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-6">
              <Skeleton className="h-12 w-[400px] max-w-full" />
            </h1>
          </div>
          <div>
            <Skeleton className="h-[400px] w-full" />
          </div>
          <div className="border border-x-transparent flex justify-between space-x-4 text-muted-foreground">
            <div className="py-2 flex space-x-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex flex-col justify-between py-1">
                <span className="text-sm font-medium">
                  <Skeleton className="h-2 w-[250px]" />
                </span>
                <Skeleton className="h-2 w-[150px]" />
              </div>
            </div>
          </div>
          <div className="prose prose-gray max-w-none dark:prose-invert">
            <Skeleton className="h-2 my-2 w-full" />
            <Skeleton className="h-2 my-2 w-full" />
            <Skeleton className="h-2 my-2 w-full" />
            <Skeleton className="h-2 my-2 w-full" />
            <Skeleton className="h-2 my-2 w-full" />
            <Skeleton className="h-2 my-2 w-full" />
            <Skeleton className="h-2 my-2 w-full" />
            <Skeleton className="h-2 my-2 w-full" />
            <Skeleton className="h-2 my-2 w-full" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ReadBlogSkeleton;
