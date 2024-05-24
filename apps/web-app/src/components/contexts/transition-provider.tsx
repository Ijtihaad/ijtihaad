'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
  useTransition,
} from 'react';

export const TransitionContext = createContext({
  handleServerMutation: function (
    callBack: () => Promise<void>,
  ): Promise<void> {
    throw new Error('Function not implemented.');
  },
  isMutating: false,
});

export default function TransitionProvider({ children }: { children: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, setPending] = useState(false);
  const [isMutating, setMutating] = useState(false);
  const [isTransitionStarted, startTransition] = useTransition();

  useEffect(() => {
    startTransition(console.log);
  }, [pathname, searchParams]);

  useLayoutEffect(() => {
    setMutating(isPending || isTransitionStarted);
  }, [isPending, isTransitionStarted]);

  async function handleServerMutation(callBack: () => Promise<void>) {
    setPending(true);
    await callBack();
    startTransition(router.refresh);
    setPending(false);
  }

  const values = {
    handleServerMutation,
    isMutating,
  };

  return (
    <TransitionContext.Provider value={values}>
      {isMutating && <></>}
      {children}
    </TransitionContext.Provider>
  );
}
