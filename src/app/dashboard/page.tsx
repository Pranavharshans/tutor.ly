"use client";

import { Brain, Zap, Play, Search, Bell, GraduationCap } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-gray-900">tutor.ly</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Ask anything..."
                className="w-80 h-10 pl-10 pr-4 bg-gray-50 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
            <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white text-sm font-medium">S</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Welcome */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Good morning, Sarah</h1>
          <p className="text-gray-600">What would you like to learn today?</p>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <button className="group p-8 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Ask AI</h3>
            <p className="text-sm text-gray-600">Get instant help with any question</p>
          </button>

          <button className="group p-8 rounded-2xl bg-green-50 hover:bg-green-100 transition-colors text-center">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Flashcards</h3>
            <p className="text-sm text-gray-600">Create cards from any text</p>
          </button>

          <button className="group p-8 rounded-2xl bg-purple-50 hover:bg-purple-100 transition-colors text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Play className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Videos</h3>
            <p className="text-sm text-gray-600">Watch personalized explanations</p>
          </button>
        </div>

        {/* Current Studies */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Continue learning</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Calculus Integration</h3>
                  <p className="text-sm text-gray-500 mt-1">Chapter 7 • 12 of 14 problems</p>
                </div>
                <div className="text-sm font-medium text-blue-600">85%</div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Forces & Motion</h3>
                  <p className="text-sm text-gray-500 mt-1">Physics • 23 of 25 questions</p>
                </div>
                <div className="text-sm font-medium text-green-600">92%</div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Organic Chemistry</h3>
                  <p className="text-sm text-gray-500 mt-1">Chapter 12 • 20 of 30 flashcards</p>
                </div>
                <div className="text-sm font-medium text-orange-600">67%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 