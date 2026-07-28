"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser } from "@clerk/nextjs";
import { Bell, CheckCircle, AlertCircle, Info, MessageSquare } from "lucide-react";

export type NotificationType = "success" | "error" | "warning" | "info" | "message";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  isRead?: boolean;
  createdAt?: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => string;
  dismissNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  unreadCount: number;
  refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user, isLoaded } = useUser();

  // Fetch notifications from database when user is loaded
  useEffect(() => {
    if (isLoaded && user) {
      refreshNotifications();
    }
  }, [isLoaded, user]);

  const refreshNotifications = async () => {
    try {
      const response = await fetch("/api/dashboard/notifications");
      if (response.ok) {
        const data = await response.json();
        const dbNotifications = data.notifications || [];
        
        // Convert DB notifications to our format
        const formattedNotifications: Notification[] = dbNotifications.map((notif: any) => ({
          id: notif.id,
          type: notif.type?.toLowerCase() as NotificationType || "info",
          title: notif.title || "Notification",
          message: notif.message,
          isRead: notif.isRead,
          createdAt: new Date(notif.createdAt),
        }));

        setNotifications(formattedNotifications);
        setUnreadCount(formattedNotifications.filter((n: Notification) => !n.isRead).length);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substring(7);
    const newNotification = { ...notification, id };
    
    setNotifications((prev) => [newNotification, ...prev]);
    
    if (!notification.isRead) {
      setUnreadCount((prev) => prev + 1);
    }

    // Auto-dismiss after duration (default 5 seconds)
    if (notification.duration !== 0) {
      setTimeout(() => {
        dismissNotification(id);
      }, notification.duration || 5000);
    }

    return id;
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => {
      const notif = prev.find((n) => n.id === id);
      if (notif && !notif.isRead) {
        setUnreadCount((count) => Math.max(0, count - 1));
      }
      return prev.filter((n) => n.id !== id);
    });
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: "POST" });
      
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((count) => Math.max(0, count - 1));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        dismissNotification,
        markAsRead,
        clearAll,
        unreadCount,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
