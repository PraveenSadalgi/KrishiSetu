import React from 'react';
import Icon from '../../../components/AppIcon';

const EquipmentSpecs = ({ specifications, features, maintenance }) => {
  return (
    <div className="space-y-6">
      {/* Technical Specifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Icon name="Settings" size={20} className="mr-2 text-primary" />
          Technical Specifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specifications?.map((spec, index) => (
            <div key={index} className="flex justify-between py-2 border-b border-border last:border-b-0">
              <span className="text-muted-foreground">{spec?.label}</span>
              <span className="font-medium">{spec?.value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Key Features */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Icon name="Star" size={20} className="mr-2 text-primary" />
          Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Maintenance Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Icon name="Wrench" size={20} className="mr-2 text-primary" />
          Maintenance & Care
        </h3>
        <div className="space-y-4">
          {maintenance?.map((item, index) => (
            <div key={index} className="border-l-4 border-primary/20 pl-4">
              <h4 className="font-medium text-sm mb-1">{item?.title}</h4>
              <p className="text-sm text-muted-foreground">{item?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EquipmentSpecs;