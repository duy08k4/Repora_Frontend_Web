import type { ReactNode } from "react";

interface interface__toast {
    id?: number,
    typeToast: "s" | "e" | "i" | "w",
    content: string,
    duration?: number
}

interface interface__toastContext {
    addToast: ({}: interface__toast) => void,
    removeToast: (id: number) => void
}

interface interface__toastProviderProps {
    children: ReactNode;
}

export type {interface__toast, interface__toastContext, interface__toastProviderProps}