"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, CheckCircle, AlertCircle, Info, MessageSquare } from "lucide-react";

export type NotificationType = "success" | "error" | "warning" | "info" | "message";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}

interface NotificationAlertProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export default function NotificationAlert({ notifications, onDismiss }: NotificationAlertProps) {
  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setVisibleNotifications(notifications);
  }, [notifications]);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500" size={20} />;
      case "error":
        return <AlertCircle className="text-red-500" size={20} />;
      case "warning":
        return <AlertCircle className="text-orange-500" size={20} />;
      case "message":
        return <MessageSquare className="text-blue-500" size={20} />;
      default:
        return <Info className="text-blue-500" size={20} />;
    }
  };

  const getStyles = (type: NotificationType) => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50";
      case "error":
        return "border-red-200 bg-red-50";
      case "warning":
        return "border-orange-200 bg-orange-50";
      case "message":
        return "border-blue-200 bg-blue-50";
      default:
        return "border-blue-200 bg-blue-50";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      <AnimatePresence>
        {visibleNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`${getStyles(notification.type)} border rounded-xl p-4 shadow-lg`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-gray-900">
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => onDismiss(notification.id)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substring(7);
    const newNotification = { ...notification, id };
    setNotifications((prev) => [...prev, newNotification]);

    // Auto-dismiss after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        dismissNotification(id);
      }, notification.duration || 5000);
    }

    return id;
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    dismissNotification,
    clearAll,
  };
}
