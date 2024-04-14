'use client';

import {useChat} from 'ai/react';

export default function Chat() {
    const {messages, input, handleInputChange, handleSubmit} = useChat();
  
  return (
      <div className="text-white">
          {messages.map(m => (
              <div key={m.id}>
                  {m.role === 'user' ? 'User: ' : 'AI: '}
                  {m.content}
              </div>
          ))}
          
          <form onSubmit={handleSubmit}>
              <input
                  className="text-black"
                  value={input}
                  placeholder="Say something..."
                  onChange={handleInputChange}
              />
          </form>
      </div>
  );
}