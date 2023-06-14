import {
  SupabaseClient,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "./Login.module.css";
import Head from "next/head";

const Login = () => {
  const supabase: SupabaseClient = useSupabaseClient();
  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  async function loginWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  }

  return (
    <>
      <Head>
        <title>Login / Honestly Slay</title>
      </Head>
      <div className={styles.bg}>
        <div className={styles.container}>
          <h1 className={styles.title}>Effettua il login</h1>
          <ul className={styles.links}>
            <li>
              <FontAwesomeIcon
                className={`${styles.icon} primary`}
                onClick={loginWithGoogle}
                icon={faGoogle}
              />
            </li>
            <li>
              <FontAwesomeIcon
                className={`${styles.icon} primary`}
                onClick={loginWithGithub}
                icon={faGithub}
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Login;
