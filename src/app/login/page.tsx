import LoginForm from '../componentes/LoginForm/LoginForm';
import styles from './LoginPage.module.css'; 

const LoginPage = () => {
  return (
    <div className={styles['page-container']}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
