import React from "react";
import { Button } from "../ui/button";
import {
  HeartIcon,
  MessageCircleIcon,
  Reply,
  ThumbsUpIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { CommentProps, useComment } from "@/hooks/useComment";
import { Spinner } from "@/helper/loader/spinner";
import { UserType } from "@/models/User";
import { useTheme } from "next-themes";
import { formatDistanceToNow } from "date-fns";
import { CommentType } from "@/models/Comment";
import { Popup } from "../popup/popup";

const Comment = ({ comment }: CommentProps) => {
  const { theme } = useTheme();
  const {
    toggleExpand,
    handleReply,
    reply,
    handleLike,
    isLiked,
    expanded,
    replyLoading,
    addReply,
    isOwner,
    handleEditButtonClick,
    isEdit,
    editContent,
    handleEdit,
    handleEditSave,
    editLoading,
    deleteLoading,
    deleteComment,
  } = useComment({
    comment,
  });

  const formatDate = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const user = comment?.userId as UserType;

  return (
    <>
      <div>
        <div className="border-t-2  pt-2 flex items-start gap-4 my-2">
          <Avatar className="w-8 h-8 border">
            <AvatarImage
              src={`${user?.profileImage}?t=${new Date().getTime()}`}
              alt={user?.fullname}
            />
            <AvatarFallback>{user?.fullname}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex-1 grid gap-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{user?.fullname}</div>
                <div className="text-xs text-muted-foreground">
                  {formatDate(new Date(comment?.date))}
                </div>
              </div>
              {!isEdit && (
                <p className="text-muted-foreground">{comment?.comment}</p>
              )}
              {isOwner(user?._id) && isEdit && (
                <Textarea value={editContent} onChange={handleEdit}></Textarea>
              )}
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={handleLike}>
                  <ThumbsUpIcon
                    color={`${theme == "dark" ? "white" : "black"}`}
                    fill={`${
                      isLiked()
                        ? theme == "dark"
                          ? "white"
                          : "black"
                        : "transparent"
                    }`}
                    className="w-4 h-4"
                  />
                  <span className="sr-only">Like</span>
                </Button>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MessageCircleIcon className="w-4 h-4" />
                  <span>{comment?.replies?.length} replies</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <ThumbsUpIcon className="w-4 h-4" />
                  <span>{comment?.likes?.length || 0} likes</span>
                </div>
                <Button
                  variant="ghost"
                  className="text-muted-foreground"
                  onClick={toggleExpand}
                  size="icon"
                >
                  <Reply className="h-4 w-4" />
                  <span className="sr-only">Reply</span>
                </Button>
              </div>
            </div>
            {isOwner(user?._id) &&
              (!isEdit ? (
                !deleteLoading ? (
                  <div className="mt-2 flex gap-[10px]">
                    <Button
                      onClick={handleEditButtonClick}
                      type="button"
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Edit
                    </Button>
                    <Popup
                      title="Are you sure?"
                      description="This action cannot be undone. This will permanently delete your comment and remove this comment data from our servers"
                      onContinue={deleteComment}
                    >
                      <Button type="button" variant={"destructive"}>
                        Delete
                      </Button>
                    </Popup>
                  </div>
                ) : (
                  <Button type="button">
                    <Spinner />
                  </Button>
                )
              ) : (
                <div className="mt-2 flex gap-[10px]">
                  {!editLoading ? (
                    <>
                      <Button
                        onClick={handleEditSave}
                        type="button"
                        variant={"outline"}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={handleEditButtonClick}
                        type="button"
                        variant={"ghost"}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button type="button">
                      <Spinner />
                    </Button>
                  )}
                </div>
              ))}

            <div>
              {expanded && (
                <div className="my-2 flex gap-[10px] flex-wrap justify-end">
                  <Textarea
                    placeholder="Enter reply..."
                    value={reply}
                    onChange={handleReply}
                  ></Textarea>
                  {!replyLoading ? (
                    <>
                      <Button type="button" onClick={addReply}>
                        Reply
                      </Button>
                      <Button variant="ghost" onClick={toggleExpand}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button type="button">
                      <Spinner />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {comment?.replies?.map((reply, index) => {
          return (
            <div key={index} className="pl-[20px] my-2">
              <Comment comment={reply as CommentType} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Comment;
