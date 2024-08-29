"use client";

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function SlideShow() {
  const [index, setIndex] = useState(0);

  const slideImages = [
    { name: "back to school", path: '/static-image.jpg', url: "url" },
  ];

  useEffect(() => {
    const loop = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % slideImages.length);
    }, 3000);

    return () => clearInterval(loop);
  }, []);

  return (
    <div className="w-full m-0">
      <Image
        className="w-full h-[230px] md:h-[450px]"
        src={slideImages[index].path}
        alt={slideImages[index].name}
        layout="responsive"
        width={500}
        height={300}
      />
    </div>
  );
}
