import Comments from '@/components/comments/comments';
import BackButton from '@/components/common/back-button';
import CommentForm from '@/components/forms/comment/comment-form';
import CommentButton from '@/components/posts/comment-button';
import PostOptions from '@/components/posts/post-options';
import ShareButton from '@/components/posts/share-button';
import VoteButtons from '@/components/posts/vote-buttons';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  cn,
} from '@repo/shared-ui';

export default function Page({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const post = {
    id: 'kdsjvkjhvnvd',
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, pariatur?',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
    comments: [
      {
        id: '1dvdbfvjfv',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
        replays: [],
      },
      {
        id: '2skbva,LISKV',
        body: 'Lorem ipsum dolor sit amet consecteturadipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
        replays: [],
      },
      {
        id: '3CSBJVHSDBK',
        body: 'Lorem ipsum dolor sit amet consecteturadipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
        replays: [
          {
            id: '2ACBVSDJVDSV,',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
            replays: [
              {
                id: '2JVCSDMJADHASV',
                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                replays: [
                  {
                    id: '2CJVHASVJDV',
                    body: 'Lorem ipsum dolor sit ametadipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                    replays: [
                      {
                        id: '2SCVJJHS,Kbalv.',
                        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                        replays: [],
                      },
                      {
                        id: '3ACVAS,,JASHKS',
                        body: 'Lorem ipsum dolor sit adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditateamet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                        replays: [],
                      },
                    ],
                  },
                  {
                    id: '3JSVC,JSVKHSCBS',
                    body: 'Lorem ipsum dolor sit amet adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditateconsectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                    replays: [],
                  },
                ],
              },
              {
                id: '3SKCVA,JVCSJA,CVAS,KCVBAS.KC',
                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                replays: [],
              },
            ],
          },
          {
            id: '3SCBSDIUF.BLVJB;EIG',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
            replays: [],
          },
        ],
      },
      {
        id: '3 CIKC DHSBFLIWETR923KFV',
        body: 'Lorem ipsum dolor sit amet consecteturadipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
        replays: [
          {
            id: 'BCBKELIYTP94JFNWE2',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
            replays: [
              {
                id: '2SCKBLSIDIE',
                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                replays: [
                  {
                    id: '2SVK.a vla.',
                    body: 'Lorem ipsum dolor sit ametadipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                    replays: [
                      {
                        id: '2SAVB>khw"fp',
                        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                        replays: [],
                      },
                      {
                        id: 'vb>IKvb>kV3',
                        body: 'Lorem ipsum dolor sit adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditateamet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                        replays: [],
                      },
                    ],
                  },
                  {
                    id: '3K.VB>kJNV.ZDNB.D.B',
                    body: 'Lorem ipsum dolor sit amet adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditateconsectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                    replays: [],
                  },
                ],
              },
              {
                id: '3sdjbV.KF.BFBN><dNB.F',
                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                replays: [],
              },
            ],
          },
          {
            id: '3DVB,DZVSGLWI',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
            replays: [],
          },
        ],
      },
      {
        id: '3DLv?b:e)IEgbkj',
        body: 'Lorem ipsum dolor sit amet consecteturadipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
        replays: [
          {
            id: '2B >LIEHg?lEB',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
            replays: [
              {
                id: '2bg?:eiug?ljbvou',
                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                replays: [
                  {
                    id: '2a>fbeouhG9W;EO/BFLaj',
                    body: 'Lorem ipsum dolor sit ametadipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                    replays: [
                      {
                        id: '2b>v:euoiBlqjfb:aofqe',
                        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                        replays: [],
                      },
                      {
                        id: '3 f>:iu:gtou#HT?ljbwEUI;RHE',
                        body: 'Lorem ipsum dolor sit adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditateamet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                        replays: [],
                      },
                    ],
                  },
                  {
                    id: '3<n f.KEHBFEKWFB<fkB',
                    body: 'Lorem ipsum dolor sit amet adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditateconsectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                    replays: [],
                  },
                ],
              },
              {
                id: '3 v<ekhFV>lfGe>kei',
                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                replays: [],
              },
              {
                id: '2a v>hjebfLIEGBKWEG',
                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                replays: [
                  {
                    id: '2WBFUIY59PAfeH5Y9P3',
                    body: 'Lorem ipsum dolor sit ametadipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                    replays: [
                      {
                        id: '2 FJE;R8237P5BLJAN:o#85',
                        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                        replays: [],
                      },
                      {
                        id: '3SVs> :iewtG.EBK,',
                        body: 'Lorem ipsum dolor sit adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditateamet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                        replays: [],
                      },
                    ],
                  },
                  {
                    id: 'FQLJJBT294P7PY;ab v>jeY3',
                    body: 'Lorem ipsum dolor sit amet adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditateconsectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                    replays: [],
                  },
                ],
              },
              {
                id: '3v >bskeJGBWEO;YRT984257 P20',
                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
                replays: [],
              },
            ],
          },
          {
            id: '3vb> ksrH;GWROUTBLjg<',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint blanditiis atque magnam perferendis maxime dolorem adipisci laboriosam eius natus cupiditate.',
            replays: [],
          },
        ],
      },
    ],
  };
  return (
    <main className={cn('w-full flex gap-4 max-w-7xl mx-auto')}>
      <section className="w-full lg:w-2/3 mx-auto border rounded-2xl space-y-2">
        <div className="w-full flex items-center justify-between gap-2 px-4 py-2">
          <div className="flex items-center gap-2">
            <BackButton />
            <div className="flex items-center gap-2">
              <Avatar className={cn('size-11')}>
                <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start gap-1">
                <h4 className="text-md font-bold">User name</h4>
                <span className="text-xs text-muted-foreground">
                  {'5min ago'}
                </span>
              </div>
            </div>
          </div>
          <PostOptions />
        </div>
        <section className="w-full px-4 md:px-6 space-y-4">
          <div className={cn('flex flex-col gap-4')}>
            <div className="flex">
              <span className="w-full bg-muted aspect-video rounded-2xl" />
            </div>
            <div className="flex flex-col gap-2">
              <h6 className="text-2xl font-bold">{post.title}</h6>
              <p className="text-md">{post.body}</p>
            </div>
          </div>
          <div className={cn('flex items-center gap-6')}>
            {['#salat', '#zakah', '#ramadan'].map((tag) => (
              <Button key={tag} variant={'outline'} size={'xs'}>
                {tag}
              </Button>
            ))}
          </div>
        </section>
        <section className="w-full px-4 md:px-6">
          <div className={cn('flex items-center gap-2 my-4')}>
            <VoteButtons />
            <ShareButton />
            <CommentButton />
          </div>
          <CommentForm />
        </section>

        <section className="w-full px-4 md:px-6 pt-8 pb-4">
          <Comments comments={post.comments} currentFocused={true} />
        </section>
      </section>
      <section className="w-full lg:w-1/3 border rounded-xl hidden lg:block">
        hello
      </section>
    </main>
  );
}
