import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../services/grpcClient';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Here you would check for a stored token or session
        // For demo purposes, we'll just simulate a delay
        setTimeout(() => {
          // Mock user data
          // In a real app, you would decode the token or fetch user data
          setUser(null);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError('Authentication check failed');
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, you would call your gRPC service here
      // Example:
      // const response = await grpcClient.userService.authenticateUser({ email, password });
      // setUser(response.user);

      // Mock login for demo
      setTimeout(() => {
        const mockUser = {
          id: '1',
          email: email,
          firstName: 'John',
          lastName: 'Doe',
        };

        setUser(mockUser);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear user data
    setUser(null);

    // In a real app, you might also want to:
    // - Clear any stored tokens
    // - Notify the server about the logout
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
