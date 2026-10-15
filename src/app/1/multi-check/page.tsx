"use client";

import { multiCheckData } from "@/constants/multiCheckData";
import { useState } from "react";
import { MultiCheckChildDataType } from "./multiCheckType";

type CheckboxMap = Record<string, MultiCheckChildDataType[]>;

const parentKeys: CheckboxMap[] = multiCheckData.map((item) => {
  return { [item.id]: [] };
});

const parentWithChildren = multiCheckData.map((item) => {
  return { [item.id]: item.children };
});

const parentWithChildrenObj = Object.assign(
  {},
  ...parentWithChildren,
) as CheckboxMap;

export default function MultiCheck() {
  const [checkboxData, setCheckboxData] = useState<CheckboxMap>(
    Object.assign({}, ...parentKeys) as CheckboxMap,
  );

  const handleChangeChildren = (
    e: React.ChangeEvent<HTMLInputElement>,
    children: MultiCheckChildDataType,
    parent: string,
  ) => {
    const { checked } = e.target;

    setCheckboxData((prev) => {
      if (checked) {
        return {
          ...prev,
          [parent]: [...prev[parent], children],
        };
      }

      return {
        ...prev,
        [parent]: prev[parent].filter((item) => item.id !== children.id),
      };
    });
  };

  const handleParentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    parent: string,
  ) => {
    const { checked } = e.target;

    setCheckboxData((prev) => {
      if (checked) {
        return {
          ...prev,
          [parent]: [...parentWithChildrenObj[parent]],
        };
      }

      return {
        ...prev,
        [parent]: [],
      };
    });
  };

  console.log(checkboxData);

  return (
    <>
      <h1>Multi CheckBox</h1>
      {multiCheckData?.map((parent) => {
        return (
          <div key={parent.id}>
            <div style={{ marginBottom: "10px" }}>
              <label htmlFor={parent.id}>{parent.label}</label>
              <input
                type="checkbox"
                name={parent.id}
                id={parent.id}
                onChange={(e) => handleParentChange(e, parent.id)}
                checked={
                  checkboxData[parent.id].length ===
                  parentWithChildrenObj[parent.id].length
                }
              />
            </div>
            {parent.children.map((child) => {
              return (
                <div
                  key={child.id}
                  style={{ marginLeft: "15px", marginBottom: "10px" }}
                >
                  <label htmlFor={child.id}>{child.label}</label>
                  <input
                    type="checkbox"
                    name={child.id}
                    id={child.id}
                    onChange={(e) => handleChangeChildren(e, child, parent.id)}
                    checked={checkboxData[parent.id].includes(child)}
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
