"use client";

import { useState } from "react";
import DialogContent from "./DialogContent";

export default function Dialog() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h1>Dialog</h1>
      <button onClick={() => setOpen(true)}>Open Dialog</button>
      {open && (
        <DialogContent
          title={`Sample title`}
          description={`lorem ipsum dolor sit amet consectetur adipiscing elit odio autem ad
          facere aliquip consequat id eiusmod blanditiis laborum mollit aut
          incididunt libero laboris sunt laborum irure irure nihil cupidatat
          sint aute est facere irure illum`}
          handleClose={handleClose}
        />
      )}
    </>
  );
}
