'use client';

interface StoryModalProps {
  story: string;
  onClose: () => void;
}

export default function StoryModal({ story, onClose }: StoryModalProps) {
  const formattedStory = story.split('\n').filter(para => para.trim() !== '');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] m-4 rounded-2xl shadow-2xl overflow-hidden animate-scale-up">
        <div className="p-8 overflow-y-auto max-h-[90vh]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-purple-600">
              Your Story ✨
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          <div className="prose prose-lg max-w-none">
            {formattedStory.map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Close Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 