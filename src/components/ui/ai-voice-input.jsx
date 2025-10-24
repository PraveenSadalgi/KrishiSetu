import React, { useState, useEffect, useRef } from 'react';
import { Mic } from 'lucide-react';
import { cn } from '../../lib/utils';

const AIVoiceInput = ({
  onResult,
  onCancel,
  onInterimResult,
  visualizerBars = 48,
  className
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const resultProcessedRef = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let intervalId;

    if (submitted) {
      resultProcessedRef.current = false;
      startVoiceRecognition();
      intervalId = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      stopVoiceRecognition();
      setTime(0);
      setTranscript("");
      resultProcessedRef.current = false;
    }

    return () => {
      clearInterval(intervalId);
      stopVoiceRecognition();
    };
  }, [submitted]);

  const startVoiceRecognition = () => {
    try {
      console.log('Checking speech recognition support...');
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.error('Speech recognition not supported');
        alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
        setSubmitted(false);
        return;
      }

      // Initialize speech recognition directly - the API handles microphone permissions
      initializeSpeechRecognition();
    } catch (error) {
      console.error('Failed to start voice recognition:', error);
      alert(`Failed to start voice recognition: ${error.message}`);
      setSubmitted(false);
    }
  };

  const initializeSpeechRecognition = () => {
    try {
      console.log('Initializing speech recognition...');
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onstart = () => {
        console.log('Voice recognition started successfully');
        setIsListening(true);
        // Keep the submitted state active while listening
      };

      recognitionRef.current.onresult = (event) => {
        console.log('Speech recognition result received:', event);
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        console.log('Final transcript:', finalTranscript);
        console.log('Interim transcript:', interimTranscript);

        setTranscript(finalTranscript || interimTranscript);

        if (finalTranscript && !resultProcessedRef.current) {
          resultProcessedRef.current = true;
          console.log('Calling onResult with:', finalTranscript);
          onResult?.(finalTranscript);
          setSubmitted(false);
        } else if (interimTranscript && interimTranscript.trim().length > 0) {
          // For interim results, call onInterimResult to show live updates
          console.log('Interim result:', interimTranscript);
          onInterimResult?.(interimTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        let errorMessage = 'Speech recognition error occurred.';
        switch(event.error) {
          case 'no-speech':
            errorMessage = 'No speech was detected. Please speak clearly and try again.';
            break;
          case 'audio-capture':
            errorMessage = 'Audio capture failed. Please check your microphone.';
            break;
          case 'not-allowed':
            errorMessage = 'Microphone access denied. Please allow microphone access.';
            break;
          case 'network':
            errorMessage = 'Network error occurred during speech recognition.';
            break;
          case 'aborted':
            // Aborted is usually not an error - just ignore it
            console.log('Speech recognition was aborted (usually normal)');
            setSubmitted(false);
            return;
          default:
            errorMessage = `Speech recognition error: ${event.error}`;
        }
        // Only log actual errors, not aborted
        console.error('Speech recognition error:', event.error, event);
        // Show user-friendly message instead of alert
        console.warn('Voice search error:', errorMessage);
        // Don't show alert for no-speech, just reset state
        if (event.error !== 'no-speech') {
          alert(errorMessage);
        }
        setSubmitted(false);
      };

      recognitionRef.current.onend = () => {
        console.log('Voice recognition ended');
        setIsListening(false);
        // Only reset submitted state after a delay to allow for final result processing
        // This prevents the UI from disappearing too quickly
        setTimeout(() => {
          if (!resultProcessedRef.current) {
            setSubmitted(false);
          }
        }, 1000); // 1 second delay
      };

      console.log('Starting speech recognition...');
      recognitionRef.current.start();
    } catch (error) {
      console.error('Failed to initialize speech recognition:', error);
      alert(`Failed to start voice recognition: ${error.message}`);
      setSubmitted(false);
    }
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleClick = () => {
    if (submitted) {
      setSubmitted(false);
      onCancel?.();
    } else {
      setSubmitted(true);
      // Start voice recognition immediately when clicked
      startVoiceRecognition();
    }
  };

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-2">
        <button
          className={cn(
            "group w-16 h-16 rounded-xl flex items-center justify-center transition-colors",
            submitted
              ? "bg-red-500 hover:bg-red-600"
              : "bg-none hover:bg-black/10 dark:hover:bg-white/10"
          )}
          type="button"
          onClick={handleClick}
        >
          {submitted ? (
            <div className="w-4 h-4 bg-white rounded-sm animate-pulse" />
          ) : (
            <Mic className={cn(
              "w-6 h-6 transition-colors",
              isListening ? "text-red-500" : "text-black/70 dark:text-white/70"
            )} />
          )}
        </button>

        <span
          className={cn(
            "font-mono text-sm transition-opacity duration-300",
            submitted
              ? "text-black/70 dark:text-white/70"
              : "text-black/30 dark:text-white/30"
          )}
        >
          {formatTime(time)}
        </span>

        <div className="h-4 w-64 flex items-center justify-center gap-0.5">
          {[...Array(visualizerBars)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-0.5 rounded-full transition-all duration-300",
                submitted
                  ? "bg-black/50 dark:bg-white/50 animate-pulse"
                  : "bg-black/10 dark:bg-white/10 h-1"
              )}
              style={
                submitted && isClient
                  ? {
                      height: `${20 + Math.random() * 80}%`,
                      animationDelay: `${i * 0.05}s`,
                    }
                  : undefined
              }
            />
          ))}
        </div>

        <p className="h-4 text-xs text-black/70 dark:text-white/70">
          {submitted ? (transcript || "Listening...") : "Click to speak"}
        </p>

        {submitted && (
          <button
            onClick={() => {
              setSubmitted(false);
              onCancel?.();
            }}
            className="mt-2 px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export { AIVoiceInput };
