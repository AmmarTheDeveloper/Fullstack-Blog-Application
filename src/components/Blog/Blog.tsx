import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface blogProps {
  blogTitle: string;
  blogContent: string;
  BlogImage: string;
  Time: string;
  profileImage: string;
  blogId: string;
}

const Blog = ({
  blogTitle,
  blogContent,
  BlogImage,
  Time,
  profileImage,
  blogId,
}: blogProps) => {
  return (
    <div>
      <Card className="w-[300px]">
        <div className="p-[15px] pb-0">
          <Image
            src={BlogImage}
            width={100}
            height={100}
            alt={"Blog Image"}
            className="w-full h-auto rounded"
          />
        </div>
        <CardHeader className="mt-3 mb-2 py-0 text-2xl font-medium">
          <CardTitle>{blogTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <p
            dangerouslySetInnerHTML={{ __html: blogContent }}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2, // Number of lines to show
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            className="max-h-[80px] text-sm font-[400] overflow-hidden mb-3"
          ></p>
          <Link href={"/blogs/" + blogId}>
            <Button>Read More</Button>
          </Link>
        </CardContent>
        <CardFooter className="flex justify-between px-[15px]">
          <Image
            alt={"Profile Image"}
            src={profileImage}
            width={100}
            height={100}
            className="h-8 w-8 rounded-[50%]"
          />
          <p className="text-sm font-[400]">{new Date(Time).toDateString()}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Blog;
