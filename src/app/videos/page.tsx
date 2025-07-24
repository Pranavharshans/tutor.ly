"use client";
import { useState, useRef } from "react";

const VideosPage = () => {
  const [topic, setTopic] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }
    setIsLoading(true);
    setError("");
    setVideoUrl("");
    try {
      const response = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      if (data.manimScript) {
        console.log("Generated Manim script:\n", data.manimScript);
      }
      if (data.videoUrl) {
        setVideoUrl(data.videoUrl);
      } else if (data.error) {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to generate video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoError = () => {
    setError("Failed to load video. Please try again.");
  };

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 bg-purple-600 rounded-md flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z" /></svg>
          </div>
          <span className="text-lg font-semibold text-gray-900">tutor.ly</span>
        </div>
        <a href="/dashboard" className="text-sm text-purple-700 hover:underline font-medium" tabIndex={0} aria-label="Go to Dashboard">&larr; Dashboard</a>
      </header>
      <section className="flex flex-col md:flex-row items-center justify-center flex-1 w-full max-w-6xl mx-auto px-4 py-12 gap-12">
        {/* Left: Heading, description, form */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            AI-powered <span className="text-purple-600">video lessons</span> made easy
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Turn any topic into a short, visual video explanation. Learn concepts with engaging, auto-generated videos tailored to your needs.
          </p>
          <form onSubmit={handleSubmit} className="flex items-center gap-3 bg-white rounded-xl shadow p-4 mb-4" aria-label="Video generation form">
            <input
              id="topic"
              name="topic"
              type="text"
              value={topic}
              onChange={handleInputChange}
              className="flex-1 border-none outline-none text-gray-900 bg-transparent placeholder-gray-400 text-base px-2"
              placeholder="Enter any topic (e.g., Black Holes)"
              aria-label="Topic for video generation"
              required
              tabIndex={0}
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg px-5 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-label="Generate Video"
              tabIndex={0}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center"><span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>Generating...</span>
              ) : (
                <span className="flex items-center">Generate <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z" /></svg></span>
              )}
            </button>
          </form>
          {error && (
            <div className="text-red-600 text-sm mt-2" role="alert">{error}</div>
          )}
        </div>
        {/* Right: Sample video card */}
        <div className="flex-1 max-w-md w-full">
          <div className="relative bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-purple-100">
            <span className="absolute -top-4 left-4 bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full shadow">AI Video</span>
            <div className="mb-2">
              <span className="block text-sm font-semibold text-gray-700 mb-1">Sample Video</span>
              <span className="block text-xs text-gray-400">Topic: The Water Cycle</span>
            </div>
            <div className="rounded-lg overflow-hidden border border-purple-200 bg-purple-50">
              <video
                ref={videoRef}
                src={videoUrl || "/Example%20of%20an%20animation%20with%20Manim.mp4"}
                controls
                className="w-full h-48 object-cover bg-black"
                aria-label="Generated video player"
                tabIndex={0}
                onError={handleVideoError}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-purple-700 font-medium">Instant Video</span>
              <span className="text-xs text-gray-400">~30 sec</span>
            </div>
            {isLoading && (
              <div className="flex items-center justify-center mt-2" aria-live="polite">
                <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></span>
                <span className="ml-2 text-purple-700">Generating video...</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default VideosPage; 