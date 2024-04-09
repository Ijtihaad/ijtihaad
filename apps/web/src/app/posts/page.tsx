import PostCard from '@app/web/components/posts/post-card';
import { Separator } from '@app/web/components/ui/separator';
import cn from '@app/web/utils/cn';

export default function Home() {
  const posts = [
    {
      id: '1',
      title:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, pariatur?',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
    },
    {
      id: '2',
      title:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, pariatur?',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
    },
    {
      id: '3',
      title:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, pariatur?',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
    },
  ];
  return (
    <div className={cn('w-full flex flex-col gap-1')}>
      {posts.map((post) => (
        <div key={post.id} className={cn('flex flex-col gap-1 px-2')}>
          <PostCard post={post} />
          <Separator />
        </div>
      ))}
    </div>
  );
}
