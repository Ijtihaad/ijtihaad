import AnswerButton from '@app/web/components/actions/answer-button';
import ApprovalButtons from '@app/web/components/actions/approval-buttons';
import AvatarButton from '@app/web/components/actions/avatar-button';
import BackButton from '@app/web/components/actions/back-button';
import CommentButton from '@app/web/components/actions/comment-button';
import PostOptions from '@app/web/components/actions/post-options';
import ShareButton from '@app/web/components/actions/share-button';
import VoteButtons from '@app/web/components/actions/vote-buttons';
import { Button } from '@app/web/components/ui/button';
import { Input } from '@app/web/components/ui/input';
import { Textarea } from '@app/web/components/ui/textarea';
import cn from '@app/web/utils/cn';

type Comment = {
  id: string;
  title: string;
  body: string;
  replays: Comment[];
};
export default function Page({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const post = {
    id: '3',
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, pariatur?',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
    comments: [
      {
        id: '1',
        title:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, pariatur?',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
        replays: [],
      },
      {
        id: '2',
        title:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, pariatur?',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
        replays: [],
      },
      {
        id: '3',
        title:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, pariatur?',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
        replays: [
          {
            id: '2',
            title:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, pariatur?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
            replays: [
              {
                id: '2',
                title:
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, pariatur?',
                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                replays: [],
              },
              {
                id: '3',
                title:
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, pariatur?',
                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                replays: [],
              },
            ],
          },
          {
            id: '3',
            title:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, pariatur?',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
            replays: [],
          },
        ],
      },
    ],
  };
  return (
    <div className="w-full flex flex-col gap-2 px-2 py-4">
      <div className="w-full flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BackButton />
          <AvatarButton showName />
          <span>{new Date().toISOString()}</span>
        </div>
        <PostOptions />
      </div>
      <div className={cn('')}>
        <h6 className="text-title">{post.title}</h6>
        <p className="text-body">{post.body}</p>
      </div>
      <div className={cn('flex items-center justify-between gap-2 my-4')}>
        <div className={cn('flex items-center gap-2')}>
          <VoteButtons />
          <ShareButton />
          <CommentButton />
        </div>
        <div className={cn('flex items-center gap-2')}>
          <AnswerButton />
        </div>
      </div>
      <div className="border rounded-2xl px-2">
        <Textarea variant={'ghost'} />
        <div className="flex justify-between items-center gap-2 py-1">
          <div>
            <Button rounded={'full'} width={'icon'} variant={'ghost'}>
              T
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button>Cancel</Button>
            <Button variant={'primary'}>Comment</Button>
          </div>
        </div>
      </div>
      <div className="py-4">
        <Comments comments={post.comments} />
      </div>
    </div>
  );
}

function Comments({ comments }: { comments: Comment[] }) {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <div className="px-2 py-2 flex flex-col gap-2">
            <div className="w-full flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AvatarButton showName />
                <span>{new Date().toISOString()}</span>
              </div>
            </div>
            <div className={cn('ps-4')}>
              <div className={cn('border-s ps-4 flex flex-col gap-2')}>
                <div className={cn('')}>
                  <h6 className="text-title">{comment.title}</h6>
                  <p className="text-body">{comment.body}</p>
                </div>
                <div className={cn('flex items-center justify-between gap-2')}>
                  <div className={cn('flex items-center gap-2')}>
                    <VoteButtons />
                    <ShareButton />
                    <CommentButton />
                    <PostOptions />
                  </div>
                  <ApprovalButtons />
                </div>
                <div>
                  {!!comment.replays?.length && (
                    <Comments comments={comment.replays} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
