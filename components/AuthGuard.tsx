import { RootState } from '@/redux/store';
import { useRouter } from 'expo-router';
import React from 'react';
import { useSelector } from 'react-redux';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.userReducer);

  React.useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      // Redirect to welcome if not authenticated
      router.replace('/welcome');
    } else if (!requireAuth && isAuthenticated) {
      // Redirect to main app if already authenticated
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, requireAuth, router]);

  // Show loading or content based on auth state
  if (requireAuth && !isAuthenticated) {
    return null; // Will redirect
  }

  if (!requireAuth && isAuthenticated) {
    return null; // Will redirect
  }

  return <>{children}</>;
};

export default AuthGuard; 