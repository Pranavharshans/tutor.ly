"use client";

import { MessageCircle, Zap, Video, BookOpen, Users, GraduationCap, ArrowRight, Check, TrendingUp, Clock, Award, Sparkles, Home, Settings, User, Bell, Search, Plus } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">tutor.ly</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Ask your AI tutor anything..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <nav className="space-y-2">
              <a href="#" className="flex items-center space-x-3 text-gray-900 p-2 rounded-lg bg-blue-50 border border-blue-200">
                <Home className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Dashboard</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-600 p-2 rounded-lg hover:bg-gray-100">
                <MessageCircle className="w-5 h-5" />
                <span>AI Tutor</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-600 p-2 rounded-lg hover:bg-gray-100">
                <Zap className="w-5 h-5" />
                <span>Flashcards</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-600 p-2 rounded-lg hover:bg-gray-100">
                <Video className="w-5 h-5" />
                <span>Video Library</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-600 p-2 rounded-lg hover:bg-gray-100">
                <TrendingUp className="w-5 h-5" />
                <span>Progress</span>
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
            <p className="text-gray-600">Ready to continue your learning journey?</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl text-left transition-colors group">
              <MessageCircle className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg mb-1">Ask AI Tutor</h3>
              <p className="text-blue-100 text-sm">Get instant help with any question</p>
            </button>
            
            <button className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl text-left transition-colors group">
              <Zap className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg mb-1">Create Flashcards</h3>
              <p className="text-green-100 text-sm">Turn any text into study cards</p>
            </button>
            
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-xl text-left transition-colors group">
              <Video className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-lg mb-1">Watch Videos</h3>
              <p className="text-purple-100 text-sm">Personalized explanations</p>
            </button>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Progress */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Today's Progress</h2>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View all</button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">Mathematics Chapter 5</p>
                      <p className="text-sm text-gray-500">Calculus - Derivatives</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">85% complete</p>
                    <p className="text-xs text-gray-500">12 problems solved</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">Physics Practice Test</p>
                      <p className="text-sm text-gray-500">Mechanics - Forces</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">92% complete</p>
                    <p className="text-xs text-gray-500">18 questions done</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">Chemistry Flashcards</p>
                      <p className="text-sm text-gray-500">Organic Chemistry</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-yellow-600">67% complete</p>
                    <p className="text-xs text-gray-500">23 cards reviewed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Study Hours</span>
                    <span className="font-semibold text-gray-900">12.5h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Problems Solved</span>
                    <span className="font-semibold text-gray-900">47</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">AI Sessions</span>
                    <span className="font-semibold text-gray-900">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Average Score</span>
                    <span className="font-semibold text-green-600">85%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Streak</h3>
                <div className="text-3xl font-bold mb-1">7 days</div>
                <p className="text-blue-100 text-sm">Keep it up! You're on fire 🔥</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">Asked AI tutor about derivatives in calculus</p>
                  <p className="text-sm text-gray-500">2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">Created flashcards for "Organic Chemistry Basics"</p>
                  <p className="text-sm text-gray-500">15 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Video className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">Watched "Understanding Force Diagrams" video</p>
                  <p className="text-sm text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 