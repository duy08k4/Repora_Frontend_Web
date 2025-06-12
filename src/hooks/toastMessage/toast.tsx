import React, { createContext, useContext, useState } from "react";
import "./toast.css";

// Import interface
import type {
  interface__toast,
  interface__toastContext,
  interface__toastProviderProps,
} from "../../type/interface__Toast";

const ToastContext = createContext<interface__toastContext | undefined>(undefined);

export const useToast = (): interface__toastContext => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<interface__toastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<interface__toast[]>([]);

  // Add Toast
  const addToast = (data: interface__toast) => {
    const id = Date.now() + Math.random(); // tạo ID ngẫu nhiên
    const newToast = { ...data, id };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, (data.duration ?? 0) * 1000);
  };

  // Remove Toast
  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const typeOfToast: Record<string, string> = {
    s: "fa-solid fa-check",
    e: "fa-solid fa-xmark",
    i: "fa-solid fa-info",
    w: "fa-solid fa-exclamation",
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="toastContainer">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast ${toast.typeToast}`}
            onClick={() => { removeToast(toast.id!) }}
            style={
              {
                "--toast-duration": `${toast.duration ?? 0}s`,
              } as React.CSSProperties
            }
          >
            <div className="toast__iconBox">
              <i className={typeOfToast[toast.typeToast]}></i>
            </div>
            <div className="toast__messsageBox">
              <p className="toast__messsageBox--showMessage">{toast.content}</p>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
