"use client";

import React, { useEffect } from "react";
import { SingleToastType, ToastType } from "./toastType";

export default React.memo(function ToastComp({
  toast,
  handleDeleteToast,
}: {
  toast: SingleToastType;
  handleDeleteToast: (id: number) => void;
}) {
  const backgroundColor = () => {
    let color = "black";

    if (toast.type === ToastType.SUCCESS) {
      color = "green";
    } else if (toast.type === ToastType.ERROR) {
      color = "red";
    } else if (toast.type === ToastType.WARNING) {
      color = "orange";
    } else if (toast.type === ToastType.INFO) {
      color = "blue";
    }
    return color;
  };

  useEffect(() => {
    setTimeout(() => {
      handleDeleteToast(toast.id);
    }, 3000);
  }, [toast.id]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        backgroundColor: backgroundColor(),
        color: "white",
        width: "300px",
        borderRadius: "4px",
        zIndex: 999,
      }}
    >
      <span>{toast.message || "This is a sample success meaage."}</span>
      <button
        style={{
          backgroundColor: "white",
          width: "25px",
          height: "25px",
          borderRadius: "50%",
          border: "1px solid white",
        }}
        onClick={() => handleDeleteToast(toast.id)}
      >
        X
      </button>
    </div>
  );
});
