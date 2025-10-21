import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GovernmentSchemes = ({ schemes }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      case 'Ending Soon': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDeadline = (deadline) => {
    const date = new Date(deadline);
    return date?.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Government Schemes</h3>
        <Button variant="ghost" size="sm">
          <Icon name="ExternalLink" size={16} className="mr-1" />
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {schemes?.map((scheme) => (
          <div key={scheme?.id} className="border border-border rounded-lg p-4 hover:shadow-organic organic-transition">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{scheme?.title}</h4>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{scheme?.description}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ml-3 ${getStatusColor(scheme?.status)}`}>
                {scheme?.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="IndianRupee" size={14} />
                  <span>₹{scheme?.maxAmount?.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>Until {formatDeadline(scheme?.deadline)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{scheme?.state}</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Apply Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovernmentSchemes;