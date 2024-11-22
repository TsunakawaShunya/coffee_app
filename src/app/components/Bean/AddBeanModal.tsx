// components/Bean/AddBeanModal.tsx
'use client';

import { useState } from "react";

// Cookieヘルパー関数
const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

const RAILS_DEVISE_ENDPOINT = "http://localhost:3001/api/v1";

interface AddBeanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBean: (newBean: { name: string; roast: string; process: string }) => void;
}

const AddBeanModal: React.FC<AddBeanModalProps> = () => {
  return (
    <>
        <h1>モーダル表示</h1>
    </>
  )
};

export default AddBeanModal;
