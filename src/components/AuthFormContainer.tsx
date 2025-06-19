import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthFormContainerProps {
  title: string;
  children: React.ReactNode;
  logoElement?: React.ReactNode;
  alternativeActions?: React.ReactNode;
  className?: string;
}

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  title,
  children,
  logoElement,
  alternativeActions,
  className,
}) => {
  console.log('AuthFormContainer loaded');

  return (
    <Card className={cn(
      "w-full max-w-md mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-lg p-6 sm:p-8",
      className
    )}>
      {logoElement && (
        <div className="flex justify-center mb-6">
          {logoElement}
        </div>
      )}
      
      <CardHeader className="p-0 mb-6 text-center">
        <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 space-y-4">
        {children}
      </CardContent>

      {alternativeActions && (
        <CardFooter className="p-0 mt-8 flex flex-col items-center text-sm text-gray-600 dark:text-gray-400 space-y-3">
          {alternativeActions}
        </CardFooter>
      )}
    </Card>
  );
};

export default AuthFormContainer;