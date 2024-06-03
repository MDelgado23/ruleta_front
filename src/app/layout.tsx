import { ReactNode } from 'react';
import Head from 'next/head';
import './globals.css';
import BotonCerrarSesion from './componentes/logoutbtn/logoutbtn';

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <Head>
        <title>Mi Mu Online App</title>
        <meta name="description" content="Aplicación basada en Mu Online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <header>
          <h1>Mi Mu Online App</h1>
        </header>
        <main>{children}
        </main>
        <footer>
          <p>&copy; 2024 Mi Mu Online App</p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
