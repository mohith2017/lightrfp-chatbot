'use client';

import type { Attachment, Message } from 'ai';
import { useChat } from 'ai/react';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import { ChatHeader } from '@/components/chat-header';
import type { Vote } from '@/lib/db/schema';
import { fetcher } from '@/lib/utils';

import { Block } from './block';
import { MultimodalInput } from './multimodal-input';
import { Messages } from './messages';
import { VisibilityType } from './visibility-selector';
import { useBlockSelector } from '@/hooks/use-block';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function Chat({
  id,
  initialMessages,
  selectedModelId,
  selectedVisibilityType,
  isReadonly,
}: {
  id: string;
  initialMessages: Array<Message>;
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const { mutate } = useSWRConfig();

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
    reload,
  } = useChat({
    id,
    body: { id, modelId: selectedModelId },
    initialMessages,
    experimental_throttle: 100,
    onFinish: () => {
      mutate('/api/history');
    },
  });

  const { data: votes } = useSWR<Array<Vote>>(
    `/api/vote?chatId=${id}`,
    fetcher,
  );

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const isBlockVisible = useBlockSelector((state) => state.isVisible);

  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <div className="flex justify-center items-center h-screen">
          <img src="/images/lightrfp-logo.png" alt="Chat Logo" className="w-96 h-32" />
        </div>

        <div className="fixed bottom-4 right-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="open-chat">
              <AccordionTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@lightrfp" className="bg-white"/>
                  {/* <AvatarFallback>CN</AvatarFallback> */}
                </Avatar>
              </AccordionTrigger>
              <AccordionContent className="max-h-96 overflow-y-auto">
                <Messages
                  chatId={id}
                  isLoading={isLoading}
                  votes={votes}
                  messages={messages}
                  setMessages={setMessages}
                  reload={reload}
                  isReadonly={isReadonly}
                  isBlockVisible={isBlockVisible}
                />

                <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
                  {!isReadonly && (
                    <MultimodalInput
                      chatId={id}
                      input={input}
                      setInput={setInput}
                      handleSubmit={handleSubmit}
                      isLoading={isLoading}
                      stop={stop}
                      attachments={attachments}
                      setAttachments={setAttachments}
                      messages={messages}
                      setMessages={setMessages}
                      append={append}
                    />
                  )}
                </form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Block
          chatId={id}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
          attachments={attachments}
          setAttachments={setAttachments}
          append={append}
          messages={messages}
          setMessages={setMessages}
          reload={reload}
          votes={votes}
          isReadonly={isReadonly}
        />
      </div>
    </>
  );
}
