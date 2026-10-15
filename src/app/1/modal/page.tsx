"use client";

import ModalComp from "@/components/ModalComp";
import { useState } from "react";

export default function ModalPage() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <h1>Modal</h1>
      <button onClick={handleOpen}>Open Modal</button>
      {open && (
        <ModalComp
          title="This is a sample title"
          description="This is a sample description This is a sample description This is a sample description This is a sample description This is a sample description This is a sample description"
          handleClose={handleClose}
        />
      )}
    </>
  );
}
