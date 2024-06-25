import { Button } from '@repo/shared-ui';
import { Edit, Home, MessageCircleMore, Search, User2 } from 'lucide-react';
export default function MainBottomBar() {
  return (
    <div className="block lg:hidden">
      <div className="border-t fixed bottom-0 inset-x-0 h-fit flex items-center justify-between bg-background py-2 px-4">
        <Button width={'icon'} className="flex flex-col items-center p-2">
          <Home className="size-10 font-bold" />
        </Button>
        <Button width={'icon'} className="flex flex-col items-center p-2">
          <Search className="size-12 font-bold" />
        </Button>
        <Button width={'icon'} className="flex flex-col items-center p-2">
          <Edit className="size-10 font-bold" />
        </Button>
        <Button width={'icon'} className="flex flex-col items-center p-2">
          <MessageCircleMore className="size-10 font-bold" />
        </Button>
        <Button width={'icon'} className="flex flex-col items-center p-2">
          <User2 className="size-10 font-bold" />
        </Button>
      </div>
    </div>
  );
}
