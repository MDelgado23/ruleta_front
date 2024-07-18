'use client';

import React from 'react';
import withAuth from '../hoc/withAuth';
import AdminPanel from '../componentes/AdminPanel/AdminPanel';
import Image from 'next/image';
import styles from './page.module.css';

const Admin = () => {
  return <div>
    <Image 
          src="/images/fondo.jpg" 
          alt="Background" 
          layout="fill" 
          objectFit="cover" 
          quality={100}
          className={styles.backgroundImage}
        />
        <AdminPanel />
        </div>
};

export default withAuth(Admin, ['admin']);
