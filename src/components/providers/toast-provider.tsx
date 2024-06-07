"use client";
import React, { createContext } from "react";
import { Toast } from "primereact/toast";
import { useRef } from "react";

export const ToastContext = createContext<any>(null);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useRef<any>(null);

  return (
    <ToastContext.Provider value={toast}>
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
