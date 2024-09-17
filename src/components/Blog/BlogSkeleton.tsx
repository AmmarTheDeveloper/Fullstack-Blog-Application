import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

const BlogSkeleton = () => {
  return (
    <>
      <Card className="max-w-[400px] sm:max-w-full sm:w-[600px] overflow-hidden w-full">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2">
              <Skeleton className="h-[230px] sm:h-[280px] sm:w-[280px] w-full" />
            </div>
            <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  <Skeleton className="h-8 w-full" />{" "}
                </h2>
                <Skeleton className="w-[100px] h-2 flex flex-col justify-between mb-6" />
                <div className="flex items-center space-x-2 mb-3">
                  <Skeleton className="h-[34px] w-[34px] rounded-full" />
                  <div>
                    <Skeleton className="h-2 w-[150px] mb-2" />
                    <Skeleton className="h-2 w-[80px]" />
                  </div>
                </div>
                <div className="mb-4">
                  <Skeleton className="h-2 my-2 w-full" />
                  <Skeleton className="h-2 my-2 w-full" />
                  <Skeleton className="h-2 my-2 w-full" />
                  <Skeleton className="h-2 my-2 w-full" />
                </div>
                <div className="flex flex-wrap gap-2 justify-between items-center">
                  <Skeleton className="h-[35px] w-[80px]" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BlogSkeleton;
