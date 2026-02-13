import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Alert } from 'react-native';

/**
 * User interface matching Flutter app structure
 */
export interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * Auth Context interface
 */
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

/**
 * Create the Auth Context
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider Component
 * Manages authentication state for the entire app
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Login function - simulates API call with 900ms delay (matching Flutter)
   */
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call (matching Flutter's 900ms delay)
      await new Promise((resolve) => setTimeout(resolve, 900));

      // TODO: Replace with actual Firebase/API call
      // For now, create a mock user
      const mockUser: User = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email: email,
      };

      setUser(mockUser);
      console.log(`Login successful: ${email}`);
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Erreur de connexion', String(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register function - simulates user registration
   */
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 900));

      // TODO: Replace with actual Firebase/API call
      const mockUser: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
      };

      setUser(mockUser);
      console.log(`Registration successful: ${name} (${email})`);
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert("Erreur d'inscription", String(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout function
   */
  const logout = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual logout logic (clear tokens, call API, etc.)
      await new Promise((resolve) => setTimeout(resolve, 300));
      setUser(null);
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Reset password function - simulates sending password reset email
   */
  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 900));

      // TODO: Replace with actual password reset logic
      console.log(`Password reset email sent to: ${email}`);
      Alert.alert(
        'Email envoyé',
        `Un email de réinitialisation a été envoyé à ${email}`
      );
    } catch (error) {
      console.error('Reset password error:', error);
      Alert.alert('Erreur', 'Impossible d\'envoyer l\'email de réinitialisation');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to use the Auth Context
 * @throws Error if used outside of AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
