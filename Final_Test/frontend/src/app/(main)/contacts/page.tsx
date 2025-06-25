// app/(main)/contacts/page.tsx
'use client';

import Link from 'next/link';
import ContactsComponent from '@/common/components/contacts/Contacts'; // Cambiado el nombre aquí
import { useAuthStore } from '@/stores/authStore';

export default function ContactsPage() {
  const { isAuthenticated } = useAuthStore();
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <ContactsComponent /> 
      {isAuthenticated ? (
        <p className="text-center mt-4">
          Regresar a la pagina principal{' '}
          <Link href="/dashboard" className="text-blue-500 hover:underline">
            Home
          </Link>
        </p>
      ) : (
        <p className="text-center mt-4">
          Inicia Sesion{' '}
          <Link href="/administrators/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      )}
    </div>
  );
}