import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/homepage" className="inline-flex items-center space-x-3 organic-transition hover:opacity-80">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-organic">
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 text-primary-foreground"
                fill="currentColor"
              >
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                <path d="M12 16L13.09 22.26L22 23L13.09 23.74L12 30L10.91 23.74L2 23L10.91 22.26L12 16Z" opacity="0.6" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary font-accent">FarmSetu</span>
              <span className="text-sm text-muted-foreground -mt-1">Smart Agriculture</span>
            </div>
          </Link>
        </div>

        {/* Login Form */}
        <div className="bg-background rounded-2xl shadow-organic-lg border border-border p-8">
          <LoginForm
            onSwitchToSignUp={() => window.location.href = '/auth/signup'}
            onClose={() => window.location.href = '/homepage'}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              to="/auth/signup"
              className="font-medium text-primary hover:text-primary/80 organic-transition"
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
