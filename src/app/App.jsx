"use client";
import React, { useState } from "react";
import AuthContainer from "@/components/auth/AuthContainer";
import { Toaster } from "react-hot-toast";

function App() {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <AuthContainer
        isLoginView={isLoginView}
        toggleView={() => setIsLoginView(!isLoginView)}
      />
    </div>
  );
}

export default App;
