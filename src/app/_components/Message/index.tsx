import React from "react";

import { AlertCircle, TriangleAlert, CircleCheckBig } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const successStyle: string = "bg-[rgb(178, 255, 214)] text-[rgb(36, 51, 43)]";
const warningStyle: string = "bg-[rgb(253, 255, 164)] tex-[rgb(51, 51, 33)]";
const defaultStyle: string = "";

export const Message: React.FC<{
  message?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  warning?: React.ReactNode;
  className?: string;
}> = ({ message, error, success, warning, className }) => {
  const messageToRender = message || error || success || warning;

  if (messageToRender) {
    return (
      <Alert
        variant={error ? "destructive" : "default"}
        className={[
          className,
          success && successStyle,
          warning && warningStyle,
          !error && !success && !warning && defaultStyle,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {error && (
          <>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
          </>
        )}
        {success && (
          <>
            <CircleCheckBig className="h-4 w-4" />
            <AlertTitle>Successful</AlertTitle>
          </>
        )}
        {warning && (
          <>
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
          </>
        )}
        <AlertDescription>{messageToRender}</AlertDescription>
      </Alert>
    );
  }
  return null;
};
