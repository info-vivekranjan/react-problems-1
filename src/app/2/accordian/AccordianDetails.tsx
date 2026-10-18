"use client";

import React from "react";

export default React.memo(function AccordianDetails({
  description,
  categories,
  isOpen,
}: {
  description: string;
  categories: string[];
  isOpen: boolean;
}) {
  console.log("Child Rendering...");
  return (
    <>
      {isOpen && (
        <div style={{ padding: "10px" }}>
          <p>{description}</p>
          <ul>
            {categories.map((category, index) => {
              return <li key={index + 1}>{category}</li>;
            })}
          </ul>
        </div>
      )}
    </>
  );
});
