import register from '../../../lib/action'
import styles from './register.module.css'
import RegisterForm from '../../../components/RegisterForm/RegisterForm'
export default function Register() {
  return (
    <div className={styles.container}>
    <div className={styles.wrapper}>
      <RegisterForm/>
    </div>
  </div>
  );
}
