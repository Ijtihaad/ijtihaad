import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const tags: string[] = [];
  const paths: string[] = [];
  req.nextUrl.searchParams.forEach((value, key) => {
    if (key.startsWith('tag')) {
      tags.push(value);
    }
    if (key.startsWith('path')) {
      paths.push(value);
    }
  });

  const revalidatedTags: string[] = [];
  const revalidatedPaths: string[] = [];
  paths.forEach((item: string) => {
    revalidatePath(item);
    revalidatedPaths.push(item);
  });
  tags.forEach((item: string) => {
    revalidateTag(item);
    revalidatedTags.push(item);
  });
  return Response.json({ revalidatedTags, revalidatedPaths, now: Date.now() });
}
