import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LogOut, UserCircle, Home, Settings, BarChart2 } from 'lucide-react'; // Added more icons

const DashboardPage = () => {
  console.log('DashboardPage loaded');

  // Placeholder user data
  const userName = "Demo User";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <BarChart2 className="h-7 w-7" /> {/* Generic App Icon */}
          <h1 className="text-xl font-semibold">My Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <UserCircle className="h-7 w-7" />
          <span className="hidden sm:inline">{userName}</span>
          <Link to="/login"> {/* Changed: Logout redirects to LoginPage at /login */}
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">
              <LogOut className="mr-0 sm:mr-2 h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden"> {/* Added overflow-hidden for better flex child handling */}
        {/* Sidebar */}
        <aside className="w-60 bg-card text-card-foreground p-4 space-y-2 border-r border-border hidden md:flex md:flex-col"> {/* Hidden on small screens, flex on md+ */}
          <h2 className="text-lg font-semibold px-2 py-1">Navigation</h2>
          <NavigationMenu orientation="vertical" className="w-full">
            <NavigationMenuList className="flex flex-col space-y-1 w-full">
              <NavigationMenuItem className="w-full">
                <Link to="/dashboard" className="w-full">
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start text-sm`}>
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link to="/settings" className="w-full"> {/* Illustrative link, assumes /settings might exist or be added */}
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start text-sm`}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {/* Add more navigation items here as needed */}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="mt-auto p-2 text-xs text-muted-foreground">
            App Version 1.0.0
          </div>
        </aside>

        {/* Main Content Area */}
        <ScrollArea className="flex-1 p-4 sm:p-6 bg-muted/30"> {/* Use ScrollArea for content */}
          <main className="space-y-6">
            <Card className="shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome back, {userName}!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">This is your main dashboard area. Application-specific content will be displayed here.</p>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFzaGJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" 
                  alt="Abstract Dashboard Graphic" 
                  className="mt-4 rounded-lg shadow-md w-full max-h-[400px] object-cover" 
                />
              </CardContent>
            </Card>
            
            <Card className="shadow">
                <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                    <p className="text-sm text-muted-foreground pt-1">An overview of key metrics.</p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-4 bg-card-foreground/5 dark:bg-card-foreground/10 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-base font-medium text-muted-foreground">Active Projects</h3>
                            <p className="text-3xl font-bold mt-1 text-primary">12</p>
                        </div>
                        <div className="p-4 bg-card-foreground/5 dark:bg-card-foreground/10 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-base font-medium text-muted-foreground">Tasks Completed</h3>
                            <p className="text-3xl font-bold mt-1 text-green-600">186</p>
                        </div>
                        <div className="p-4 bg-card-foreground/5 dark:bg-card-foreground/10 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-base font-medium text-muted-foreground">Pending Issues</h3>
                            <p className="text-3xl font-bold mt-1 text-destructive">7</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        <li className="text-sm text-muted-foreground flex items-center">
                            <span className="bg-green-500 w-2 h-2 rounded-full mr-2"></span> User 'john.doe' logged in. (10 min ago)
                        </li>
                        <li className="text-sm text-muted-foreground flex items-center">
                            <span className="bg-blue-500 w-2 h-2 rounded-full mr-2"></span> New project 'Alpha' created. (1 hour ago)
                        </li>
                        <li className="text-sm text-muted-foreground flex items-center">
                            <span className="bg-yellow-500 w-2 h-2 rounded-full mr-2"></span> Task #123 updated. (3 hours ago)
                        </li>
                    </ul>
                </CardContent>
            </Card>

          </main>
        </ScrollArea>
      </div>

      {/* Footer for mobile navigation or simple footer - example only */}
      <footer className="md:hidden bg-card text-card-foreground border-t border-border p-2 flex justify-around items-center sticky bottom-0 z-50">
          <Link to="/dashboard" className="flex flex-col items-center text-xs text-primary">
              <Home className="h-5 w-5" /> Dashboard
          </Link>
          <Link to="/settings" className="flex flex-col items-center text-xs text-muted-foreground hover:text-primary">
              <Settings className="h-5 w-5" /> Settings
          </Link>
          <Link to="/login" className="flex flex-col items-center text-xs text-muted-foreground hover:text-primary"> {/* Changed: Logout redirects to /login */}
              <LogOut className="h-5 w-5" /> Logout
          </Link>
      </footer>
      {/* Standard Footer for larger screens, if desired (or combine with above) */}
       <footer className="hidden md:block bg-muted/30 border-t border-border p-3 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} AuthApp. All rights reserved. | <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link> | <Link to="/terms" className="hover:text-primary">Terms of Service</Link></p>
      </footer>
    </div>
  );
};

export default DashboardPage;