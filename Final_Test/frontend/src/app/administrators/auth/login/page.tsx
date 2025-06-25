//app/(auth)/login/page.tsx
'use client';

import Link from 'next/link';
import LoginForm from '@/common/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <LoginForm />
      <p className="text-center mt-4">
        ¿No tienes una cuenta?{' '}
        <Link href="/administrators/administrators/register" className="text-blue-500 hover:underline">
          Regístrate
        </Link>
      </p>
    </div>
  );
}