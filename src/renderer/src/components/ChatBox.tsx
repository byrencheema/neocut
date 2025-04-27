import React, { useState, useRef, useEffect, memo, FC } from 'react';
import styles from './ChatBox.module.css';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
}

const ChatBox: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    const userInput = input;
    setInput('');
    try {
      // Basic system prompt from project.md for ffmpeg command generation
      const systemPrompt = `Neo_Cut is a local AI-powered video editing assistant that translates editing requests into ffmpeg CLI commands. Only output a valid ffmpeg command without extra explanation.`;
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer INSERT_YOUR_API_KEY_HERE',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userInput }
          ]
        }),
      });
      const data = await response.json();
      const assistantText = data.choices?.[0]?.message?.content || 'No response';
      setMessages(prev => [...prev, { sender: 'assistant', text: assistantText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { sender: 'assistant', text: 'Error: unable to get response' }]);
    }
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
