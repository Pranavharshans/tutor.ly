"use client";

import { Zap, Play, GraduationCap, MessageSquare, ArrowRight, Clock, TrendingUp, Star } from "lucide-react";
import Link from "next/link";

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
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">S</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Welcome back, Sarah</h1>
          <p className="text-gray-600 mb-8">Ready to learn something new today? Choose where you&apos;d like to start.</p>
          
          {/* Quick Stats */}
          <div className="flex items-center space-x-8 text-sm text-gray-500 mb-8">
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>7-day streak</span>
            </span>
            <span className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>2h 30m today</span>
            </span>
            <span className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>85% avg score</span>
            </span>
          </div>
        </div>

        {/* Main Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* AI Chat */}
          <Link href="/chat" className="group">
            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer h-full">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Tutor</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Chat with your personal AI tutor. Get help with homework, explanations, and study guidance.
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <div>Last session:</div>
                  <div className="font-medium text-gray-700">Calculus derivatives</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>

          {/* Flashcards */}
          <Link href="/flashcards" className="group">
            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all cursor-pointer h-full">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flashcards</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Create smart flashcards from any text. Study with spaced repetition for better retention.
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <div>Cards due:</div>
                  <div className="font-medium text-gray-700">23 cards waiting</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>

          {/* Videos */}
          <Link href="/videos" className="group">
            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer h-full">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <Play className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Videos</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Generate and watch educational videos on any topic. Visualize concepts and learn interactively.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <div>New!</div>
                  <div className="font-medium text-purple-700">Try video generation</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        </div>

        {/* Current Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gray-600" />
              Recent Activity
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Asked about integration techniques</p>
                  <p className="text-xs text-gray-500">2 hours ago • AI Tutor</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Reviewed physics flashcards</p>
                  <p className="text-xs text-gray-500">Yesterday • Flashcards</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Play className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Watched chemistry explanation</p>
                  <p className="text-xs text-gray-500">3 days ago • Videos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Study Goals */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              This Week&apos;s Goals
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Complete calculus chapter</span>
                  <span className="text-sm text-blue-600 font-medium">3/5 done</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Review 100 flashcards</span>
                  <span className="text-sm text-green-600 font-medium">77/100</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '77%' }}></div>
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Watch 3 new videos</span>
                  <span className="text-sm text-purple-600 font-medium">1/3 done</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '33%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 