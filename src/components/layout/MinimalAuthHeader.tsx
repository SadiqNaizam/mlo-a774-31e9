import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react'; // Using a generic security icon as a logo

const MinimalAuthHeader: React.FC = () => {
  console.log('MinimalAuthHeader loaded');

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-background border-b">
      <div className="container mx-auto flex items-center justify-center sm:justify-start">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
          <ShieldCheck className="h-7 w-7 text-blue-600" />
          <span>AuthApp</span>
        </Link>
        {/* No other navigation elements as per description */}
      </div>
    </header>
  );
};

export default MinimalAuthHeader;