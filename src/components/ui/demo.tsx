import { AIVoiceInput } from "./ai-voice-input";
import { useState } from "react";

export function AIVoiceInputDemo() {
  const [recordings, setRecordings] = useState<{ duration: number; timestamp: Date }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [interimText, setInterimText] = useState("");

  const handleStop = (duration: number) => {
    setRecordings(prev => [...prev.slice(-4), { duration, timestamp: new Date() }]);
  };

  const handleVoiceResult = (transcript: string) => {
    console.log('Final voice result:', transcript);
    setSearchQuery(transcript);
    setInterimText("");
  };

  const handleInterimResult = (transcript: string) => {
    console.log('Interim voice result:', transcript);
    setInterimText(transcript);
  };

  const handleCancel = () => {
    console.log('Voice input cancelled');
    setInterimText("");
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery || interimText}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for equipment..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2 text-sm text-gray-500">
            {interimText && searchQuery === "" ? "Listening..." : ""}
          </div>
        </div>

        <AIVoiceInput
          onResult={handleVoiceResult}
          onInterimResult={handleInterimResult}
          onCancel={handleCancel}
        />
      </div>

      <div className="text-sm text-gray-600">
        <p>Search Query: "{searchQuery}"</p>
        <p>Interim Text: "{interimText}"</p>
      </div>
    </div>
  );
}
