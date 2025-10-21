import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const BookingCard = ({ equipment, onBooking }) => {
  const [selectedDuration, setSelectedDuration] = useState('daily');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  const durations = [
    { id: 'hourly', label: 'Hourly', price: equipment?.pricing?.hourly, unit: '/hour' },
    { id: 'daily', label: 'Daily', price: equipment?.pricing?.daily, unit: '/day' },
    { id: 'weekly', label: 'Weekly', price: equipment?.pricing?.weekly, unit: '/week' },
    { id: 'monthly', label: 'Monthly', price: equipment?.pricing?.monthly, unit: '/month' }
  ];

  const selectedPrice = durations?.find(d => d?.id === selectedDuration);
  const deliveryFee = equipment?.pricing?.deliveryFee;
  const securityDeposit = equipment?.pricing?.securityDeposit;
  const totalAmount = selectedPrice?.price + deliveryFee;

  const handleBooking = async () => {
    setIsBooking(true);
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      onBooking({
        duration: selectedDuration,
        startDate,
        endDate,
        totalAmount
      });
    }, 2000);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
      <div className="space-y-6">
        {/* Availability Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full availability-pulse"></div>
            <span className="text-sm font-medium text-success">Available Now</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Last updated: 2 hours ago
          </div>
        </div>

        {/* Pricing Options */}
        <div>
          <h3 className="font-semibold mb-3">Select Duration</h3>
          <div className="grid grid-cols-2 gap-2">
            {durations?.map((duration) => (
              <button
                key={duration?.id}
                onClick={() => setSelectedDuration(duration?.id)}
                className={`p-3 rounded-lg border text-left organic-transition ${
                  selectedDuration === duration?.id
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-sm font-medium">{duration?.label}</div>
                <div className="text-lg font-bold">₹{duration?.price?.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">{duration?.unit}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <div className="space-y-4">
          <Input
            type="date"
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e?.target?.value)}
            min={new Date()?.toISOString()?.split('T')?.[0]}
          />
          <Input
            type="date"
            label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e?.target?.value)}
            min={startDate || new Date()?.toISOString()?.split('T')?.[0]}
          />
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex justify-between text-sm">
            <span>Equipment Cost</span>
            <span>₹{selectedPrice?.price?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Security Deposit</span>
            <span className="text-muted-foreground">₹{securityDeposit?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
            <span>Total Amount</span>
            <span className="text-primary">₹{totalAmount?.toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            *Security deposit will be refunded after equipment return
          </p>
        </div>

        {/* Booking Actions */}
        <div className="space-y-3">
          <Button
            variant="default"
            fullWidth
            loading={isBooking}
            onClick={handleBooking}
            disabled={!startDate || !endDate}
            className="bg-conversion-cta hover:bg-conversion-cta/90"
          >
            {isBooking ? 'Processing...' : 'Book Now'}
          </Button>
          
          <Button variant="outline" fullWidth>
            <Icon name="MessageCircle" size={18} className="mr-2" />
            Contact Owner
          </Button>
        </div>

        {/* Trust Signals */}
        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} className="text-success" />
            <span>Verified Equipment</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Truck" size={16} className="text-success" />
            <span>Free Delivery within 10km</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="RotateCcw" size={16} className="text-success" />
            <span>24-hour cancellation policy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;