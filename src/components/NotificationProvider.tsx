"use client";

import { useEffect } from "react";
import NotificationAlert from "@/components/NotificationAlert";
import { useNotifications } from "@/contexts/NotificationContext";

export default function NotificationProvider() {
  const { notifications, dismissNotification } = useNotifications();

  return (
    <NotificationAlert
      notifications={notifications}
      onDismiss={dismissNotification}
    />
  );
}
