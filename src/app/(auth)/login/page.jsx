import { auth, signIn } from "../../../lib/auth";
import { githubLogin, login } from "../../../lib/action";
import LoginForm from "../../../components/LoginForm/LoginForm";
import styles from "./login.module.css";

export default async function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={githubLogin}>
          <button className={styles.github}>Login with Github</button>
        </form>
        <LoginForm />
      </div>
    </div>
  );
}
