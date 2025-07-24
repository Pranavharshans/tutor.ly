'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m here to help you learn. What are you working on?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const placeholders = [
    "Explain quantum physics in simple terms",
    "Help me solve this calculus problem",
    "What's the difference between React and Vue?", 
    "How do I write a persuasive essay?",
    "Explain the water cycle step by step",
    "Help me understand photosynthesis",
    "What are the causes of World War I?",
    "How does machine learning work?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      handleSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Button */}
      <div className="absolute top-6 left-6 z-10">
        <Link 
          href="/dashboard"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Dashboard</span>
        </Link>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-20">
        <div className="max-w-3xl mx-auto">
          {messages.length === 1 ? (
            // Welcome state with centered input
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">
                  Ask Your AI Tutor Anything
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                  Get instant help with homework, explanations of complex topics, and personalized learning guidance.
                </p>
              </div>

              <div className="w-full max-w-xl">
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={handleChange}
                  onSubmit={onSubmit}
                />
              </div>
            </div>
          ) : (
            // Chat conversation view
            <div className="space-y-6 mb-8">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex space-x-3 max-w-[75%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-5 h-5" />
                      ) : (
                        <span className="font-medium text-sm">AI</span>
                      )}
                    </div>
                    
                    {/* Message Content */}
                    <div className="flex-1">
                      <div className={`rounded-lg px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}>
                        <div className="whitespace-pre-wrap leading-relaxed text-sm">
                          {message.content}
                        </div>
                      </div>
                      <div className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-right text-gray-500' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex space-x-3 max-w-[75%]">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                      <span className="font-medium text-sm">AI</span>
                    </div>
                    <div className="flex-1">
                      <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-gray-600 text-sm">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Fixed Input at Bottom - Only show when in conversation mode */}
      {messages.length > 1 && (
        <div className="border-t border-gray-200 bg-white p-6">
          <div className="max-w-3xl mx-auto">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage; 