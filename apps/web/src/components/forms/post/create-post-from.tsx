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
} from '@web/components/ui/form';
import { Icons } from '@web/components/ui/icons';
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
import { useToast } from '@web/components/ui/toast';
import cn from '@web/utils/cn';
import { FileQuestion, Globe, Newspaper } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ReactNode, use, useState } from 'react';
import { Dropzone, FileMosaic } from '@files-ui/react';
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import { z } from 'zod';
import './quill.style.css';
import './dropzone.style.css';
import AdvancedDropzone from '@web/components/ui/dropzone';
import { server_host } from '@web/constants/host.config';
const ReactQuill = dynamic(() => import('react-quill'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

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
      type: '',
      body: '',
      account: '',
      community: '',
      video: '',
      images: [],
    },
  });

  const [files, setFiles] = useState([]);
  const updateFiles = (incommingFiles: any) => {
    //do something with the files
    console.log('incomming files', incommingFiles);
    setFiles(incommingFiles);
    //even your own upload implementation
  };
  const removeFile = (id: string) => {
    setFiles(files.filter((x: any) => x.id !== id));
  };

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
              <TabsContent value="text" className="py-0 my-0">
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ReactQuill
                            theme="snow"
                            value={field.value}
                            defaultValue={field.value}
                            placeholder="body (optional)"
                            modules={{
                              toolbar: [
                                [{ font: [] }],
                                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                ['bold', 'italic', 'underline', 'strike'],
                                [{ list: 'ordered' }, { list: 'bullet' }],
                                [
                                  { indent: '-1' },
                                  { indent: '+1' },
                                  { align: [] },
                                ],
                                [{ color: [] }, { background: [] }],
                                [{ script: 'sub' }, { script: 'super' }],
                                ['blockquote', 'code-block'],
                                ['clean'],
                              ],
                            }}
                            onChange={field.onChange}
                            style={{ border: 'none' }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              <TabsContent value="image" className="py-0 my-0">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AdvancedDropzone
                          upload_url={`${server_host}/files`}
                          onUploaded={(files: string[]) =>
                            field.onChange(files)
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="video" className="py-0 my-0">
                <FormField
                  control={form.control}
                  name="video"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AdvancedDropzone
                          upload_url={`${server_host}/files`}
                          onUploaded={(files: string[]) =>
                            field.onChange(files[0])
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>
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
