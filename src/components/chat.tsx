import React from 'react';
// import { useChatData } from './hooks/useChatData';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const Chat = () => {
  //   const { data, error } = useChatData();
  const data = [
    { id: 1, text: 'Hello' },
    { id: 2, text: 'Hi' },
    { id: 3, text: 'How are you?' },
  ];
  const error = false;
  if (error) return <Alert variant='destructive'>Failed to load</Alert>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className='p-4 bg-gray-100 rounded-lg shadow-md'>
      <ul className='space-y-2'>
        {data.map((message) => (
          <li key={message.id} className='p-2 bg-white rounded shadow-sm'>
            {message.text}
          </li>
        ))}
      </ul>
      <form>
        <Textarea
          placeholder='Type a message'
          aria-label='Type a message'
          required
        />
        <Button type='submit' aria-label='Send'>
          {loading ? (
            'Generating...'
          ) : (
            <span className='material-symbols-outlined'>send</span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default Chat;
