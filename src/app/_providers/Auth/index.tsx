'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type ResetPassword = (args: {
  password: string;
  passwordConfirm: string;
  token: string;
}) => Promise<void>;

type ForgotPassword = (args: { email: string }) => Promise<void>;

type Create = (args: { name: string; email: string; password: string; passwordConfirm: string }) => Promise<void>;

type Login = (args: { email: string; password: string }) => Promise<void>;

type Logout = () => Promise<void>;

interface AuthContext {
  token?: string | null;
  setToken: (token: string | null) => void;
  logout: Logout;
  login: Login;
  create: Create;
  resetPassword: ResetPassword;
  forgotPassword: ForgotPassword;
  status: undefined | 'loggedOut' | 'loggedIn';
}

const Context = createContext<AuthContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<undefined | 'loggedOut' | 'loggedIn'>(undefined);

  const create = useCallback<Create>(async (args) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error.message || 'Failed to create account');
      }

      const json = await res.json();
      setToken(json.token);
      setStatus('loggedIn');
    } catch (e) {
      throw new Error(e.message || 'An error occurred while creating the account.');
    }
  }, []);

  const login = useCallback<Login>(async (args) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error.message || 'Invalid login');
      }

      const json = await res.json();
      setToken(json.token);
      setStatus('loggedIn');
    } catch (e) {
      throw new Error(e.message || 'An error occurred while logging in.');
    }
  }, []);

  const logout = useCallback<Logout>(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/logout`, {
        method: 'GET', // Typically, logout can be a GET request
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to logout');
      }

      setToken(null);
      setStatus('loggedOut');
    } catch (e) {
      throw new Error(e.message || 'An error occurred while logging out.');
    }
  }, []);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/me`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch user');
        }

        const json = await res.json();
        console.log(json);
        setToken(json.token || null);
        setStatus(json ? 'loggedIn' : 'loggedOut');
      } catch (e) {
        setToken(null);
        setStatus('loggedOut');
      }
    };

    fetchMe();
  }, []);

  const forgotPassword = useCallback<ForgotPassword>(async (args) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/forgot-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error.message || 'Failed to request password reset');
      }
    } catch (e) {
      throw new Error(e.message || 'An error occurred while requesting password reset.');
    }
  }, []);

  const resetPassword = useCallback<ResetPassword>(async (args) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/reset-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error.message || 'Failed to reset password');
      }

      const json = await res.json();
      setToken(json.token);
      setStatus(json ? 'loggedIn' : undefined);
    } catch (e) {
      throw new Error(e.message || 'An error occurred while resetting the password.');
    }
  }, []);

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        login,
        logout,
        create,
        resetPassword,
        forgotPassword,
        status,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
