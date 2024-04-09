import { Vote } from 'lucide-react';
import { Button } from '../ui/button';

export default function AnswerButton() {
  return (
    <Button
      size={'sm'}
      contain={'default'}
      rounded={'both'}
      className="flex items-center gap-2 pe-4"
    >
      <Vote  />
      <p>Answer</p>
    </Button>
  );
}
