import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MinimalAuthHeader from '@/components/layout/MinimalAuthHeader';
import AuthFormContainer from '@/components/AuthFormContainer';
import SocialLoginButton from '@/components/SocialLoginButton';
import MinimalAuthFooter from '@/components/layout/MinimalAuthFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { Eye, EyeOff, AlertTriangle, Loader2, ShieldCheck } from 'lucide-react';

const LoginPage: React.FC = () => {
  console.log('LoginPage loaded');
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState<null | 'google' | 'github'>(null);

  useEffect(() => {
    // Auto-focus on email input
    const emailInput = document.getElementById('email');
    if (emailInput) {
      emailInput.focus();
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (email === 'user@example.com' && password === 'password123') {
      toast.success('Login Successful!', {
        description: 'Redirecting to your dashboard...',
      });
      // In a real app, you'd store a token, update auth context, etc.
      navigate('/dashboard'); // Path from App.tsx
    } else {
      setError('Invalid email or password. Please try again.');
      toast.error('Login Failed', {
        description: 'Invalid email or password.',
      });
    }
    setIsLoading(false);
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setIsSocialLoading(provider);
    setError(null);
    console.log(`Attempting login with ${provider}`);
    // Simulate API call for social login
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Simulate success for demo
    toast.success(`Successfully authenticated with ${provider}!`, {
      description: 'Redirecting to your dashboard...',
    });
    navigate('/dashboard'); // Path from App.tsx
    setIsSocialLoading(null);
  };

  const pageLogo = <ShieldCheck className="h-12 w-12 text-blue-600" />;

  const alternativeActions = (
    <>
      <div className="text-center">
        <Link
          to="/forgot-password" // Path from App.tsx, remains unchanged
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link
          to="/" // Changed: Path to RegistrationPage is now root '/'
          className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </>
  );


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 dark:from-slate-900 dark:to-sky-900">
      <MinimalAuthHeader />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormContainer title="Welcome Back!" logoElement={pageLogo} alternativeActions={alternativeActions}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700">
                <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400" />
                <AlertTitle className="text-red-700 dark:text-red-300">Login Error</AlertTitle>
                <AlertDescription className="text-red-600 dark:text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="remember-me"
                  name="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-blue-600"
                />
                <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Remember me
                </Label>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Log In
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <SocialLoginButton
                provider="google"
                onClick={handleSocialLogin}
                isLoading={isSocialLoading === 'google'}
                className="dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 hover:dark:bg-gray-700"
              />
              <SocialLoginButton
                provider="github"
                onClick={handleSocialLogin}
                isLoading={isSocialLoading === 'github'}
                className="dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 hover:dark:bg-gray-700"
              />
            </div>
          </div>
        </AuthFormContainer>
      </main>
      <MinimalAuthFooter />
    </div>
  );
};

export default LoginPage;