"use client";

import { useCallback, useState } from "react";
import { NOTIFICATION_TYPE, NotificationType } from "./NotificationTypes";
import NotificationComp from "./NotificationComp";

const MAX_VISIBLE = 3;
export default function Notification() {
  const [notificationData, setNotificationData] = useState<{
    visible: NotificationType[];
    queue: NotificationType[];
  }>({
    visible: [],
    queue: [],
  });

  const handleAddNotification = (message: string, type: NOTIFICATION_TYPE) => {
    const payload = {
      id: Date.now(),
      message,
      type,
    };

    setNotificationData((prev) => {
      if (prev.visible.length < MAX_VISIBLE) {
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

  const handleDeleteNotification = useCallback((id: number) => {
    setNotificationData((prev) => {
      const visibleFilter = prev.visible.filter((item) => item.id !== id);

      if (visibleFilter.length < MAX_VISIBLE && prev.queue.length > 0) {
        const [lastNotification, ...restNotification] = prev.queue;

        return {
          visible: [...visibleFilter, lastNotification],
          queue: restNotification,
        };
      }

      return {
        ...prev,
        visible: visibleFilter,
      };
    });
  }, []);

  return (
    <>
      <h1>Notification</h1>

      <div style={{ display: "flex", gap: "15px" }}>
        <button
          onClick={() =>
            handleAddNotification(
              "This is a sample SUCCESS message.",
              NOTIFICATION_TYPE.SUCCESS,
            )
          }
        >
          Success
        </button>

        <button
          onClick={() =>
            handleAddNotification(
              "This is a sample ERROR message.",
              NOTIFICATION_TYPE.ERROR,
            )
          }
        >
          Error
        </button>

        <button
          onClick={() =>
            handleAddNotification(
              "This is a sample WARNING message.",
              NOTIFICATION_TYPE.WARNING,
            )
          }
        >
          Warning
        </button>

        <button
          onClick={() =>
            handleAddNotification(
              "This is a sample INFO message.",
              NOTIFICATION_TYPE.INFO,
            )
          }
        >
          Info
        </button>
      </div>

      <section
        style={{
          position: "fixed",
          top: "15px",
          right: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {notificationData?.visible.map((notification) => {
          return (
            <NotificationComp
              key={notification.id}
              notification={notification}
              handleDeleteNotification={handleDeleteNotification}
            />
          );
        })}
      </section>
    </>
  );
}
