import RegisterForm from '../componentes/RegistroForm/RegistroForm';
import HomeButton from '../componentes/HomeButton/homebutton';
import styles from './page.module.css';
import Image from 'next/image';
import BackButton from '../componentes/BackButton/BackButton';

const RegisterPage = () => {
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
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
