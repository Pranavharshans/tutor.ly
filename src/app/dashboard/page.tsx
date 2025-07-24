"use client";

import { Brain, Zap, Play, Search, Bell, GraduationCap, MessageSquare, ArrowRight, Plus, Clock, Star, Sparkles, Video, BookOpen, ChevronRight, Timer, Target, Award } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">tutor.ly</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search or ask anything..."
                  className="w-80 h-10 pl-10 pr-4 bg-gray-100/70 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-semibold">S</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Sarah</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">Choose your learning superpower</p>
          
          {/* Quick Stats */}
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>7-day streak</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>2.5h today</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>85% avg score</span>
            </div>
          </div>
        </div>

        {/* Main Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* AI Chatbot */}
          <div className="group relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">AI Tutor Chat</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Get instant answers to any question. Your personal AI tutor is here 24/7 to help you understand any concept.
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <div className="font-semibold">Last session:</div>
                  <div className="text-blue-200">Calculus derivatives</div>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>

          {/* Flashcards */}
          <div className="group relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 text-white overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">Smart Flashcards</h3>
              <p className="text-emerald-100 mb-6 leading-relaxed">
                Transform any text into intelligent flashcards. AI-powered spaced repetition for maximum retention.
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <div className="font-semibold">Ready to review:</div>
                  <div className="text-emerald-200">23 cards waiting</div>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>

          {/* Video Learning */}
          <div className="group relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-8 text-white overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">Personal Videos</h3>
              <p className="text-purple-100 mb-6 leading-relaxed">
                Generate custom video explanations tailored to your learning style and current knowledge level.
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <div className="font-semibold">Recommended:</div>
                  <div className="text-purple-200">Physics - Forces</div>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
              Quick Actions
            </h3>
            
            <div className="space-y-4">
              <button className="w-full p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Ask a Question</div>
                      <div className="text-sm text-gray-500">Start a new chat session</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                </div>
              </button>

              <button className="w-full p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors group text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Create Flashcards</div>
                      <div className="text-sm text-gray-500">From text or notes</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                </div>
              </button>

              <button className="w-full p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors group text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Video className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Generate Video</div>
                      <div className="text-sm text-gray-500">Custom explanation</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                </div>
              </button>
            </div>
          </div>

          {/* Recent Learning */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              Continue Learning
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Calculus Integration</h4>
                  <span className="text-sm font-medium text-blue-600">85% complete</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Chapter 7 • 12 of 14 problems solved</p>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Physics Flashcards</h4>
                  <span className="text-sm font-medium text-emerald-600">23 due</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Forces & Motion • Ready for review</p>
                <div className="flex items-center space-x-2">
                  <Timer className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-emerald-600">15 min session</span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Chemistry Video</h4>
                  <span className="text-sm font-medium text-purple-600">New</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Organic Reactions • Personalized for you</p>
                <div className="flex items-center space-x-2">
                  <Play className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-purple-600">12 min watch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 