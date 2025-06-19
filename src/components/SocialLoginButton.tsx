import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Chrome, Loader2 } from 'lucide-react'; // Using Chrome as a stand-in for Google icon

type SocialProvider = 'google' | 'github'; // Can be expanded with more providers

interface SocialLoginButtonProps {
  /** The social media provider for the button. */
  provider: SocialProvider;
  /** Function to call when the button is clicked. Receives the provider type. */
  onClick: (provider: SocialProvider) => void;
  /** Optional loading state for the button. */
  isLoading?: boolean;
  /** Optional additional CSS classes. */
  className?: string;
  /** Optional flag to make the button take full width of its container. Defaults to true. */
  fullWidth?: boolean;
  /** Optional custom text to display on the button, overriding the default. */
  customText?: string;
}

const providerDetails: Record<SocialProvider, { icon: React.ElementType; defaultLabel: string }> = {
  google: {
    icon: Chrome, // Using Chrome icon as a generic representation for Google
    defaultLabel: 'Sign in with Google',
  },
  github: {
    icon: Github,
    defaultLabel: 'Sign in with GitHub',
  },
  // Future providers can be added here, e.g.:
  // facebook: {
  //   icon: FacebookIcon, // Assuming a FacebookIcon from lucide-react or custom
  //   defaultLabel: 'Sign in with Facebook',
  // },
};

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onClick,
  isLoading = false,
  className = '',
  fullWidth = true,
  customText,
}) => {
  console.log(`SocialLoginButton loaded for provider: ${provider}, isLoading: ${isLoading}`);

  const details = providerDetails[provider];
  if (!details) {
    console.error(`SocialLoginButton: Provider "${provider}" is not configured.`);
    // Render a fallback or null if the provider is not supported
    return null; 
  }

  const { icon: Icon, defaultLabel } = details;
  const buttonText = customText || defaultLabel;

  return (
    <Button
      variant="outline"
      type="button" // Ensures it doesn't submit a form by default
      className={`flex items-center justify-center gap-3 py-2.5 ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={() => !isLoading && onClick(provider)}
      disabled={isLoading}
      aria-label={buttonText}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Icon className="h-5 w-5" aria-hidden="true" />
      )}
      <span className="text-sm font-medium">{buttonText}</span>
    </Button>
  );
};

export default SocialLoginButton;