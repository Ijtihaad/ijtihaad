import AnswerButton from '@app/web/components/actions/answer-button';
import AvatarButton from '@app/web/components/actions/avatar-button';
import CommentButton from '@app/web/components/actions/comment-button';
import ShareButton from '@app/web/components/actions/share-button';
import VoteButtons from '@app/web/components/actions/vote-buttons';
import cn from '@app/web/utils/cn';
import Link from 'next/link';
import PostOptions from '../actions/post-options';

export default function PostCard({
  post,
}: {
  post: {
    id: string;
    title: string;
    body: string;
  };
}) {
  return (
    <div className="px-2 py-2 rounded-xl hover:bg-default/50 flex flex-col gap-2">
      <div className="w-full flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AvatarButton showName />
          <span>{new Date().toISOString()}</span>
        </div>
        <PostOptions />
      </div>
      <Link href={`/posts/${post.id}`} className={cn('')}>
        <h6 className="text-title">{post.title}</h6>
        <p className="text-body">{post.body}</p>
      </Link>
      <div className={cn('flex items-center justify-between gap-2')}>
        <div className={cn('flex items-center gap-2')}>
          <VoteButtons />
          <ShareButton />
          <CommentButton />
        </div>
        <div className={cn('flex items-center gap-2')}>
          <AnswerButton />
        </div>
      </div>
    </div>
  );
}
