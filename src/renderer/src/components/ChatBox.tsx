import React, { useState, useRef, useEffect, memo } from 'react';
import styles from './ChatBox.module.css';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    // TODO: Add backend call here and append assistant response
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className={styles['chatBox']}>
      <div className={styles['header']}>Assistant</div>
      <div className={styles['messages']}>
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender === 'user' ? styles['userMsg'] : styles['assistantMsg']}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles['inputBar']}>
        <input
          type="text"
          className={styles['input']}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Type a message..."
        />
        <button className={styles['sendBtn']} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default memo(ChatBox);
