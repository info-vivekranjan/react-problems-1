"use client";

import React, { useState } from "react";
import { multiCheckData } from "@/constants/multiCheckData";
import { MultiCheckChildDataType } from "./MultiCheckDataType";

const parentIds = multiCheckData?.map((item) => {
  return {
    [item.id]: [],
  };
});

const childrenData = multiCheckData.map((item) => {
  return {
    [item.id]: item.children,
  };
});

const childrenDataObj = Object.assign({}, ...childrenData);

export default function MultiCheck() {
  const [checkData, setCheckData] = useState<
    Record<string, MultiCheckChildDataType[]>
  >(Object.assign({}, ...parentIds));

  const handleCheckChildren = (
    e: React.ChangeEvent<HTMLInputElement>,
    child: MultiCheckChildDataType,
    parentId: string,
  ) => {
    const { checked } = e.target;

    setCheckData((prev) => {
      if (checked) {
        return {
          ...prev,
          [parentId]: [...prev[parentId], child],
        };
      }
      return {
        ...prev,
        [parentId]: prev[parentId].filter((item) => item.id !== child.id),
      };
    });
  };

  const handleCheckParent = (
    e: React.ChangeEvent<HTMLInputElement>,
    parentId: string,
  ) => {
    const { checked } = e.target;

    setCheckData((prev) => {
      if (checked) {
        return {
          ...prev,
          [parentId]: [...childrenDataObj[parentId]],
        };
      }

      return {
        ...prev,
        [parentId]: [],
      };
    });
  };

  console.log(checkData);

  return (
    <>
      <h1>Multi Check</h1>
      {multiCheckData.map((parent) => {
        return (
          <div>
            <label htmlFor={parent.id}>{parent.label}</label>
            <input
              type="checkbox"
              name={parent.id}
              id={parent.id}
              style={{ marginBottom: "15px" }}
              checked={
                checkData[parent.id].length ===
                childrenDataObj[parent.id].length
              }
              onChange={(e) => handleCheckParent(e, parent.id)}
            />

            {parent.children.map((child) => {
              return (
                <div style={{ marginLeft: "15px", marginBottom: "15px" }}>
                  <label htmlFor={child.id}>{child.label}</label>
                  <input
                    type="checkbox"
                    name={child.id}
                    id={child.id}
                    checked={checkData[parent.id].includes(child)}
                    onChange={(e) => handleCheckChildren(e, child, parent.id)}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
