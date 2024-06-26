import CreatePostFrom from '@/components/forms/post/create-post-from';
import { cn } from '@repo/shared-ui';

export default async function Page() {
  const jamas = [
    {
      slug: 'astu-muslim-jama',
      name: 'Astu Muslim Jama',
      image: '',
    },
    {
      slug: 'dodola-muslim-jama',
      name: 'Dodola Muslim Jama',
      image: '',
    },
    {
      slug: 'adama-muslim-jama',
      name: 'Adama Muslim Jama',
      image: '',
    },
  ];
  return (
    <main className={cn('w-full py-4 md:max-w-2xl xl:max-w-4xl mx-auto')}>
      <div className="px-2">
        <CreatePostFrom jamas={jamas} />
      </div>
    </main>
  );
}
