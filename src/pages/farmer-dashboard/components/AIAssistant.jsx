import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AIAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [query, setQuery] = useState('');

  const suggestions = [
    {
      id: 1,
      title: "Optimize Pricing",
      description: "Get AI recommendations for your equipment pricing",
      icon: "TrendingUp",
      action: "pricing"
    },
    {
      id: 2,
      title: "Create Listing",
      description: "AI-assisted equipment listing with smart descriptions",
      icon: "Plus",
      action: "listing"
    },
    {
      id: 3,
      title: "Market Insights",
      description: "Analyze demand patterns in your area",
      icon: "BarChart3",
      action: "insights"
    },
    {
      id: 4,
      title: "Maintenance Alert",
      description: "Schedule equipment maintenance reminders",
      icon: "Settings",
      action: "maintenance"
    }
  ];

  const recentQueries = [
    "What\'s the best price for my tractor rental?",
    "When is peak season for harvester demand?",
    "How to improve my equipment rating?"
  ];

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Voice recognition logic would go here
  };

  const handleSuggestionClick = (action) => {
    // Handle different AI assistant actions
    console.log(`AI Assistant action: ${action}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-organic">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Bot" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">AI Assistant</h2>
            <p className="text-sm text-muted-foreground">Your smart farming companion</p>
          </div>
        </div>

        {/* Voice Input Section */}
        <div className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Ask me anything about your farming equipment..."
              value={query}
              onChange={(e) => setQuery(e?.target?.value)}
              className="pr-12"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoiceToggle}
              className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                isListening ? 'text-error animate-pulse' : 'text-muted-foreground'
              }`}
            >
              <Icon name={isListening ? "MicOff" : "Mic"} size={18} />
            </Button>
          </div>

          {isListening && (
            <div className="flex items-center justify-center space-x-2 py-4 bg-primary/5 rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <span className="text-sm text-primary font-medium ml-2">Listening...</span>
            </div>
          )}
        </div>
      </div>
      {/* AI Suggestions */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {suggestions?.map((suggestion) => (
            <button
              key={suggestion?.id}
              onClick={() => handleSuggestionClick(suggestion?.action)}
              className="p-4 bg-muted/50 hover:bg-muted rounded-lg text-left organic-transition group"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 organic-transition">
                  <Icon name={suggestion?.icon} size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground">{suggestion?.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{suggestion?.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Recent Queries */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Recent Queries</h4>
          <div className="space-y-2">
            {recentQueries?.map((query, index) => (
              <button
                key={index}
                className="w-full text-left p-3 bg-muted/30 hover:bg-muted/50 rounded-lg organic-transition"
              >
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{query}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;