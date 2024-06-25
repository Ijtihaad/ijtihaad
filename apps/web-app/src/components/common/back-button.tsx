import { LinkButton } from '@repo/shared-ui';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BackButton() {
  return (
    <LinkButton
      Link={Link}
      href="."
      rounded={'full'}
      width={'icon'}
      variant={'ghost'}
    >
      <ArrowLeft />
    </LinkButton>
  );
}
