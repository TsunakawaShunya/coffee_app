// app/signin/page.tsx
'use client';

import SignInForm from "../components/Auth/SignInForm";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <SignInForm router={router} />
    </div>
  );
}