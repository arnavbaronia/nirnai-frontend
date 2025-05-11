import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      // Verify token and fetch user
      // This is a simplified version - in production, you'd verify the token properly
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userData);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });
      
      Cookies.set('token', response.data.access_token);
      const userResponse = await axios.get('http://localhost:3000/auth/profile', {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
        },
      });
      
      setUser(userResponse.data);
      localStorage.setItem('user', JSON.stringify(userResponse.data));
      router.push('/dashboard');
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (username: string, password: string) => {
    try {
      await axios.post('http://localhost:3000/auth/register', {
        username,
        password,
      });
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  const value = { user, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}