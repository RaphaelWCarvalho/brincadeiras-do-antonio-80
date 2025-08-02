
import React, { useRef, useEffect } from 'react';

interface AudioFeedbackProps {
  play: boolean;
  message: string;
  onComplete?: () => void;
}

const AudioFeedback: React.FC<AudioFeedbackProps> = ({ play, message, onComplete }) => {
  const synth = useRef<SpeechSynthesis | null>(null);
  
  useEffect(() => {
    // Initialize speech synthesis API
    synth.current = window.speechSynthesis;
    
    // Cancel any ongoing speech when component unmounts
    return () => {
      if (synth.current) {
        synth.current.cancel();
      }
    };
  }, []);
  
  useEffect(() => {
    if (play && message && synth.current) {
      // Cancel any ongoing speech
      synth.current.cancel();
      
      // Create a new speech instance
      const utterance = new SpeechSynthesisUtterance(message);
      
      // Load available voices
      let voices = synth.current.getVoices();
      
      // If voices array is empty (happens in some browsers), try to get them again
      if (voices.length === 0) {
        // Some browsers need a small delay to load voices
        setTimeout(() => {
          voices = synth.current?.getVoices() || [];
          setVoiceForUtterance(utterance, voices);
          startSpeaking(utterance);
        }, 100);
      } else {
        setVoiceForUtterance(utterance, voices);
        startSpeaking(utterance);
      }
    }
  }, [play, message, onComplete]);
  
  // Function to set the appropriate voice
  const setVoiceForUtterance = (utterance: SpeechSynthesisUtterance, voices: SpeechSynthesisVoice[]) => {
    // Try to find a Brazilian Portuguese voice
    const ptBRVoice = voices.find(voice => voice.lang === 'pt-BR');
    
    // If found, set it
    if (ptBRVoice) {
      utterance.voice = ptBRVoice;
    } else {
      // Otherwise try a general Portuguese voice
      const ptVoice = voices.find(voice => voice.lang.startsWith('pt'));
      if (ptVoice) {
        utterance.voice = ptVoice;
      } else {
        // Fallback to default voice if no Portuguese voice is available
        console.log("No Portuguese voice found, using default voice");
      }
    }
    
    // Set language to Brazilian Portuguese
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
  };
  
  const startSpeaking = (utterance: SpeechSynthesisUtterance) => {
    if (synth.current) {
      // Speech completion event
      utterance.onend = () => {
        if (onComplete) {
          onComplete();
        }
      };
      
      // Start speaking
      synth.current.speak(utterance);
    }
  };
  
  return null; // This component doesn't render anything visually
};

export default AudioFeedback;
