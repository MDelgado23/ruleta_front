import LoginForm from '../componentes/LoginForm/LoginForm';
import HomeButton from '../componentes/HomeButton/homebutton';
import Image from 'next/image';
import styles from './page.module.css'
import BackButton from '../componentes/BackButton/BackButton';

const LoginPage = () => {
  return (
    <div>
      <Image 
          src="/images/fondo.jpg" 
          alt="Background" 
          layout="fill" 
          objectFit="cover" 
          quality={100}
          className={styles.backgroundImage}
        />
      <div className={styles.btns}>
        <HomeButton />
        <BackButton />
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
