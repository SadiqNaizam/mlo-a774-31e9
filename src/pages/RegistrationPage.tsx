import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MinimalAuthHeader from '@/components/layout/MinimalAuthHeader';
import AuthFormContainer from '@/components/AuthFormContainer';
import MinimalAuthFooter from '@/components/layout/MinimalAuthFooter';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Loader2 } from 'lucide-react';

const RegistrationPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log('RegistrationPage loaded');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success/failure
    const isSuccess = Math.random() > 0.2; // 80% success rate for demo

    if (isSuccess) {
      setSuccessMessage("Registration successful! Redirecting to login...");
      // In a real app, you might automatically log the user in or store a token
      setTimeout(() => {
        navigate('/'); // Navigate to LoginPage, path from App.tsx
      }, 2000);
    } else {
      setError("Registration failed. Please try again later or use a different email.");
    }

    setIsLoading(false);
  };

  const alternativeActions = (
    <p className="text-center text-sm">
      Already have an account?{' '}
      <Link to="/" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
        Log in
      </Link>
    </p>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <MinimalAuthHeader />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthFormContainer title="Create an Account" alternativeActions={alternativeActions}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Registration Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {successMessage && (
              <Alert variant="default" className="bg-green-100 border-green-300 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-300">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full"
                placeholder="you@example.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </div>
          </form>
        </AuthFormContainer>
      </main>
      <MinimalAuthFooter />
    </div>
  );
};

export default RegistrationPage;