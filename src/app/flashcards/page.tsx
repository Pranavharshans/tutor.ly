"use client";

import { useState } from 'react';
import { Zap, ArrowLeft, ArrowRight, RotateCcw, GraduationCap, Play, Sparkles } from 'lucide-react';
import Link from 'next/link';

type Flashcard = {
  front: string;
  back: string;
};

export default function Flashcards() {
  const [topic, setTopic] = useState('');
  const [numCards, setNumCards] = useState(5);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim() || numCards < 1) return;

    setIsLoading(true);
    setFlashcards([]);
    setCurrentIndex(0);
    setIsFlipped(false);

    try {
      const response = await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, numCards }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate flashcards');
      }

      const data = await response.json();
      setFlashcards(data.flashcards);
    } catch (error) {
      console.error('Error generating flashcards:', error);
      alert('Failed to generate flashcards. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
      handleFlip();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      handlePrev();
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
      <section className="relative overflow-hidden bg-white pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                Smart flashcards
                <span className="block text-green-600">made simple</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Turn any topic into interactive flashcards instantly. Study smarter with AI-powered cards that adapt to your learning style.
              </p>
              
              {/* Input Section */}
              <div className="mt-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    placeholder="Enter any topic (e.g., World History)"
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-white text-gray-900 placeholder-gray-400 text-base transition"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={numCards}
                      onChange={e => setNumCards(Math.max(1, parseInt(e.target.value) || 1))}
                      min={1}
                      max={20}
                      className="w-20 px-3 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-white text-gray-900 text-base transition"
                    />
                    <button
                      onClick={handleGenerate}
                      disabled={isLoading || !topic.trim()}
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white rounded-xl font-semibold flex items-center justify-center transition-all transform hover:scale-105 disabled:transform-none"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Generate
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg lg:max-w-md">
                {/* Floating Cards */}
                <div className="absolute -top-6 -left-6 bg-green-100 p-3 rounded-lg shadow-lg transform rotate-3 z-20">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-medium text-gray-800">AI Powered</span>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-blue-100 p-3 rounded-lg shadow-lg transform -rotate-3 z-20">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-gray-800">Instant Cards</span>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-purple-100 p-3 rounded-lg shadow-lg transform rotate-2 z-20">
                  <div className="flex items-center space-x-2">
                    <Play className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-medium text-gray-800">Study Mode</span>
                  </div>
                </div>
                
                {/* Main Preview Card */}
                <div className="relative bg-white rounded-2xl p-6 shadow-2xl z-10">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample Flashcard</h3>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-4 mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Front:</p>
                    <p className="text-gray-800">What is photosynthesis?</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Back:</p>
                    <p className="text-gray-800">The process by which plants convert sunlight into energy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-lg">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600 mr-3"></div>
              <span className="text-gray-700 font-medium">Generating your flashcards...</span>
            </div>
          </div>
        </section>
      )}

      {/* Flashcard Viewer */}
      {flashcards.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your Flashcards
              </h2>
              <p className="text-lg text-gray-600">
                Card {currentIndex + 1} of {flashcards.length} • Click to flip • Use arrow keys to navigate
              </p>
            </div>

            <div className="relative">
              {/* Main Flashcard */}
              <div
                className="relative w-full h-96 perspective-1000 cursor-pointer select-none mx-auto max-w-2xl"
                onClick={handleFlip}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="button"
                aria-label="Flip flashcard"
              >
                <div className={`absolute inset-0 transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden">
                    <div className="h-full bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl shadow-2xl border border-green-200 flex items-center justify-center p-8 relative overflow-hidden">
                      <div className="absolute -top-8 -right-8 w-32 h-32 bg-green-200 rounded-full opacity-20"></div>
                      <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-emerald-300 rounded-full opacity-10"></div>
                      <div className="relative z-10 text-center">
                        <div className="inline-flex items-center px-3 py-1 bg-green-200 rounded-full text-green-800 text-sm font-medium mb-4">
                          Question
                        </div>
                        <p className="text-2xl font-semibold text-gray-900 leading-relaxed">
                          {flashcards[currentIndex].front}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <div className="h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-2xl border border-blue-200 flex items-center justify-center p-8 relative overflow-hidden">
                      <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
                      <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-300 rounded-full opacity-10"></div>
                      <div className="relative z-10 text-center">
                        <div className="inline-flex items-center px-3 py-1 bg-blue-200 rounded-full text-blue-800 text-sm font-medium mb-4">
                          Answer
                        </div>
                        <p className="text-2xl font-semibold text-gray-900 leading-relaxed">
                          {flashcards[currentIndex].back}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center text-gray-700 font-medium transition-all border border-gray-200"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Previous
                </button>
                <button
                  onClick={handleFlip}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md hover:shadow-lg flex items-center font-medium transition-all transform hover:scale-105"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Flip Card
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === flashcards.length - 1}
                  className="px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center text-gray-700 font-medium transition-all border border-gray-200"
                >
                  Next
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                  {flashcards.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
} 