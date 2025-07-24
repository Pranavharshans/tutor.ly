'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, GraduationCap, MessageSquare, Brain, Sparkles, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
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
    setInput('');
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">tutor.ly</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
              Your personal
              <span className="block text-blue-600">AI tutor</span>
            </h1>
            <p className="mt-6 text-xl text-gray-500 max-w-3xl mx-auto">
              Get instant help with homework, explanations, and study guidance. Ask anything - your AI tutor is here 24/7.
            </p>
          </div>

          {/* Floating decorative elements */}
          <div className="mt-12 relative max-w-2xl mx-auto">
            <div className="absolute -top-6 -left-6 bg-blue-100 p-3 rounded-lg shadow-lg transform rotate-3 z-20">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium text-gray-800">Smart AI</span>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-purple-100 p-3 rounded-lg shadow-lg transform -rotate-3 z-20">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-medium text-gray-800">24/7 Available</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-green-100 p-3 rounded-lg shadow-lg transform rotate-2 z-20">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium text-gray-800">Instant Help</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <section className="pb-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {messages.length === 0 && (
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to learn?</h2>
              <p className="text-gray-600">Start by asking me any question!</p>
            </div>
          )}

          {/* Chat Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
            {/* Messages Area */}
            <div className="p-6">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-gray-500">Start a conversation with your AI tutor</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="flex items-start space-x-3 max-w-[80%]">
                        {message.role === 'assistant' && (
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <MessageSquare className="w-4 h-4 text-blue-600" />
                          </div>
                        )}
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            message.role === 'user'
                              ? 'bg-blue-600 text-white ml-auto'
                              : 'bg-gray-50 text-gray-900'
                          }`}
                        >
                          {message.role === 'assistant' ? (
                            <div className="prose prose-sm max-w-none prose-p:mb-2 prose-ul:mb-2 prose-ol:mb-2 prose-li:my-0">
                              <ReactMarkdown>{message.content}</ReactMarkdown>
                            </div>
                          ) : (
                            <p className="text-sm">{message.content}</p>
                          )}
                        </div>
                        {message.role === 'user' && (
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-sm font-medium">You</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-3 max-w-[80%]">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <MessageSquare className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="px-4 py-3 rounded-2xl bg-gray-50">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
                            <span className="text-sm text-gray-600 ml-2">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage(input);
                }}
                className="flex items-center space-x-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your studies..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white text-gray-900 placeholder-gray-400 text-base transition"
                  disabled={isLoading}
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl font-medium flex items-center justify-center transition-all transform hover:scale-105 disabled:transform-none"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatPage; 