import { useState } from 'react';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock authentication - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'test@example.com' && password === 'password') {
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: any) {
      setError(error.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Implementation for logout
  };

  return {
    login,
    logout,
    isLoading,
    error,
  };
}; 