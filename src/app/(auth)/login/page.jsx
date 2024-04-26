import { auth, signIn } from "../../../lib/auth";
import { githubLogin } from "../../../lib/action";

export default async function Login() {
  

  return (
    <div>
      <form action={githubLogin}>
        <button>Login with Gitub</button>
      </form>
    </div>
  );
}
