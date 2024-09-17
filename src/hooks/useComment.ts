import { fetchBlog } from "@/helper/blogs/blogs";
import { RootState } from "@/lib/store";
import { CommentType } from "@/models/Comment";
import { UserType } from "@/models/User";
import axios from "axios";
import { ObjectId } from "mongoose";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export interface CommentProps {
  comment: CommentType;
}

export function useComment({ comment }: CommentProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const blog = useSelector((state: RootState) => state.blog.blog);
  const [likeLoading, setLikeLoading] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editContent, setEditContent] = useState(comment?.comment);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [reply, setReply] = useState("");

  function toggleExpand(): void {
    setExpanded(!expanded);
  }

  function handleReply(e: any): void {
    setReply(e.target.value);
  }

  async function AddLike(): Promise<void> {
    setLikeLoading(true);
    try {
      const response = await axios.post("/api/user/blogs/comment/like", {
        commentId: comment._id,
        blogId: blog?._id!,
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
  }

  async function removeLike(): Promise<void> {
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
  }

  function handleLike(): void {
    if (likeLoading) return;
    if (isLiked()) {
      removeLike();
    } else {
      AddLike();
    }
    fetchBlog(dispatch, String(blog?._id!));
  }

  function isLiked(): boolean {
    if (!user || !comment?.likes) return false;
    return comment.likes.some((val) => val.toString() === user?._id.toString());
  }

  async function addReply() {
    if (!reply || reply.trim().length == 0) {
      toast.error("Reply cannot be empty");
      return;
    }
    setReplyLoading(true);
    try {
      const response = await axios.put("/api/user/blogs/comment/reply", {
        commentId: comment._id,
        reply,
        blogTitle: blog?.title,
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
  }

  function handleEdit(e: any) {
    setEditContent(e.target.value);
  }

  function handleEditButtonClick() {
    setEdit(!isEdit);
  }

  async function handleEditSave() {
    setEditLoading(true);
    try {
      const response = await axios.put(
        "/api/user/blogs/comment/" + comment?._id,
        {
          content: editContent,
        }
      );
      fetchBlog(dispatch, String(blog?._id));
      toast.success("Comment updated successfully");
      setEdit(false);
    } catch (error: any) {
      toast.error(
        error.response.data.message || error.message || "Something went wrong"
      );
    } finally {
      setEditLoading(false);
    }
  }

  async function deleteComment() {
    setDeleteLoading(true);
    try {
      const response = await axios.delete(
        "/api/user/blogs/comment/" + comment?._id
      );
      fetchBlog(dispatch, String(blog?._id));
      toast.success("Comment deleted successfully");
    } catch (error: any) {
      toast.error(
        error.response.data.message || error.message || "Something went wrong"
      );
    } finally {
      setDeleteLoading(false);
    }
  }

  function isOwner(userId: ObjectId) {
    return user?._id == userId;
  }

  return {
    expanded,
    toggleExpand,
    handleReply,
    reply,
    isLiked,
    handleLike,
    addReply,
    replyLoading,
    isOwner,
    handleEdit,
    handleEditButtonClick,
    isEdit,
    editContent,
    handleEditSave,
    editLoading,
    deleteLoading,
    deleteComment,
  };
}
