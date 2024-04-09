import { MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';

export default function CommentButton() {
  return (
    <Button
      size={'sm'}
      rounded={'both'}
      contain={'default'}
      className="flex items-center gap-2 pe-4"
    >
      <MessageSquare size={'1.2rem'} />
      <p>{83}</p>
    </Button>
  );
}
