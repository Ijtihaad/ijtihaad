import { Button } from '@repo/shared-ui';
import { MessageSquare } from 'lucide-react';

export default function CommentButton({ size }: { size?: 'xs' | 'sm' | 'lg' }) {
  return (
    <Button
      size={size ?? 'sm'}
      rounded={'both'}
      className="flex items-center gap-2 pe-4"
    >
      <MessageSquare size={'1.2rem'} />
      <span className="text-sm">{83}</span>
    </Button>
  );
}
