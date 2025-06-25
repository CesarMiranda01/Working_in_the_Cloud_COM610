'use client';

import Link from 'next/link';
import RegisterForm from '@/common/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <RegisterForm />
      <p className="text-center mt-4">
        ¿Ya tienes una cuenta?{' '}
        <Link href="/administrator-auth/login" className="text-blue-500 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}