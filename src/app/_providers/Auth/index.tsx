"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ResetPassword = (args: {
  password: string;
  passwordConfirm: string;
  token: string;
}) => Promise<void>;

type ForgotPassword = (args: { email: string }) => Promise<void>;

type Create = (args: {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}) => Promise<void>;

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
  status: undefined | "loggedOut" | "loggedIn";
}

const Context = createContext<AuthContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<undefined | "loggedOut" | "loggedIn">(
    undefined,
  );

  class ServerError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ServerError";
    }
  }

  const create = useCallback<Create>(async (args) => {
    try {
      const res = await fetch("api/user/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new ServerError(errorData.error || "Failed to create account");
      }

      const json = await res.json();
      setToken(json.token);
      setStatus("loggedIn");
    } catch (e) {
      if (1 == 1) {
       // e instanceof ServerError
        //  console.error('Server-side error:', e.message);
        throw e;
      } else {
        //   console.error('Unexpected error:', e);
        throw new Error("Unexpected error occurred.");
      }
    }
  }, []);

  const login = useCallback<Login>(async (args) => {
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new ServerError(errorData.error || "Internal Error.");
      }

      const json = await res.json();
      setToken(json.token);
      setStatus("loggedIn");
    } catch (e) {
      if (1 == 1) {
       
        throw e;
      } else {
        // console.error('Unexpected error:', e);
        throw new Error("Unexpected error occurred.");
      }
    }
  }, []);

  const logout = useCallback<Logout>(async () => {
    try {
      const res = await fetch("api/user/logout", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to logout");
      }

      setToken(null);
      setStatus("loggedOut");
    } catch (e) {
      throw Error(e.message || "An error occurred while logging out.");
    }
  }, []);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch("api/user/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const json = await res.json();
        console.log(json);
        setToken(json.token || null);
        setStatus(json ? "loggedIn" : "loggedOut");
      } catch (e) {
        setToken(null);
        setStatus("loggedOut");
      }
    };

    fetchMe();
  }, []);

  const forgotPassword = useCallback<ForgotPassword>(async (args) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/forgot-password`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(args),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.error.message || "Failed to request password reset",
        );
      }
    } catch (e) {
      throw Error(
        e.message || "An error occurred while requesting password reset.",
      );
    }
  }, []);

  const resetPassword = useCallback<ResetPassword>(async (args) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/reset-password`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(args),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error.message || "Failed to reset password");
      }

      const json = await res.json();
      setToken(json.token);
      setStatus(json ? "loggedIn" : undefined);
    } catch (e) {
      throw Error(
        e.message || "An error occurred while resetting the password.",
      );
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
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
