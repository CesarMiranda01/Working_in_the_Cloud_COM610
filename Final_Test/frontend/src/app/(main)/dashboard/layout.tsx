// (main)/dashboard/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import Sidebar from '@/common/components/common/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticación después de montar el componente
    if (!isAuthenticated) {
      router.push('/administrators/auth/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || loading) {
    return <div className="text-center py-10">Iniciar Sesion...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}