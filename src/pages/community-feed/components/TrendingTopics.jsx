import React from 'react';
import Icon from '../../../components/AppIcon';

const TrendingTopics = () => {
  const trendingTopics = [
    {
      id: 1,
      tag: "WinterWheat",
      posts: 234,
      growth: "+12%",
      description: "Farmers sharing winter wheat cultivation tips and harvest updates"
    },
    {
      id: 2,
      tag: "DroneSpray",
      posts: 189,
      growth: "+28%",
      description: "Discussion about drone-based pesticide spraying techniques"
    },
    {
      id: 3,
      tag: "OrganicFarming",
      posts: 156,
      growth: "+8%",
      description: "Organic farming methods and certification processes"
    },
    {
      id: 4,
      tag: "SoilHealth",
      posts: 143,
      growth: "+15%",
      description: "Soil testing results and improvement strategies"
    },
    {
      id: 5,
      tag: "IrrigationTech",
      posts: 127,
      growth: "+22%",
      description: "Modern irrigation systems and water conservation"
    },
    {
      id: 6,
      tag: "CropInsurance",
      posts: 98,
      growth: "+5%",
      description: "Insurance claims and policy discussions"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-organic p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="TrendingUp" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Trending Topics</h3>
      </div>
      <div className="space-y-3">
        {trendingTopics?.map((topic, index) => (
          <div
            key={topic?.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted organic-transition cursor-pointer group"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                <span className="font-semibold text-primary group-hover:text-primary/80">
                  #{topic?.tag}
                </span>
                <span className="text-xs text-success bg-success/10 px-2 py-1 rounded-full">
                  {topic?.growth}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{topic?.description}</p>
              <p className="text-xs text-muted-foreground">{topic?.posts} posts</p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-foreground" />
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-center text-sm text-primary hover:text-primary/80 organic-transition">
          View all trending topics
        </button>
      </div>
    </div>
  );
};

export default TrendingTopics;