'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './backbutton.module.css';

const BackButton = () => {
  const router = useRouter();
  const home:string = '/';
  const handleBackClick = () => {
    router.push(home);
  };

  return (
    <button className={styles.backButton} onClick={handleBackClick}>
      ← Volver
    </button>
  );
};

export default BackButton;
