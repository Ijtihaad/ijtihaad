'use client';
import useMediaQuery from '@/components/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import cn from '@/utils/cn';
import { useState } from 'react';

export default function CommentForm() {
  const [commentType, setCommentType] = useState('replay');
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className={cn('border rounded-xl px-1')}>
      <Textarea variant={'ghost'} />
      <div className="flex justify-between items-center gap-2 py-1">
        <div className="flex items-center ga-2">
          <Button rounded={'full'} width={'icon'} variant={'ghost'}>
            T
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {/* <Select defaultValue={'replay'} onValueChange={setCommentType}>
            <SelectTrigger className={cn('h-8')} aria-label="Select account">
              <SelectValue placeholder="Select an account">
                <span className={cn('ml-2')}>{commentType}</span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'replay'}>
                <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                  replay
                </div>
              </SelectItem>
              <SelectItem value={'answer'}>
                <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                  answer
                </div>
              </SelectItem>
            </SelectContent>
          </Select> */}
          <Button size={'sm'}>Cancel</Button>
          <Button variant={'primary'} size={'sm'}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
