import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MinimalAuthHeader from '@/components/layout/MinimalAuthHeader';
import AuthFormContainer from '@/components/AuthFormContainer';
import MinimalAuthFooter from '@/components/layout/MinimalAuthFooter';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Mail, AlertCircle, CheckCircle2 } from 'lucide-react';

const ForgotPasswordPage: React.FC = () => {
  console.log('ForgotPasswordPage loaded');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Simulate API call
    console.log('Submitting forgot password request for email:', email);
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!email) {
      setMessage({ type: 'error', text: 'Please enter your email address.' });
      setIsLoading(false);
      return;
    }
    
    // Basic email validation (very simple)
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      setIsLoading(false);
      return;
    }

    // Simulate success
    setMessage({ type: 'success', text: 'If an account with this email exists, a password reset link has been sent.' });
    setEmail(''); // Clear the input field on success
    setIsLoading(false);

    // Optionally, redirect after a delay or keep user on page
    // setTimeout(() => navigate('/'), 3000); // Redirect to login page
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <MinimalAuthHeader />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormContainer
          title="Forgot Your Password?"
          logoElement={<Mail className="h-12 w-12 text-blue-600" />}
          alternativeActions={
            <p className="text-center text-sm">
              Remember your password?{' '}
              <Link to="/" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                Sign In
              </Link>
            </p>
          }
        >
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
            No worries! Enter your email address below and we'll send you a link to reset your password.
          </p>

          {message && (
            <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className={`${message.type === 'success' ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700' : ''} mb-4`}>
              {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{message.type === 'success' ? 'Email Sent' : 'Error'}</AlertTitle>
              <AlertDescription>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </Label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-950"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </div>
          </form>
        </AuthFormContainer>
      </main>
      <MinimalAuthFooter />
    </div>
  );
};

export default ForgotPasswordPage;