"use child";

import { AccordianDataType } from "./accordianType";

export default function AccordianChild({
  item,
  isPreview,
}: {
  item: AccordianDataType;
  isPreview: boolean;
}) {
  return (
    <>
      {isPreview && (
        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <p>{item.description}</p>
          <ul>
            {item.categories.map((categoryItem, index) => {
              return <li key={index}>{categoryItem}</li>;
            })}
          </ul>
        </div>
      )}
    </>
  );
}
