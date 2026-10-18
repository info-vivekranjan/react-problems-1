"use client";

import { useEffect } from "react";
import { NOTIFICATION_TYPE, NotificationType } from "./NotificationTypes";

export default function NotificationComp({
  notification,
  handleDeleteNotification,
}: {
  notification: NotificationType;
  handleDeleteNotification: (id: number) => void;
}) {
  const getBackgroundColor = () => {
    let color = "black";

    if (notification.type === NOTIFICATION_TYPE.SUCCESS) {
      color = "green";
    } else if (notification.type === NOTIFICATION_TYPE.ERROR) {
      color = "red";
    } else if (notification.type === NOTIFICATION_TYPE.WARNING) {
      color = "orange";
    } else if (notification.type === NOTIFICATION_TYPE.INFO) {
      color = "blue";
    }

    return color;
  };

  useEffect(() => {
    setTimeout(() => {
      handleDeleteNotification(notification.id);
    }, 3500);
  }, [notification.id]);

  return (
    <div
      style={{
        backgroundColor: getBackgroundColor(),
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "300px",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <span>{notification.message ?? "This is a sample SUCCESS message."}</span>
      <button
        style={{
          border: "1px solid white",
          backgroundColor: "white",
          width: "22px",
          height: "22px",
          borderRadius: "50%",
        }}
        onClick={() => handleDeleteNotification(notification.id)}
      >
        X
      </button>
    </div>
  );
}
