import React from 'react';
import { Link } from 'react-router-dom';

const MinimalAuthFooter: React.FC = () => {
  console.log('MinimalAuthFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 px-4 sm:px-6 lg:px-8 bg-background border-t">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
        <div className="mb-2 sm:mb-0">
          <p>&copy; {currentYear} AuthApp. All rights reserved.</p>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link to="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default MinimalAuthFooter;