import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import MinimalAuthHeader from '@/components/layout/MinimalAuthHeader';
import AuthFormContainer from '@/components/AuthFormContainer';
import MinimalAuthFooter from '@/components/layout/MinimalAuthFooter';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner'; // Using sonner for toasts as per user journey context

const ResetPasswordPage = () => {
  console.log('ResetPasswordPage loaded');

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Effect to extract token or other relevant info from URL, if needed
  // For this example, we'll assume the page is directly accessible or token is handled externally
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // Here you might validate the token with a backend.
      // For now, we'll just log it.
      console.log('Password reset token found:', token);
    }
    // If no token is expected or handled differently, this effect can be simplified or removed.
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!newPassword || !confirmPassword) {
      setError('Please fill in both password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Simulate success
      console.log('Password reset successful for a user (simulated).');
      toast.success('Password has been reset successfully!', {
        description: 'You can now log in with your new password.',
      });
      setSuccessMessage('Your password has been updated successfully. Redirecting to login...');
      // Redirect to LoginPage (path '/') after a short delay
      setTimeout(() => {
        navigate('/'); // Navigate to LoginPage as per App.tsx
      }, 2000);
    }, 2000);
  };

  const logoElement = (
    <Link to="/" className="inline-flex items-center justify-center">
      <ShieldCheck className="h-10 w-10 text-blue-600 dark:text-blue-500" />
    </Link>
  );

  const alternativeActions = (
    <div className="text-center text-sm">
      Remembered your password?{' '}
      <Link to="/" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
        Log In
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <MinimalAuthHeader />
      <main className="flex-grow flex items-center justify-center p-4">
        <AuthFormContainer
          title="Set New Password"
          logoElement={logoElement}
          alternativeActions={alternativeActions}
          className="my-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {successMessage && !error && (
               <Alert variant="default" className="bg-green-50 border-green-300 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-300">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
                required
                className="dark:bg-gray-800 dark:text-gray-50 dark:border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
                className="dark:bg-gray-800 dark:text-gray-50 dark:border-gray-700"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Set New Password
            </Button>
          </form>
        </AuthFormContainer>
      </main>
      <MinimalAuthFooter />
    </div>
  );
};

export default ResetPasswordPage;