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
import { PrivateBlogButtons } from "./privateBlogButtons";

interface blogProps {
  title: string;
  description: string;
  content: string;
  time: string;
  thumbnail: string;
  category: string;
  id: string;
  isPublic: boolean;
  profileImage: string;
  name: string;
  fetchBlog?: (...args: any[]) => void;
}

const Blog = ({
  title,
  description,
  content,
  time,
  thumbnail,
  id,
  category,
  isPublic,
  profileImage,
  name,
  fetchBlog,
}: blogProps) => {
  return (
    <>
      <Card className="max-w-[400px] sm:max-w-full overflow-hidden w-full h-auto">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2">
              <Image
                src={`${thumbnail}?t=${new Date().getTime()}`}
                alt={title}
                width={200}
                height={200}
                className="w-full h-48 sm:h-[260px] object-cover"
              />
            </div>
            <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-sm text-muted-foreground mb-2">{category}</p>
                <div className="flex items-center space-x-2 mb-3">
                  <Image
                    src={`${profileImage}?t=${new Date().getTime()}`}
                    alt={name}
                    width={34}
                    height={34}
                    className="rounded-full object-cover overflow-hidden"
                  />
                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(time).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <p
                    className="text-sm line-clamp-3 mb-4"
                    // dangerouslySetInnerHTML={{ __html: content }}
                  >
                    {description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-between items-center">
                  <Button asChild variant="outline" size="sm">
                    <Link href={"/blogs/read/" + id}>Read More</Link>
                  </Button>
                  {!isPublic ? (
                    <PrivateBlogButtons fetchBlog={fetchBlog!} blogId={id} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Blog;
