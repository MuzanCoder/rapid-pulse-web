import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated");
      const user = localStorage.getItem("user");
      
      // Simple check - in production, you'd validate JWT token
      const isAuth = authStatus === "true" && !!user;
      
      setIsAuthenticated(isAuth);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <Card className="w-full max-w-md">
          <CardContent className="p-12 text-center">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse"></div>
              <div className="h-3 bg-muted rounded w-3/4 mx-auto animate-pulse"></div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Verifying authentication...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render protected content
  return <>{children}</>;
};

export default ProtectedRoute;