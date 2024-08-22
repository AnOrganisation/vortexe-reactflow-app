import React, { useEffect } from "react";

const Alert = ({ message, type = "info", duration = 3000, onAlertClose }) => {
  useEffect(() => {
    // Auto close the alert after the specified duration
    const timer = setTimeout(() => {
      onAlertClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onAlertClose]);

  const alertStyles = {
    info: "bg-blue-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-black",
    danger: "bg-red-500 text-white",
  };

  return (
    <div
      className={`fixed bottom-5 right-5 p-4 z-30 rounded-lg shadow-lg flex items-center space-x-3 min-w-[250px] ${alertStyles[type]}`}
    >
      <p className="flex-grow">{message}</p>
    </div>
  );
};

export default Alert;
