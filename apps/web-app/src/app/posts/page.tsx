import PostCard from '@/components/posts/post-card';
import { Separator, cn } from '@repo/shared-ui';

export default function Page() {
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
    <main className={cn('w-full')}>
      <section className="w-full max-w-3xl mx-auto border rounded-xl">
        {posts.map((post) => (
          <div key={post.id} className={cn('flex flex-col gap-1 px-2')}>
            <PostCard post={post} />
            <Separator />
          </div>
        ))}
      </section>
    </main>
  );
}
