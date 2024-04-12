import AvatarButton from '@web/components/actions/avatar-button';
import BackButton from '@web/components/actions/back-button';
import CommentButton from '@web/components/actions/comment-button';
import PostOptions from '@web/components/actions/post-options';
import ShareButton from '@web/components/actions/share-button';
import VoteButtons from '@web/components/actions/vote-buttons';
import Comments from '@web/components/comments/comments';
import CommentForm from '@web/components/forms/comment/comment-form';
import { Button } from '@web/components/ui/button';
import { Textarea } from '@web/components/ui/textarea';
import cn from '@web/utils/cn';

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
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
        replays: [],
      },
      {
        id: '2',
        body: 'Lorem ipsum dolor sit amet consecteturadipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
        replays: [],
      },
      {
        id: '3',
        body: 'Lorem ipsum dolor sit amet consecteturadipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
        replays: [
          {
            id: '2',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
            replays: [
              {
                id: '2',
                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                replays: [
                  {
                    id: '2',
                    body: 'Lorem ipsum dolor sit ametadipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                    replays: [
                      {
                        id: '2',
                        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                        replays: [],
                      },
                      {
                        id: '3',
                        body: 'Lorem ipsum dolor sit adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditateamet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                        replays: [],
                      },
                    ],
                  },
                  {
                    id: '3',
                    body: 'Lorem ipsum dolor sit amet adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditateconsectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                    replays: [],
                  },
                ],
              },
              {
                id: '3',
                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                replays: [],
              },
            ],
          },
          {
            id: '3',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
            replays: [],
          },
        ],
      },
    ],
  };
  return (
    <main className={cn('w-full md:max-w-2xl xl:max-w-4xl mx-auto')}>
      <div className="w-full flex flex-col gap-2 py-4">
        <div className="w-full flex items-center justify-between gap-2 px-2">
          <div className="flex items-center gap-2">
            <BackButton />
            <AvatarButton showName className="h-8 w-8 md:h-8 md:w-8" />
            <span className="text-xs">{`5 day ago`}</span>
          </div>
          <PostOptions />
        </div>
        <div className={cn('px-2')}>
          <h6 className="text-title">{post.title}</h6>
          <p className="text-body">{post.body}</p>
        </div>
        <div
          className={cn('flex items-center justify-between gap-2 my-4 px-2')}
        >
          <div className={cn('flex items-center gap-2')}>
            <VoteButtons />
            <ShareButton />
            <CommentButton />
          </div>
        </div>
        <div className={cn('px-2')}>
          <CommentForm />
        </div>

        <div className="py-4 px-2">
          <Comments comments={post.comments} />
        </div>
      </div>
    </main>
  );
}
