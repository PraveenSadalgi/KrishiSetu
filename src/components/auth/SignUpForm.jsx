import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

const SignUpForm = ({ onSwitchToLogin, onClose }) => {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'farmer',
    phone: '',
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData?.fullName?.trim()) {
      return 'Full name is required';
    }
    if (!formData?.email?.trim()) {
      return 'Email is required';
    }
    if (formData?.password?.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (formData?.password !== formData?.confirmPassword) {
      return 'Passwords do not match';
    }
    if (!formData?.agreeToTerms) {
      return 'You must agree to the terms and conditions';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await signUp(
        formData?.email,
        formData?.password,
        {
          fullName: formData?.fullName,
          role: formData?.role,
          phone: formData?.phone
        }
      );
      
      if (error) {
        setError(error?.message);
        return;
      }

      if (data?.user) {
        setSuccess('Account created successfully! Please check your email for verification.');
        setTimeout(() => {
          onClose?.();
        }, 2000);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'farmer', label: 'Farmer - I grow crops and need equipment' },
    { value: 'owner', label: 'Equipment Owner - I rent out equipment' },
    { value: 'both', label: 'Both - I farm and rent equipment' }
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Join FarmSetu</h2>
        <p className="text-muted-foreground">Create your account to get started</p>
      </div>
      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center gap-2 text-destructive">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center gap-2 text-success">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">{success}</span>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
            Full Name *
          </label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData?.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData?.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData?.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
            I am a *
          </label>
          <Select
            id="role"
            name="role"
            value={formData?.role}
            onChange={handleInputChange}
            options={roleOptions}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
            Password *
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData?.password}
            onChange={handleInputChange}
            placeholder="Choose a strong password"
            required
            disabled={loading}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Password must be at least 6 characters long
          </p>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
            Confirm Password *
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
            required
            disabled={loading}
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            id="agreeToTerms"
            name="agreeToTerms"
            type="checkbox"
            checked={formData?.agreeToTerms}
            onChange={handleInputChange}
            className="mt-1 rounded border-border text-primary focus:ring-primary"
            disabled={loading}
          />
          <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground">
            I agree to the{' '}
            <button type="button" className="text-primary hover:text-primary/80 organic-transition">
              Terms of Service
            </button>{' '}
            and{' '}
            <button type="button" className="text-primary hover:text-primary/80 organic-transition">
              Privacy Policy
            </button>
          </label>
        </div>

        <Button
          type="submit"
          fullWidth
          loading={loading}
          disabled={!formData?.agreeToTerms}
          className="bg-conversion-cta hover:bg-conversion-cta/90"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-medium text-primary hover:text-primary/80 organic-transition"
          >
            Sign In
          </button>
        </p>
      </div>
      {/* Social Login */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button variant="outline" fullWidth disabled>
            <Icon name="Chrome" size={16} />
            Google
          </Button>
          <Button variant="outline" fullWidth disabled>
            <Icon name="Phone" size={16} />
            Phone
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;