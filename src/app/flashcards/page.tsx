"use client";

import { useState } from 'react';
import { Zap, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
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
      handleFlip();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      handlePrev();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Flashcards Generator</h1>

        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="Enter topic (e.g., World History)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={numCards}
              onChange={e => setNumCards(Math.max(1, parseInt(e.target.value) || 1))}
              min={1}
              max={20}
              className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading || !topic.trim()}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center justify-center"
            >
              <Zap className="w-4 h-4 mr-2" />
              Generate
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="text-center text-gray-600">Generating flashcards...</div>
        )}

        {flashcards.length > 0 && (
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="text-center mb-4 text-sm text-gray-500">
              Card {currentIndex + 1} of {flashcards.length}
            </div>

            <div
              className="relative w-full h-64 bg-gray-50 rounded-xl cursor-pointer select-none overflow-hidden"
              onClick={handleFlip}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="button"
              aria-label="Flip card"
            >
              <div
                className={`absolute inset-0 flex items-center justify-center p-6 text-center transition-transform duration-500 ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <p className="text-xl font-medium text-gray-900">
                  {flashcards[currentIndex].front}
                </p>
              </div>
              <div
                className={`absolute inset-0 flex items-center justify-center p-6 text-center transition-transform duration-500 rotate-y-180`}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <p className="text-xl font-medium text-gray-900">
                  {flashcards[currentIndex].back}
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
              <button
                onClick={handleFlip}
                className="px-4 py-2 bg-blue-200 rounded-lg hover:bg-blue-300 flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Flip
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === flashcards.length - 1}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 flex items-center"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 