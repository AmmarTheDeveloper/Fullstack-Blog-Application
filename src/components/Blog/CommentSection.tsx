import React, { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import Comment from "./Comment";
import axios from "axios";
import toast from "react-hot-toast";
import { Spinner } from "@/helper/loader/spinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { fetchBlog } from "@/helper/blogs/blogs";
import { UserType } from "@/models/User";

const CommentSection = () => {
  const blog = useSelector((state: RootState) => state.blog.blog);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const postedBy = blog?.postedBy as UserType;

  async function handlePostComment(e: any) {
    try {
      setLoading(true);
      if (!content || content.trim() == "") {
        toast.error("Comment is required");
        return;
      }
      const response = await axios.post("/api/user/blogs/comment", {
        blogId: blog?._id,
        comment: content,
      });

      setContent("");
      if (response.data.success) {
        toast.success("Comment added successfully");
        fetchBlog(dispatch, String(blog?._id || ""));
        return;
      }
      toast.error(response.data.message);
    } catch (error: any) {
      setLoading(false);
      toast.error(
        error.response.data.message || error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border-t pt-2">
      <h1 className="text-2xl font-medium tracking-tight md:text-3xl mb-6">
        Comments ({blog?.comments?.length || 0})
      </h1>
      <div className="flex items-start gap-4">
        <Avatar className="w-10 h-10 border">
          <AvatarImage src={user?.profileImage} alt={`@${user?.fullname}`} />
          <AvatarFallback>{user?.fullname[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 grid gap-2">
          <div className="flex items-center justify-between">
            <div className="font-medium">{user?.fullname}</div>
            {/* <div className="text-xs text-muted-foreground">1 day ago</div> */}
          </div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your comment..."
            className="p-2 rounded-md border border-input bg-background text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
          <div className="flex items-center justify-end gap-2">
            {!isLoading ? (
              <Button size="sm" onClick={handlePostComment}>
                Post Comment
              </Button>
            ) : (
              <Button size="sm">
                <Spinner />
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 w-full overflow-x-auto max-w-2xl mx-auto space-y-6">
        {blog?.comments?.map((comment) => (
          <Comment key={comment._id.toString()} comment={comment} />
        ))}
        {/* <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 grid gap-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">John Doe</div>
              <div className="text-xs text-muted-foreground">2 hours ago</div>
            </div>
            <p className="text-muted-foreground">
              Wow, this is a great article! I learned a lot about the history of
              joke taxation. Can't wait to read more.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <HeartIcon className="w-4 h-4" />
                <span className="sr-only">Like</span>
              </Button>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MessageCircleIcon className="w-4 h-4" />
                <span>3 replies</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <ThumbsUpIcon className="w-4 h-4" />
                <span>12 likes</span>
              </div>
              <Button variant="ghost" size="icon">
                <MessageCircleIcon className="w-4 h-4" />
                <span className="sr-only">Reply</span>
              </Button>
            </div>
            <div className="grid gap-4">
              <div className="flex items-start gap-4">
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
                <div className="flex-1 grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Sarah Anderson</div>
                    <div className="text-xs text-muted-foreground">
                      1 hour ago
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    I agree, this is a fascinating topic. I'd love to learn more
                    about the historical context and how the joke tax impacted
                    the kingdom.
                  </p>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                      <HeartIcon className="w-4 h-4" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MessageCircleIcon className="w-4 h-4" />
                      <span>1 reply</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <ThumbsUpIcon className="w-4 h-4" />
                      <span>5 likes</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MessageCircleIcon className="w-4 h-4" />
                      <span className="sr-only">Reply</span>
                    </Button>
                  </div>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                      <AvatarFallback>JB</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 grid gap-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">John Bauer</div>
                        <div className="text-xs text-muted-foreground">
                          30 minutes ago
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        I'm really curious to learn more about the economic
                        impact of the joke tax. Do you have any insights on how
                        it affected the kingdom's revenue and overall
                        prosperity?
                      </p>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon">
                          <HeartIcon className="w-4 h-4" />
                          <span className="sr-only">Like</span>
                        </Button>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MessageCircleIcon className="w-4 h-4" />
                          <span>0 replies</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <ThumbsUpIcon className="w-4 h-4" />
                          <span>2 likes</span>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MessageCircleIcon className="w-4 h-4" />
                          <span className="sr-only">Reply</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CommentSection;
