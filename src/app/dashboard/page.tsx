"use client";

import { Brain, Zap, Play, Search, GraduationCap, MessageSquare, ArrowRight, Clock, Sparkles, Video, BookOpen, Timer } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white border-b px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">tutor.ly</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="w-72 h-9 pl-10 pr-4 bg-gray-100 border-0 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:bg-white"
              />
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">S</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Hey Sarah 👋</h1>
          <p className="text-gray-600 mb-6">Pick what you need help with today</p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span>7 days in a row</span>
            </span>
            <span>•</span>
            <span>2h 30m studied today</span>
            <span>•</span>
            <span>You're doing great!</span>
          </div>
        </div>

        {/* Main Three Functions - Asymmetric Layout */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          {/* AI Chat - Large Left */}
          <div className="col-span-12 md:col-span-7 bg-white rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Chat with AI tutor</h3>
                  <p className="text-sm text-gray-500">Ask anything, get instant help</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">AI</span>
                </div>
                <span className="text-sm font-medium text-gray-900">Your tutor</span>
              </div>
              <p className="text-sm text-gray-700">"Hey! I can help you with calculus, physics, chemistry, or any other subject. What's on your mind?"</p>
            </div>
            
            <div className="text-sm text-gray-500">
              Last chat: <span className="text-gray-700 font-medium">Integration by parts</span> • 2 hours ago
            </div>
          </div>

          {/* Flashcards - Top Right */}
          <div className="col-span-12 md:col-span-5 bg-white rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Flashcards</h3>
                  <p className="text-sm text-gray-500">Study & memorize</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="font-medium text-sm text-gray-900 mb-1">Physics - Forces</div>
                <div className="text-xs text-green-700">23 cards ready to review</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="font-medium text-sm text-gray-900 mb-1">Chemistry formulas</div>
                <div className="text-xs text-gray-600">12 new cards created</div>
              </div>
            </div>
          </div>
        </div>

        {/* Videos - Full Width Below */}
        <div className="bg-white rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Personal video explanations</h3>
                <p className="text-sm text-gray-500">Watch videos made just for you</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 hover:border-purple-300 transition-colors">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900">Organic Chemistry</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">Reaction mechanisms explained step by step</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Timer className="w-3 h-3" />
                <span>8 min</span>
                <span>•</span>
                <span className="text-purple-600 font-medium">Ready to watch</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 hover:border-purple-300 transition-colors">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900">Calculus Integration</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">Visual approach to understanding integrals</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Timer className="w-3 h-3" />
                <span>12 min</span>
                <span>•</span>
                <span className="text-gray-600">Watched 3 days ago</span>
              </div>
            </div>
            
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Video className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">Generate new video</p>
                <p className="text-xs text-gray-500">Pick any topic you want to learn</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Work - Simple List */}
        <div className="bg-white rounded-lg p-6 border shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <BookOpen className="w-4 h-4 mr-2 text-gray-600" />
            What you're working on
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-gray-900">Calculus - Integration techniques</div>
                <div className="text-sm text-gray-500">12 of 15 problems done</div>
              </div>
              <div className="text-sm text-blue-600 font-medium">80%</div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-gray-900">Physics - Newton's laws review</div>
                <div className="text-sm text-gray-500">Flashcard session due</div>
              </div>
              <div className="text-sm text-green-600 font-medium">Ready</div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-gray-900">Chemistry - Molecular structures</div>
                <div className="text-sm text-gray-500">Video explanation available</div>
              </div>
              <div className="text-sm text-purple-600 font-medium">New</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 