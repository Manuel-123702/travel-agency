// lib/hooks.ts - Custom React hooks

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { Application, Document, Appointment, Message, Notification } from './types';

// ===== API Query Hooks =====

export const useApplications = () => {
    return useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const response = await fetch('/api/applications');
            if (!response.ok) throw new Error('Failed to fetch applications');
            const data = await response.json();
            return data.data;
        },
    });
};

export const useApplication = (applicationId?: string) => {
    return useQuery({
        queryKey: ['application', applicationId],
        queryFn: async () => {
            if (!applicationId) return null;
            const response = await fetch(`/api/applications/${applicationId}`);
            if (!response.ok) throw new Error('Failed to fetch application');
            const data = await response.json();
            return data.data;
        },
        enabled: !!applicationId,
    });
};

export const useDocuments = (applicationId?: string) => {
    return useQuery({
        queryKey: ['documents', applicationId],
        queryFn: async () => {
            const url = applicationId
                ? `/api/documents?applicationId=${applicationId}`
                : '/api/documents';
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch documents');
            const data = await response.json();
            return data.data || data;
        },
    });
};

export const useAppointments = () => {
    return useQuery({
        queryKey: ['appointments'],
        queryFn: async () => {
            const response = await fetch('/api/appointments');
            if (!response.ok) throw new Error('Failed to fetch appointments');
            const data = await response.json();
            return data.data;
        },
    });
};

export const useConversations = () => {
    return useQuery({
        queryKey: ['conversations'],
        queryFn: async () => {
            const response = await fetch('/api/messages/conversations');
            if (!response.ok) throw new Error('Failed to fetch conversations');
            const data = await response.json();
            return data.data;
        },
    });
};

export const useMessages = (conversationId?: string) => {
    return useQuery({
        queryKey: ['messages', conversationId],
        queryFn: async () => {
            if (!conversationId) return [];
            const response = await fetch(`/api/messages/${conversationId}`);
            if (!response.ok) throw new Error('Failed to fetch messages');
            const data = await response.json();
            return data.data;
        },
        enabled: !!conversationId,
        refetchInterval: 3000, // Auto-refresh every 3 seconds
    });
};

export const useNotifications = () => {
    return useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const response = await fetch('/api/notifications');
            if (!response.ok) throw new Error('Failed to fetch notifications');
            const data = await response.json();
            return data.data;
        },
        refetchInterval: 10000, // Auto-refresh every 10 seconds
    });
};

export const useUnreadNotifications = () => {
    return useQuery({
        queryKey: ['unread-notifications'],
        queryFn: async () => {
            const response = await fetch('/api/notifications?unread=true');
            if (!response.ok) throw new Error('Failed to fetch notifications');
            const data = await response.json();
            return data.data;
        },
        refetchInterval: 10000,
    });
};

export const useUserProfile = () => {
    return useQuery({
        queryKey: ['user-profile'],
        queryFn: async () => {
            const response = await fetch('/api/users/profile');
            if (!response.ok) throw new Error('Failed to fetch profile');
            const data = await response.json();
            return data.data;
        },
    });
};

export const useDashboardStats = () => {
    return useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: async () => {
            const response = await fetch('/api/dashboard/stats');
            if (!response.ok) throw new Error('Failed to fetch stats');
            const data = await response.json();
            return data.data;
        },
    });
};

// ===== Mutation Hooks =====

export const useCreateApplication = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: any) => {
            const response = await fetch('/api/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to create application');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['applications'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
        },
    });
};

export const useUpdateApplication = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            applicationId,
            data,
        }: {
            applicationId: string;
            data: any;
        }) => {
            const response = await fetch(`/api/applications/${applicationId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to update application');
            return response.json();
        },
        onSuccess: (_, { applicationId }) => {
            queryClient.invalidateQueries({ queryKey: ['application', applicationId] });
            queryClient.invalidateQueries({ queryKey: ['applications'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
        },
    });
};

export const useUploadDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            file,
            type,
            applicationId,
        }: {
            file: File;
            type: string;
            applicationId?: string;
        }) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', type);
            if (applicationId) formData.append('applicationId', applicationId);

            const response = await fetch('/api/documents', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error('Failed to upload document');
            return response.json();
        },
        onSuccess: (_, { applicationId }) => {
            queryClient.invalidateQueries({ queryKey: ['documents', applicationId] });
            queryClient.invalidateQueries({ queryKey: ['documents'] });
        },
    });
};

export const useCreateAppointment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: any) => {
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to create appointment');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
        },
    });
};

export const useSendMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: any) => {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to send message');
            return response.json();
        },
        onSuccess: (_, { conversationId }: any) => {
            queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
        },
    });
};

export const useMarkNotificationAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (notificationId: string) => {
            const response = await fetch(`/api/notifications/${notificationId}`, {
                method: 'PUT',
            });
            if (!response.ok) throw new Error('Failed to mark notification as read');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['unread-notifications'] });
        },
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: any) => {
            const response = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to update profile');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-profile'] });
        },
    });
};

// ===== Utility Hooks =====

export const useDebounce = <T,>(value: T, delay: number = 500) => {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

export const useAsync = (
    asyncFunction: () => Promise<any>,
    immediate = true
) => {
    const [status, setStatus] = React.useState<'idle' | 'pending' | 'success' | 'error'>('idle');
    const [value, setValue] = React.useState<any>(null);
    const [error, setError] = React.useState<Error | null>(null);

    const execute = useCallback(async () => {
        setStatus('pending');
        setValue(null);
        setError(null);
        try {
            const response = await asyncFunction();
            setValue(response);
            setStatus('success');
            return response;
        } catch (error) {
            setError(error as Error);
            setStatus('error');
        }
    }, [asyncFunction]);

    React.useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return { execute, status, value, error };
};

// Import React - already imported at top
