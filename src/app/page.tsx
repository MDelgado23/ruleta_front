'use client';

import React from 'react';
import RootLayout from './layout';
import Navbar from './componentes/NavBar/navbar';
import Image from 'next/image';
import styles from './page.module.css';

const HomePage = () => {
  return (
    <RootLayout>
      <Navbar />
      <div className={styles.background}>
        <Image 
          src="/images/fondo.jpg" 
          alt="Background" 
          layout="fill" 
          objectFit="cover" 
          quality={100}
          className={styles.backgroundImage}
        />
        <div className={styles.content}>
          <h1>Bienvenido a MUBet</h1>
        </div>
      </div>
    </RootLayout>
  );
};

export default HomePage;
