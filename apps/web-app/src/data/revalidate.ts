'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export default async function revalidate({
  tags,
  paths,
}: {
  tags?: string[];
  paths?: string[];
}) {
  try {
    const revalidatedTags: string[] = [];
    const revalidatedPaths: string[] = [];
    paths?.forEach((item: string) => {
      revalidatePath(item);
      revalidatedPaths.push(item);
    });
    tags?.forEach((item: string) => {
      revalidateTag(item);
      revalidatedTags.push(item);
    });
    return { revalidatedTags, revalidatedPaths, now: Date.now() };
  } catch (error: any) {}
}
