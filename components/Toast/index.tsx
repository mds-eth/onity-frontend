import React, { useState, useEffect } from 'react';
import { ToastWrapper } from './styles';

export type ToastType = 'success' | 'error' | 'info';

interface CustomToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return isVisible ? <ToastWrapper type={type}>{message}</ToastWrapper> : null;
};

export default CustomToast;
