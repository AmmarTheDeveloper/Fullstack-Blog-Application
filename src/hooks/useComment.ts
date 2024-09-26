import { fetchBlog } from "@/helper/blogs/blogs";
import { RootState } from "@/lib/store";
import { CommentType } from "@/models/Comment";
import axios from "axios";
import { ObjectId } from "mongoose";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export interface CommentProps {
  comment: CommentType;
}

export function useComment({ comment }: CommentProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const blog = useSelector((state: RootState) => state.blog.blog);
  const [isEdit, setEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editContent, setEditContent] = useState(comment?.comment);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const blogId = useMemo(() => blog?._id, [blog?._id]);
  const commentId = useMemo(() => comment._id, [comment._id]);

  const handleEdit = useCallback((e: any) => {
    setEditContent(e.target.value);
  }, []);

  const handleEditButtonClick = useCallback(() => {
    setEdit(!isEdit);
  }, [isEdit]);

  const handleEditSave = useCallback(async () => {
    setEditLoading(true);
    try {
      const response = await axios.put("/api/user/blogs/comment/" + commentId, {
        content: editContent,
      });
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
  }, [commentId, blogId, editContent, dispatch]);

  const deleteComment = useCallback(async () => {
    setDeleteLoading(true);
    try {
      const response = await axios.delete(
        "/api/user/blogs/comment/" + commentId
      );
      fetchBlog(dispatch, String(blogId));
      toast.success("Comment deleted successfully");
    } catch (error: any) {
      toast.error(
        error.response.data.message || error.message || "Something went wrong"
      );
    } finally {
      setDeleteLoading(false);
    }
  }, [commentId, blogId, dispatch]);

  const isOwner = useCallback(
    (userId: ObjectId) => {
      return user?._id == userId;
    },
    [user]
  );

  return {
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
