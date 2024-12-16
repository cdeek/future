"use client";
import { useState, useEffect } from "react";

interface Quote {
  content: string;
  author: string;
}

export default function QuoteMachine() {
  const [random, setRandom] = useState<number>(0);
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Color options
  const colors: string[] = [
    "red",
    "blue",
    "green",
    "black",
    "orange",
    "purple",
    "navy",
    "lightblue",
    "brown",
    "gray",
  ];

  // Fetch a new quote when the component is mounted
  useEffect(() => {
    getQuote();
    setInterval(getQuote, 30000);
  }, []);

  // Fetch quote from API
  const getQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data: Quote = await response.json();
      setQuote(data.content);
      setAuthor(`Author: ${data.author}`);
      setRandom(Math.floor(Math.random() * colors.length));
    } catch (err) {
      setError("Error fetching quote");
      console.error(err);
    }
  };

  return (
    <div
      style={{ backgroundColor: colors[random] || "black" }}
      className="quote w-[75%] p-4 text-white rounded-md mx-auto"
    >
      {!error ? (
        <>
          <div className="text-center">
            <span>{quote}</span>
          </div>
          <br />
          <h6>{author}</h6>
        </>
      ) : (
        <h5>{error}</h5>
      )}
    </div>
  );
}