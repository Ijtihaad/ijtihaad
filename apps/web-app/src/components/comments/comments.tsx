'use client';

import { Button, cn } from '@repo/shared-ui';
import { MessageSquare, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import AvatarButton from '../common/avatar-button';
import CommentForm from '../forms/comment/comment-form';
import VoteButtons from '../posts/vote-buttons';
import CommentOptions from './comment-options';

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
    <div className="flex flex-col">
      <div className="w-full -translate-x-[0.1rem] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AvatarButton showName />
          <span className="text-xs"> {'5min ago'}</span>
        </div>
      </div>
      <div className={cn('flex mt-1')}>
        {haveReplays && (
          <div
            className={cn(
              'relative group -translate-y-[0.2rem] flex flex-col items-center min-w-6',
            )}
          >
            <div className="shrink-0 bg-border h-full w-[1px] group-hover:bg-muted" />
            <button
              type="button"
              onClick={() => setCollapsed((prev) => !prev)}
              className="-translate-y-[1.4rem] w-6 h-6 p-1 flex justify-center items-center rounded-full bg-default border border-border hover:bg-muted"
            >
              {collapsed ? <Plus size={'1.1rem'} /> : <Minus size={'1.1rem'} />}
            </button>
          </div>
        )}
        <div
          className={cn('flex flex-col gap-2', haveReplays ? 'ps-1' : 'ps-6')}
        >
          <div className={cn('-translate-x-1')}>
            <p className="text-body">{comment.body}</p>
          </div>
          <div className={cn('flex items-center gap-2', {})}>
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

          {openForm && (
            <div className={cn('px-2')}>
              <CommentForm />
            </div>
          )}
        </div>
      </div>
      {!collapsed && (
        <div className={cn('flex w-full')}>
          <div className={cn('flex flex-col items-end min-w-5 group px-2')}>
            <div className="shrink-0 bg-border h-full w-[1px] group-hover:bg-muted -translate-y-[0.2rem]" />
          </div>
          <div className="py-1 pt-2">
            {!!comment.replays?.length && (
              <Comments comments={comment.replays} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
