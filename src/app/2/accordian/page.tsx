"use client";
import { accordionData } from "@/constants/accordianData";
import { useState } from "react";
import AccordianDetails from "./AccordianDetails";

export default function Accordian() {
  const [accData, setAccData] = useState<number[]>([]);

  const handleExpandCollapse = (id: number) => {
    setAccData((prev) => {
      if (prev.includes(id)) {
        let filteredId = prev.filter((item) => item !== id);
        return filteredId;
      } else {
        return [...prev, id];
      }
    });
  };

  const handleExpandAll = () => {
    let accIds = accordionData.map((item) => item.id);
    setAccData(accIds);
  };

  const handleCollapseAll = () => {
    setAccData([]);
  };

  return (
    <>
      <h1>Accordian</h1>

      <section style={{ display: "flex", gap: "15px" }}>
        <button onClick={handleExpandAll}>Expand All</button>
        <button onClick={handleCollapseAll}>Collapse All</button>
      </section>
      <br />
      <br />
      <section
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        {accordionData?.map((item) => {
          return (
            <div key={item.id}>
              <button
                style={{
                  width: "100%",
                  fontSize: "20px",
                  padding: "10px",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onClick={() => handleExpandCollapse(item.id)}
              >
                {item.title}
              </button>

              <AccordianDetails
                isOpen={accData.includes(item.id)}
                description={item.description}
                categories={item.categories}
              />
            </div>
          );
        })}
      </section>
    </>
  );
}
