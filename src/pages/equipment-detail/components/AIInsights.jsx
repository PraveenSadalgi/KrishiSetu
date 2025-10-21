import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsights = ({ insights, weatherData, cropRecommendations }) => {
  const [activeTab, setActiveTab] = useState('usage');

  const tabs = [
    { id: 'usage', label: 'Usage Tips', icon: 'Lightbulb' },
    { id: 'weather', label: 'Weather Insights', icon: 'Cloud' },
    { id: 'crops', label: 'Crop Compatibility', icon: 'Wheat' }
  ];

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Brain" size={16} className="text-primary-foreground" />
        </div>
        <h3 className="text-lg font-semibold">AI-Powered Insights</h3>
        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
          Smart Recommendations
        </span>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4 bg-background/50 rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm organic-transition flex-1 justify-center ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'usage' && (
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Optimal Usage Recommendations</h4>
            {insights?.usageTips?.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-background/70 rounded-lg">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="CheckCircle" size={12} className="text-primary" />
                </div>
                <div>
                  <h5 className="font-medium text-sm mb-1">{tip?.title}</h5>
                  <p className="text-sm text-muted-foreground">{tip?.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'weather' && (
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Weather-Based Recommendations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-background/70 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Thermometer" size={16} className="text-secondary" />
                  <span className="font-medium text-sm">Current Conditions</span>
                </div>
                <p className="text-sm text-muted-foreground">{weatherData?.current}</p>
              </div>
              <div className="p-3 bg-background/70 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Calendar" size={16} className="text-secondary" />
                  <span className="font-medium text-sm">Best Usage Window</span>
                </div>
                <p className="text-sm text-muted-foreground">{weatherData?.recommendation}</p>
              </div>
            </div>
            <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                <div>
                  <h5 className="font-medium text-sm text-warning">Weather Alert</h5>
                  <p className="text-sm text-muted-foreground">{weatherData?.alert}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'crops' && (
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Crop Compatibility Analysis</h4>
            <div className="grid grid-cols-1 gap-3">
              {cropRecommendations?.map((crop, index) => (
                <div key={index} className="p-3 bg-background/70 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name="Wheat" size={16} className="text-success" />
                      <span className="font-medium text-sm">{crop?.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="flex">
                        {[...Array(5)]?.map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={12}
                            className={i < crop?.compatibility ? 'text-warning fill-current' : 'text-muted-foreground'}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-1">
                        {crop?.compatibility}/5
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{crop?.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                    <span>Season: {crop?.season}</span>
                    <span>Efficiency: {crop?.efficiency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* AI Assistant CTA */}
      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="outline" className="w-full">
          <Icon name="MessageSquare" size={16} className="mr-2" />
          Ask AI Assistant for More Details
        </Button>
      </div>
    </div>
  );
};

export default AIInsights;