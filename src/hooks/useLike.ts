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

export function useLike({ comment }: CommentProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const blog = useSelector((state: RootState) => state.blog.blog);
  const [likeLoading, setLikeLoading] = useState(false);

  const blogId = useMemo(() => blog?._id, [blog?._id]);
  const commentId = useMemo(() => comment._id, [comment._id]);

  const addLike = useCallback(async (): Promise<void> => {
    setLikeLoading(true);
    try {
      const response = await axios.post("/api/user/blogs/comment/like", {
        commentId,
        blogId,
      });
      if (response.data.success) {
        toast.success("Liked successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(
        error.response.data.message || error.message || "Internal server error"
      );
    } finally {
      setLikeLoading(false);
    }
  }, [commentId, blogId]);

  const removeLike = useCallback(async (): Promise<void> => {
    setLikeLoading(true);
    try {
      const response = await axios.post("/api/user/blogs/comment/removeLike", {
        commentId: comment._id,
      });
      if (response.data.success) {
        toast.success("Like removed successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(
        error.response.data.message || error.message || "Internal server error"
      );
    } finally {
      setLikeLoading(false);
    }
  }, [commentId]);

  const isLiked = useCallback((): boolean => {
    if (!user || !comment?.likes) return false;
    return comment.likes.some((val) => val.toString() === user?._id.toString());
  }, [user, comment.likes]);

  const handleLike = useCallback((): void => {
    if (likeLoading) return;
    if (isLiked()) {
      removeLike();
    } else {
      addLike();
    }
    fetchBlog(dispatch, String(blog?._id!));
  }, [likeLoading, isLiked, removeLike, addLike, blogId, dispatch]);

  return {
    isLiked,
    handleLike,
  };
}
