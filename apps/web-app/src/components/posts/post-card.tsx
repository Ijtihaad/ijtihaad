import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  LinkButton,
  cn,
} from '@repo/shared-ui';
import { CalendarDays, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import PostOptions from './post-options';
import ShareButton from './share-button';
import VoteButtons from './vote-buttons';

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
    <div className="px-2 py-2 rounded-xl hover:bg-muted/20 flex flex-col gap-4 mt-1 duration-200">
      <div className="w-full flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
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
        </div>
        <PostOptions />
      </div>
      <Link
        href={`/posts/${post.id}`}
        className={cn('flex flex-col-reverse md:flex-row gap-2 px-2 md:px-6')}
      >
        <div className="flex flex-col gap-2">
          <h6 className="text-2xl font-bold">{post.title}</h6>
          <p className="text-md">{post.body}</p>
        </div>
        <div className="flex">
          <span className="w-full md:w-60 bg-muted aspect-video rounded-2xl" />
        </div>
      </Link>
      <div className={cn('flex items-center px-2 md:px-4 gap-6')}>
        {['#salat', '#zakah', '#ramadan'].map((tag) => (
          <Button key={tag} variant={'outline'} size={'xs'}>
            {tag}
          </Button>
        ))}
      </div>
      <div
        className={cn('flex items-center justify-between gap-2 px-2 md:px-4')}
      >
        <div className={cn('flex items-center gap-2')}>
          <VoteButtons />
          <LinkButton
            Link={Link}
            variant={'ghost'}
            className="flex items-center gap-2 pe-4 bg-muted/50 rounded-2xl hover:bg-success/30 hover:text-success duration-200"
            href={`/posts/${post.id}`}
          >
            <MessageSquare size={'1.2rem'} />
            <span className="text-md">{83}</span>
          </LinkButton>
          <ShareButton />
        </div>
      </div>
    </div>
  );
}
