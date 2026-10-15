"use client";

import { imageData } from "@/constants/imageData";
import { useEffect, useState } from "react";

export default function ImageSlider() {
  const [imageStep, setImageStep] = useState(0);

  const handleNext = () => {
    setImageStep((prev) => {
      if (prev === imageData.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  const handleBack = () => {
    setImageStep((prev) => {
      if (prev === 0) {
        return imageData.length - 1;
      } else {
        return prev - 1;
      }
    });
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      handleNext();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [imageStep]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Image Slider</h1>
      <h1>{imageStep}</h1>
      <div>
        <img
          src={imageData[imageStep].url}
          alt={imageData[imageStep].alt}
          style={{ width: "900px" }}
        />
      </div>
      <button onClick={handleBack} title="Back">
        {"<"}{" "}
      </button>
      <button onClick={handleNext} title="Next">
        {" "}
        {">"}
      </button>
    </div>
  );
}
