"use client";

import { useEffect, useState } from "react";
import { imageData } from "@/constants/imageData";

export default function ImageSlider() {
  const [imageStep, setImageStep] = useState(0);

  const handleNext = () => {
    if (imageStep === imageData.length - 1) {
      setImageStep(0);
    } else {
      setImageStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (imageStep === 0) {
      setImageStep(imageData.length - 1);
    } else {
      setImageStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      handleNext();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [imageStep]);

  console.log(imageStep);

  return (
    <>
      <h1>Image Slider</h1>
      <div>{imageStep}</div>
      <br />

      <div style={{ textAlign: "center" }}>
        <img
          src={imageData[imageStep]?.url}
          alt={imageData[imageStep]?.alt}
          style={{ width: "800px", height: "600px" }}
        />
      </div>

      <br />

      <section
        style={{ display: "flex", gap: "20px", justifyContent: "center" }}
      >
        <button onClick={handleBack}>Back</button>
        <button onClick={handleNext}>Next</button>
      </section>
    </>
  );
}
