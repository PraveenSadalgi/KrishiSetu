import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onCreatePost }) => {
  const quickActions = [
    {
      id: 1,
      icon: "HelpCircle",
      label: "Ask Question",
      description: "Get help from community",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: 2,
      icon: "Camera",
      label: "Share Photo",
      description: "Show your farm progress",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      id: 3,
      icon: "Lightbulb",
      label: "Share Tip",
      description: "Help fellow farmers",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      id: 4,
      icon: "Star",
      label: "Review Equipment",
      description: "Rate your experience",
      color: "text-harvest-orange",
      bgColor: "bg-harvest-orange/10"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-organic p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Zap" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
      </div>
      <div className="space-y-3">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={onCreatePost}
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted organic-transition text-left group"
          >
            <div className={`w-10 h-10 rounded-lg ${action?.bgColor} flex items-center justify-center ${action?.color} group-hover:scale-110 organic-transition`}>
              <Icon name={action?.icon} size={18} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground group-hover:text-primary organic-transition">
                {action?.label}
              </p>
              <p className="text-sm text-muted-foreground">{action?.description}</p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-foreground" />
          </button>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          onClick={onCreatePost}
          iconName="Plus"
          iconPosition="left"
        >
          Create New Post
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;