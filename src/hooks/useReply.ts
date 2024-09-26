import { fetchBlog } from "@/helper/blogs/blogs";
import { RootState } from "@/lib/store";
import { CommentType } from "@/models/Comment";
import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export interface CommentProps {
  comment: CommentType;
}

export function useReply({ comment }: CommentProps) {
  console.log("use reply called");
  const dispatch = useDispatch();
  const blog = useSelector((state: RootState) => state.blog.blog);
  const [replyLoading, setReplyLoading] = useState(false);

  const blogId = useMemo(() => blog?._id, [blog?._id]);
  const blogTitle = useMemo(() => blog?.title, [blog?.title]);
  const commentId = useMemo(() => comment._id, [comment._id]);

  const [expanded, setExpanded] = useState(false);
  const [reply, setReply] = useState("");

  const toggleExpand = useCallback((): void => {
    setExpanded((prev) => !prev);
  }, []);

  const handleReply = useCallback((e: any): void => {
    setReply(e.target.value);
  }, []);

  const addReply = useCallback(async () => {
    if (!reply || reply.trim().length == 0) {
      toast.error("Reply cannot be empty");
      return;
    }
    setReplyLoading(true);
    try {
      const response = await axios.put("/api/user/blogs/comment/reply", {
        commentId,
        reply,
        blogTitle,
      });
      if (response.data.success) {
        toast.success("Reply added successfully");
        fetchBlog(dispatch, String(blog?._id!));
        setExpanded(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(
        error.response.data.message || error.message || "Internal server error"
      );
    } finally {
      setReplyLoading(false);
    }
  }, [commentId, reply, blogId, blogTitle, dispatch]);

  return {
    expanded,
    toggleExpand,
    handleReply,
    reply,
    addReply,
    replyLoading,
  };
}
