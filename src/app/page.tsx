import { MessageCircle, Zap, Video, BookOpen, Users, GraduationCap, ArrowRight, Check, TrendingUp, Clock, Award, Sparkles, Twitter, Facebook, Instagram, Linkedin, Mail, Star, Play } from "lucide-react";

export default function Home() {
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
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Features</a>
                <a href="#solutions" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Solutions</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Pricing</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Sign in
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Get demo
              </button>
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
                Study smarter, not harder
                <span className="block text-blue-600">with AI by your side</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Get instant help from your AI tutor, turn any text into flashcards, and watch personalized videos when you're stuck. Everything you need to ace your exams.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors inline-flex items-center">
                  Try it free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                {/* Floating Cards */}
                <div className="absolute -top-6 -left-6 bg-yellow-100 p-3 rounded-lg shadow-lg transform rotate-3 z-20">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-gray-800">AI Tutor 24/7</span>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-green-100 p-3 rounded-lg shadow-lg transform -rotate-3 z-20">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-medium text-gray-800">Instant flashcards</span>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-purple-100 p-3 rounded-lg shadow-lg transform rotate-2 z-20">
                  <div className="flex items-center space-x-2">
                    <Video className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-medium text-gray-800">Custom videos</span>
                  </div>
                </div>
                
                {/* Main Card */}
                <div className="relative bg-white rounded-lg p-6 shadow-xl z-10">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Learning</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900">Mathematics Chapter 5</span>
                      </div>
                      <span className="text-xs text-blue-600 font-medium">85%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900">Physics Practice Test</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">92%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900">Chemistry Flashcards</span>
                      </div>
                      <span className="text-xs text-yellow-600 font-medium">67%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Your AI-powered study companion
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three powerful features that adapt to your learning style and help you achieve better results
            </p>
          </div>

          {/* Simple Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Top Left - AI Chatbot (Larger) */}
            <div className="lg:col-span-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart AI Tutor</h3>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  Ask anything, anytime. Our AI understands context and provides detailed explanations tailored to your level. Get instant help across all subjects with step-by-step solutions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                    <span>Available 24/7 across all subjects</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                    <span>Explains step-by-step solutions</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                    <span>Adapts to your learning pace</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                    <span>Contextual understanding</span>
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-300 rounded-full opacity-10"></div>
            </div>

            {/* Top Right - Flashcards (Smaller) */}
            <div className="lg:col-span-2 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Flashcards</h3>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  Turn any text into smart flashcards instantly. Perfect for quick revision and memory retention.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-700">
                    <Sparkles className="w-4 h-4 mr-3 text-green-600 flex-shrink-0" />
                    <span>AI-powered spaced repetition</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Clock className="w-4 h-4 mr-3 text-green-600 flex-shrink-0" />
                    <span>Smart timing algorithms</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-200 rounded-full opacity-20"></div>
            </div>

            {/* Bottom - Custom Videos (Full Width) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl p-8 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Video Explanations</h3>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    Get custom video explanations for topics you find challenging. Our AI creates visual learning content tailored to your specific needs and learning style.
                  </p>
                  <div className="flex items-center justify-between text-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">95%</div>
                      <div className="text-sm text-gray-600">Better understanding</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">2 min</div>
                      <div className="text-sm text-gray-600">Average video length</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">50+</div>
                      <div className="text-sm text-gray-600">Subjects covered</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-sm font-medium text-gray-900 mb-2">Visual Concepts</div>
                    <div className="text-xs text-gray-600">Complex topics broken down into digestible visual explanations</div>
                  </div>
                  <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-sm font-medium text-gray-900 mb-2">Step-by-step Solutions</div>
                    <div className="text-xs text-gray-600">Problem-solving guides with clear methodology</div>
                  </div>
                  <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-sm font-medium text-gray-900 mb-2">Doubt Clarification</div>
                    <div className="text-xs text-gray-600">Instant video responses to your specific questions</div>
                  </div>
                  <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-sm font-medium text-gray-900 mb-2">Learning Paths</div>
                    <div className="text-xs text-gray-600">Personalized video sequences for comprehensive understanding</div>
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-purple-200 rounded-full opacity-20"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-indigo-300 rounded-full opacity-15"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Start learning with tutor.ly today
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join students who are improving their grades with AI-powered learning
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Get started for free
            </button>
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors">
              Learn more
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Free 7-day trial • No credit card required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">tutor.ly</span>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Personalized learning powered by AI. Transform your study experience with intelligent tutoring, instant flashcards, and custom video explanations.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">AI Tutor</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Flashcards</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Video Library</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Progress Tracking</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Study Plans</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Community</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Student Resources</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Tutorials</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-600">
                © 2024 tutor.ly. All rights reserved.
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  hello@tutor.ly
                </div>
                <div className="text-sm text-gray-600">
                  Made with ❤️ for students worldwide
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
