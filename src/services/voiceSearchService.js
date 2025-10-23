import { GoogleGenerativeAI } from '@google/generative-ai';

class VoiceSearchService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    this.recognition = null;
    this.isListening = false;
  }

  async performVoiceSearch() {
    return new Promise((resolve, reject) => {
      try {
        // Check if speech recognition is supported
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
          throw new Error('Speech recognition not supported in this browser');
        }

        // Initialize speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();

        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';

        this.recognition.onstart = () => {
          this.isListening = true;
          console.log('Voice search started...');
        };

        this.recognition.onresult = async (event) => {
          const transcript = event.results[0][0].transcript;
          console.log('Voice transcript:', transcript);

          try {
            // Process the transcript with Gemini AI
            const filters = await this.processVoiceQuery(transcript);
            resolve({ transcript, filters });
          } catch (error) {
            reject(new Error('Failed to process voice query: ' + error.message));
          }
        };

        this.recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          reject(new Error('Speech recognition failed: ' + event.error));
        };

        this.recognition.onend = () => {
          this.isListening = false;
          console.log('Voice search ended');
        };

        // Start listening
        this.recognition.start();

      } catch (error) {
        reject(error);
      }
    });
  }

  async processVoiceQuery(transcript) {
    try {
      const prompt = `
        Analyze this voice search query for agricultural equipment rental and extract relevant filters.
        Query: "${transcript}"

        Extract the following information in JSON format:
        - equipment_type: The type of equipment (tractor, harvester, plow, etc.)
        - location: The location mentioned (city, state, or region)
        - duration: Number of days mentioned (if any)
        - budget: Maximum price per day mentioned (if any)
        - features: Any specific features mentioned (GPS, air conditioning, etc.)

        Return only valid JSON with these fields. Use null for missing information.
        Example: {"equipment_type": "tractor", "location": "Bangalore", "duration": 2, "budget": null, "features": ["GPS"]}
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Clean the response to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid AI response format');
      }

      const filters = JSON.parse(jsonMatch[0]);

      // Convert to marketplace filter format
      const marketplaceFilters = {};

      if (filters.equipment_type) {
        marketplaceFilters.category = filters.equipment_type;
      }

      if (filters.location) {
        marketplaceFilters.location = filters.location;
      }

      if (filters.duration) {
        marketplaceFilters.duration = filters.duration;
      }

      if (filters.budget) {
        marketplaceFilters.maxPrice = filters.budget;
      }

      if (filters.features && filters.features.length > 0) {
        marketplaceFilters.features = filters.features;
      }

      return marketplaceFilters;

    } catch (error) {
      console.error('AI processing error:', error);
      // Fallback: try to extract basic keywords
      return this.extractBasicFilters(transcript);
    }
  }

  extractBasicFilters(transcript) {
    const filters = {};
    const lowerTranscript = transcript.toLowerCase();

    // Simple keyword extraction as fallback
    if (lowerTranscript.includes('tractor')) {
      filters.category = 'tractor';
    } else if (lowerTranscript.includes('harvester')) {
      filters.category = 'harvester';
    } else if (lowerTranscript.includes('plow') || lowerTranscript.includes('plough')) {
      filters.category = 'plow';
    }

    // Extract location (simple city names)
    const cities = ['bangalore', 'mumbai', 'delhi', 'chennai', 'pune', 'hyderabad'];
    for (const city of cities) {
      if (lowerTranscript.includes(city)) {
        filters.location = city.charAt(0).toUpperCase() + city.slice(1);
        break;
      }
    }

    // Extract duration
    const durationMatch = transcript.match(/(\d+)\s*(?:day|days)/i);
    if (durationMatch) {
      filters.duration = parseInt(durationMatch[1]);
    }

    return filters;
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }
}

export default new VoiceSearchService();
