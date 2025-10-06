import React, { useState, useEffect } from 'react';

let showToast;

const Toast = () => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    showToast = (message, type = 'info') => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
    };
  }, []);

  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type}`}>
      {toast.message}
    </div>
  );
};

export { showToast };
export default Toast;