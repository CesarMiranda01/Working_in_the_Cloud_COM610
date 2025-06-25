// // app/administrators/publish/create/page.tsx
// 'use client';

// import PublishForm from '@/common/components/publish/PublishForm';

// export default function CreateProductPage() {
//   return (
//     <div>
//       <PublishForm />
//     </div>
//   );
// }


// app/administrators/publish/create/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import PublishForm from '@/common/components/publish/PublishForm';

export default function CreateProductPage() {
  const router = useRouter();
  const { isAuthenticated, token } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.push('/login');
    }
  }, [isAuthenticated, token, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <PublishForm />
    </div>
  );
}