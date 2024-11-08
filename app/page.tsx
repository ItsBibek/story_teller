'use client';
import { useState } from "react";
import StoryModal from "./components/StoryModal";

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const generateStory = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError('');
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to generate story');
      }

      if (!data.story) {
        throw new Error('No story was generated');
      }

      setStory(data.story);
      setShowModal(true); // Show modal when story is generated
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again!';
      setError(`Oops! ${errorMessage}`);
      console.error('Error details:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8 relative">
        <main className="max-w-2xl mx-auto flex flex-col items-center gap-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-purple-600 mb-4 animate-float">
              Story Teller ✍️
            </h1>
            <p className="text-lg text-gray-600">
              Transform your ideas into captivating stories
            </p>
          </div>

          {/* Story Input Section */}
          <div className="w-full space-y-4 bg-white p-6 rounded-xl shadow-lg">
            <textarea
              className="w-full p-4 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 min-h-[100px] text-lg"
              placeholder="What would you like your story to be about? (Example: a mysterious stranger with a hidden past)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={generateStory}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  Creating your story...
                </span>
              ) : (
                "Create My Story! 🌟"
              )}
            </button>
            {error && (
              <p className="text-red-500 text-center">{error}</p>
            )}
          </div>
        </main>

        {/* Signature */}
        <a 
          href="https://github.com/ItsBibek"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 text-purple-600 font-bold text-lg animate-float
            bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl
            shadow-[4px_4px_10px_rgba(0,0,0,0.1)]
            border border-purple-100
            hover:shadow-[6px_6px_12px_rgba(0,0,0,0.15)]
            hover:transform hover:-translate-y-0.5
            transition-all duration-300
            cursor-pointer"
        >
          Made By Bibek ✨
        </a>
      </div>

      {/* Story Modal */}
      {showModal && story && (
        <StoryModal
          story={story}
          onClose={() => {
            setShowModal(false);
            setPrompt('');
          }}
        />
      )}
    </>
  );
}
