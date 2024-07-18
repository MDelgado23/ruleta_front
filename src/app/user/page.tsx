'use client';

import React from 'react';
import UserPanel from '../componentes/UserPanel/UserPanel';
import Image from 'next/image';
import styles from './page.module.css'

const User = () => {
  return <div>
  <Image 
        src="/images/fondo.jpg" 
        alt="Background" 
        layout="fill" 
        objectFit="cover" 
        quality={100}
        className={styles.backgroundImage}
      />
      <UserPanel />
      </div>
};

export default User;
