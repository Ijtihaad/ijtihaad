import Comments from '@/components/comments/comments';
import AvatarButton from '@/components/common/avatar-button';
import BackButton from '@/components/common/back-button';
import CommentForm from '@/components/forms/comment/comment-form';
import CommentButton from '@/components/posts/comment-button';
import PostOptions from '@/components/posts/post-options';
import ShareButton from '@/components/posts/share-button';
import VoteButtons from '@/components/posts/vote-buttons';
import { cn } from '@repo/shared-ui';

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
    <main className={cn('w-full ')}>
      <section className="w-full max-w-3xl mx-auto border rounded-xl">
        <div className="w-full flex items-center justify-between gap-2 px-2">
          <div className="flex items-center gap-2">
            <BackButton />
            <AvatarButton showName className="h-8 w-8 md:h-8 md:w-8" />
            <span className="text-xs">{'5 day ago'}</span>
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
      </section>
    </main>
  );
}
