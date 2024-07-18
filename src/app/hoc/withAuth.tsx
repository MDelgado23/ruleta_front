'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  role: string;
  exp: number;
}

const withAuth = (ComponenteProtegido: React.ComponentType, rolRequerido: string) => {
  return (props: any) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('token');
          router.push('/login');
        } else {
          if (decodedToken.role === rolRequerido) {
            setIsAuthorized(true);
          } else {
            router.push('/unauthorized'); 
          }
        }
      } else {
        router.push('/login');
      }
    }, [router, rolRequerido]);

    if (!isAuthorized) {
      return <p>Cargando...</p>;
    }

    return <ComponenteProtegido {...props} />;
  };
};

export default withAuth;
