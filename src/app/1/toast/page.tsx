"use client";

import { useCallback, useState } from "react";
import { SingleToastType, ToastType } from "./toastType";
import ToastComp from "./ToastComp";

const MAX_TOAST = 3;

export default function Toast() {
  const [toastData, setToastData] = useState<{
    visible: SingleToastType[];
    queue: SingleToastType[];
  }>({
    visible: [],
    queue: [],
  });

  const handleAddNotification = (message: string, type: string) => {
    const payload = {
      id: Date.now(),
      message,
      type,
    };

    setToastData((prev) => {
      if (prev.visible.length < MAX_TOAST) {
        return {
          ...prev,
          visible: [...prev.visible, payload],
        };
      }

      return {
        ...prev,
        queue: [...prev.queue, payload],
      };
    });
  };

  const handleDeleteToast = useCallback((id: number) => {
    setToastData((prev) => {
      let visible = prev.visible.filter((item) => item.id !== id);

      if (visible.length < MAX_TOAST && prev.queue.length > 0) {
        const [lastToast, ...restofQueue] = prev.queue;

        return {
          visible: [...visible, lastToast],
          queue: restofQueue,
        };
      }

      return {
        ...prev,
        visible,
      };
    });
  }, []);

  console.log("toastData==", toastData);

  return (
    <>
      <h1>Toast Notification</h1>

      <button
        onClick={() =>
          handleAddNotification(
            "This is a sample SUCCESS meaage.",
            ToastType.SUCCESS,
          )
        }
      >
        Success
      </button>
      <button
        onClick={() =>
          handleAddNotification(
            "This is a sample ERROR meaage.",
            ToastType.ERROR,
          )
        }
      >
        Error
      </button>

      <button
        onClick={() =>
          handleAddNotification(
            "This is a sample WARNING meaage.",
            ToastType.WARNING,
          )
        }
      >
        Warning
      </button>

      <button
        onClick={() =>
          handleAddNotification("This is a sample INFO meaage.", ToastType.INFO)
        }
      >
        Info
      </button>

      <section
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {toastData.visible?.map((toast) => {
          return (
            <ToastComp
              key={toast.id}
              toast={toast}
              handleDeleteToast={handleDeleteToast}
            />
          );
        })}
      </section>
    </>
  );
}
