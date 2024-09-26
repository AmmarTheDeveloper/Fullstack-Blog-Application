import { memo } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Spinner } from "@/helper/loader/spinner";

interface ReplyTextareaProps {
  reply: string;
  handleReply: (e: any) => void;
  replyLoading: boolean;
  addReply: () => void;
  toggleExpand: () => void;
}

export const ReplyTextarea = memo(
  ({
    reply,
    handleReply,
    replyLoading,
    addReply,
    toggleExpand,
  }: ReplyTextareaProps) => {
    return (
      <>
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
      </>
    );
  }
);

ReplyTextarea.displayName = "ReplyTextarea";
