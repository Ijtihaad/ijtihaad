'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  cn,
} from '@repo/shared-ui';
import { CalendarDays, ExpandIcon, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import CommentForm from '../forms/comment/comment-form';
import VoteButtons from '../posts/vote-buttons';
import CommentOptions from './comment-options';

type Comment = {
  id: string;
  body: string;
  replays: Comment[];
};

export default function Comments({
  comments,
  currentFocused,
  setCurrentFocused,
}: {
  comments: Comment[];
  currentFocused: boolean;
  setCurrentFocused?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [focusedReplay, setFocusedReplay] = useState('');
  return (
    <div className="flex flex-col gap-4">
      {comments
        .filter((comm) => comm.id === focusedReplay || currentFocused)
        .map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            currentFocused={currentFocused}
            setFocusedReplay={setFocusedReplay}
            setCurrentFocused={(val) => {
              if (typeof setCurrentFocused === 'function') {
                setCurrentFocused(val);
              }
            }}
          />
        ))}
    </div>
  );
}

export function Comment({
  comment,
  currentFocused,
  setCurrentFocused,
  setFocusedReplay,
}: {
  comment: Comment;
  currentFocused: boolean;
  setCurrentFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setFocusedReplay: React.Dispatch<React.SetStateAction<string>>;
}) {
  const haveReplays = !!comment.replays?.length;

  const [collapsed, setCollapsed] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [focused, setFocused] = useState(true);

  useEffect(() => {
    if (currentFocused) {
      setFocusedReplay('');
      setCollapsed(true);
      setFocused(true);
    }
  }, [currentFocused]);

  const onShowMore = () => {
    setCollapsed((prev) => !prev);
    setCurrentFocused((prev) => !prev);
    setFocusedReplay(() => (focused ? comment.id : ''));
  };
  return (
    <div
      className={cn(
        'w-full bg-background shadow-md flex flex-col gap-2 px-1 pt-4 pb-1 border rounded-2xl',
        (focused && !currentFocused) || !collapsed
          ? 'border-success/50 bg-muted/20'
          : '',

        !focused && 'bg-background',
      )}
    >
      <div className="w-full flex items-center justify-between gap-2">
        <div className="w-full flex items-start justify-between gap-2">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                className={cn(
                  '[outline:unset]',
                  'relative flex items-center gap-4 px-2',
                )}
              >
                <Avatar className={cn('size-11')}>
                  <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start gap-1">
                  <h4 className="text-md font-bold">User name</h4>
                  <span className="text-xs text-muted-foreground">
                    {'5min ago'}
                  </span>
                </div>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar className={cn('h-6 w-6 md:h-8 md:w-8')}>
                  <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@nextjs</h4>
                  <p className="text-sm">
                    The React Framework – created and maintained by @vercel.
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{' '}
                    <span className="text-xs text-muted-foreground">
                      Joined December 2021
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          {/* {!focused && (
            <div className={cn('px-3 line-clamp-1 h-full my-auto')}>
              <p className="text-xs text-muted-foreground">{comment.body}</p>
            </div>
          )} */}
          {!focused && (
            <Button
              size={'sm'}
              color={'primary'}
              onClick={() => setFocused(true)}
              className="flex gap-2 rounded-xl"
            >
              <span>Focus</span>
              <ExpandIcon className="size-4" />
            </Button>
          )}
        </div>
      </div>
      {focused && (
        <div className={cn('px-3')}>
          <p className="text-body">{comment.body}</p>
        </div>
      )}
      {focused && (
        <div
          className={cn(
            'flex items-center gap-2 px-2 mt-2 rounded-2xl py-2',
            haveReplays && 'border-b ',
          )}
        >
          <VoteButtons size="sm" />
          <Button
            size={'sm'}
            className="flex items-center gap-2 pe-4 rounded-xl"
            variant={'ghost'}
            onClick={() => {
              setOpenForm((prev) => !prev);
            }}
          >
            <MessageSquare size={'1.2rem'} />
            <span className="text-sm">{83}</span>
          </Button>
          <CommentOptions />
        </div>
      )}

      {openForm && (
        <div className={cn('px-2')}>
          <CommentForm />
        </div>
      )}
      {haveReplays &&
        (!collapsed ? (
          <div className={cn('flex mt-2', !focused && 'mt-0')}>
            <Comments
              comments={comment.replays}
              currentFocused={focused}
              setCurrentFocused={setFocused}
            />
          </div>
        ) : (
          <Button onClick={onShowMore} variant={'link'} size={'sm'}>
            Read Replays
          </Button>
        ))}
    </div>
  );
}
