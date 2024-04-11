'use client';

import { createPostSchema } from '@common';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransitionContext } from '@web/components/contexts/transition-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@web/components/ui/avatar';
import { Button } from '@web/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@web/components/ui/form';
import { Icons } from '@web/components/ui/icons';
import { Input } from '@web/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@web/components/ui/select';
import { Separator } from '@web/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@web/components/ui/tabs';
import { Textarea } from '@web/components/ui/textarea';
import { useToast } from '@web/components/ui/toast';
import cn from '@web/utils/cn';
import { FileQuestion, Globe, Newspaper } from 'lucide-react';
import { ReactNode, use } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const postTypes = [
  {
    name: 'News',
    slug: 'NEWS',
    icon: <Newspaper />,
  },
  {
    name: 'Question',
    slug: 'QUESTION',
    icon: <FileQuestion />,
  },
];
export default function CreatePostFrom({
  communities,
}: {
  communities: {
    slug: string;
    name: string;
    image: string | undefined | null;
  }[];
}) {
  const { handleServerMutation, isMutating } = use(TransitionContext);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      type: '',
      body: '',
      account: '',
      community: '',
    },
  });

  async function onSubmit(values: z.infer<typeof createPostSchema>) {
    handleServerMutation(async () => {
      // const result = await loginWithEmail(values);
      // if (!result.success) {
      //   const snackbarKey = toast({
      //     description: result.message,
      //     variant: 'error',
      //   });
      // } else {
      //   const snackbarKey = toast({
      //     description: result.message,
      //     variant: 'success',
      //   });
      // }
    });
  }

  return (
    <div className="border rounded">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="flex flex-col">
            <Tabs defaultValue="text" className="w-full">
              <div className="col-span-4 px-2 py-2 flex gap-2">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue="NEWS"
                        >
                          <SelectTrigger
                            className={cn(
                              'h-full  ps-1 pe-2 py-1 flex gap-2 focus-visible:outline-none border rounded-lg'
                            )}
                          >
                            <SelectedValue
                              value={field.value}
                              items={postTypes.map((item) => ({
                                name: item.name,
                                slug: item.slug,
                                icon: (
                                  <Avatar className={cn('h-6 w-6 rounded-sm')}>
                                    <AvatarFallback
                                      className={cn('rounded-sm p-1')}
                                    >
                                      {item.icon}
                                    </AvatarFallback>
                                  </Avatar>
                                ),
                              }))}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {postTypes?.map((item) => (
                              <SelectItem key={item.slug} value={item.slug}>
                                <div className="flex items-center gap-2 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                                  <Avatar className={cn('h-6 w-6 rounded-sm')}>
                                    <AvatarFallback
                                      className={cn('rounded-sm')}
                                    >
                                      {item.icon}
                                    </AvatarFallback>
                                  </Avatar>
                                  {item.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <TabsList>
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="image">Image</TabsTrigger>
                  <TabsTrigger value="video">Video</TabsTrigger>
                </TabsList>
              </div>
              <Separator className="col-span-4" />
              <TabsContent value="text" className='py-0 my-0'>
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Title"
                            type="text"
                            {...field}
                            className="rounded-none border-none h-10"
                          />
                        </FormControl>
                        <FormMessage className="px-2" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="body (optional)"
                            {...field}
                            className="rounded-none border-none"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              <TabsContent value="image" className='py-0 my-0'>Upload Image.</TabsContent>
              <TabsContent value="video" className='py-0 my-0'>Upload Video</TabsContent>
            </Tabs>
            <Separator className="col-span-4" />
            <div className="col-span-4 px-2 py-2 flex gap-2 justify-between">
              <FormField
                control={form.control}
                name="community"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        defaultValue="__public"
                        onValueChange={(value) =>
                          form.setValue('community', value)
                        }
                      >
                        <SelectTrigger
                          className={cn(
                            'w-full h-full ps-1 pe-2 flex gap-2 focus-visible:outline-none border rounded-md'
                          )}
                        >
                          <SelectedValue
                            value={field.value}
                            items={communities.map((item) => ({
                              name: item.name,
                              slug: item.slug,
                              icon: (
                                <Avatar className={cn('h-6 w-6 rounded-sm')}>
                                  {item.image && (
                                    <AvatarImage
                                      src={item.image}
                                      alt={item.slug}
                                    />
                                  )}
                                  <AvatarFallback className={cn('rounded-sm')}>
                                    {item.name[0].toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                              ),
                            }))}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={'__public'}>
                            <div className="flex items-center gap-2 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                              <Avatar className={cn('h-6 w-6 rounded-sm')}>
                                <AvatarFallback className={cn('rounded-sm')}>
                                  <Globe />
                                </AvatarFallback>
                              </Avatar>
                              <span>public</span>
                            </div>
                          </SelectItem>
                          {communities?.map((community) => (
                            <SelectItem
                              key={community.slug}
                              value={community.slug}
                            >
                              <div className="flex items-center gap-2 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                                <Avatar className={cn('h-6 w-6 rounded-sm')}>
                                  {community.image && (
                                    <AvatarImage
                                      src={community.image}
                                      alt={community.slug}
                                    />
                                  )}
                                  <AvatarFallback className={cn('rounded-sm')}>
                                    {community.name[0].toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                {community.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex gap-2 items-center">
                <Button disabled={isMutating}>
                  {isMutating && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Draft
                </Button>
                <Button disabled={isMutating} variant={'primary'}>
                  {isMutating && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Publish
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

function SelectedValue({
  value,
  items,
  placeholder,
}: {
  value: string | undefined;
  placeholder?: ReactNode;
  items: { name: string; slug: string; icon: ReactNode }[];
}) {
  console.log({ value });

  const item = items?.find((item) => item.slug === value);

  return (
    <SelectValue placeholder={placeholder}>
      {item && (
        <div className="flex items-center gap-2">
          {item.icon}
          <span className="line-clamp-1">{item.name}</span>
        </div>
      )}
    </SelectValue>
  );
}
