"use client";

import { accordionData } from "@/constants/accordianData";
import { useState } from "react";
import AccordianChild from "./AccordianChild";

export default function Accordian() {
  const [accordianState, setAccordianState] = useState<number[]>([]);

  const handleAccordianState = (id: number) => {
    setAccordianState((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const collapseAll = () => {
    setAccordianState([]);
  };

  const expandAll = () => {
    const getAllIds = accordionData?.map((item) => item.id);
    setAccordianState(getAllIds);
  };

  return (
    <>
      <h1>Accordian</h1>
      <div style={{ display: "flex", gap: "20px", marginBottom: "25px" }}>
        <button onClick={collapseAll}>Collapse All</button>
        <button onClick={expandAll}>Expand All</button>
      </div>

      {accordionData.map((item) => {
        return (
          <section key={item.id} style={{ width: "60%", margin: "auto" }}>
            <button
              onClick={() => handleAccordianState(item.id)}
              style={{
                width: "100%",
                textAlign: "left",
                fontSize: "22px",
                padding: "10px",
                marginBottom: "10px",
                cursor: "pointer",
              }}
            >
              {item.title}
            </button>
            <AccordianChild
              item={item}
              isPreview={accordianState.includes(item.id)}
            />
          </section>
        );
      })}
    </>
  );
}
