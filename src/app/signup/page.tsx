// app/signup/page.tsx
'use client';

import SignUpForm from "../components/Auth/SignUpForm";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <SignUpForm router={router} />
    </div>
  );
}