'use client';

import cn from '@web/utils/cn';
import { MessageSquare, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import AvatarButton from '../actions/avatar-button';
import CommentButton from '../actions/comment-button';
import CommentOptions from '../actions/comment-options';
import VoteButtons from '../actions/vote-buttons';
import { Button } from '../ui/button';
import CommentForm from '../forms/comment/comment-form';
type Comment = {
  id: string;
  body: string;
  replays: Comment[];
};
export default function Comments({ comments }: { comments: Comment[] }) {
  return (
    <div className="flex flex-col gap-2">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export function Comment({ comment }: { comment: Comment }) {
  const haveReplays = !!comment.replays?.length;
  const [collapsed, setCollapsed] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  return (
    <div className="ps-1 md:ps-2 pt-2 flex flex-col gap-1">
      <div className="md:ps-[0.2rem] w-full flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AvatarButton showName />
          <span className="text-sm"> {`5min ago`}</span>
        </div>
      </div>
      <div className={cn('ps-[0.82rem] md:ps-4')}>
        <div
          className={cn('flex flex-col gap-2 ', {
            'border-s': haveReplays,
          })}
        >
          <div className={cn('ps-2 md:ps-4')}>
            <p className="text-sm">{comment.body}</p>
          </div>
          <div
            className={cn(
              'ps-3 flex items-center justify-between gap-2 relative'
            )}
          >
            <div
              className={cn('flex items-center gap-2', {
                '-translate-x-[1.64rem] translate-y-1': haveReplays,
              })}
            >
              {haveReplays && (
                <button
                  onClick={() => setCollapsed((prev) => !prev)}
                  className="w-fit p-1 rounded-full bg-default border border-default/0 hover:border-default/100"
                >
                  {collapsed ? (
                    <Plus size={'1.1rem'} />
                  ) : (
                    <Minus size={'1.1rem'} />
                  )}
                </button>
              )}
              <VoteButtons size="xs" />
              <Button
                size={'xs'}
                rounded={'both'}
                className="flex items-center gap-2 pe-4"
                onClick={() => {
                  setOpenForm((prev) => !prev);
                  setCollapsed(false);
                }}
              >
                <MessageSquare size={'1.2rem'} />
                <span className="text-sm">{83}</span>
              </Button>
              <CommentOptions />
            </div>
          </div>
          {openForm && (
            <div className={cn('px-2')}>
              <CommentForm />
            </div>
          )}
          {!collapsed && (
            <div className="">
              {!!comment.replays?.length && (
                <Comments comments={comment.replays} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
