import ShareButton from '@web/components/actions/share-button';
import VoteButtons from '@web/components/actions/vote-buttons';
import cn from '@web/utils/cn';
import { CalendarDays, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import PostOptions from '../actions/post-options';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import { LinkButton } from '../ui/link-button';

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
          <HoverCard>
            <HoverCardTrigger asChild>
              <button
                className={cn(
                  '[outline:unset]',
                  'relative flex items-center gap-2',
                )}
              >
                <Avatar className={cn('h-6 w-6 md:h-8 md:w-8')}>
                  <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <span className="text-subtitle hover:underline">User name</span>
              </button>
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
          <span>{`5min ago`}</span>
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
          <LinkButton
            size={'sm'}
            rounded={'both'}
            className="flex items-center gap-2 pe-4"
            href={`/posts/${post.id}`}
          >
            <MessageSquare size={'1.2rem'} />
            <span className="text-sm">{83}</span>
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
