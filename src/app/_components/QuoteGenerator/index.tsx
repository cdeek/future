"use client";
import { useState, useEffect } from 'react';

export default function QuoteMachine() {
  const [random, setRandom] = useState(null);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  useEffect( () => getQuote(),[]);

  const colors = [
      'red',
      'blue',
      'green',
      'black',
      'orange',
      'purple',
      'navy',
      'lightblue',
      'brown',
      'gray',
      'yellow'
     ]

  function getQuote() {
    fetch("https://api.quotable.io/random")
      .then((res) => {
        return res.json()
       })
      .then((data) => {
        setQuote(data.content);
        setAuthor(`Author: ${data.author}`);
       })
       .catch((err) => {
         setError("Having Error to Display")
       })
    setRandom(Math.floor(Math.random() * 11));
  }

  return(
      <div style={{backgroundColor: colors[random]}} className="quote w-[400px] text-white rounded-md">
       {!error &&
        <>
        <div className="text-center">
            <span>{quote}</span>
        </div><br />
        <h4>{author}</h4>
        </>
       }
       {error &&
        <h2>{error}</h2>
       }
      </div>
    )
}