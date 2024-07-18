'use client';

import React from 'react';
import RootLayout from './layout';
import Navbar from './componentes/NavBar/navbar';

const HomePage = () => {
  return (
    <RootLayout>
      <Navbar />
      <div>
        <h1>Bienvenido a MUBet</h1>
      </div>
    </RootLayout>
  );
};

export default HomePage;
