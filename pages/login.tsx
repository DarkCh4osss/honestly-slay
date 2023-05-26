import {
  SupabaseClient,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faGithub,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const LoginPage = () => {
  const supabase: SupabaseClient = useSupabaseClient();
  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="py-14">
        <h1 className="text-2xl">Effettua il login</h1>
        <button
          onClick={loginWithGoogle}
          className="bg-white hover:bg-transparent hover:text-white text-black px-12 py-4 text-2xl rounded-md border-solid border-pink-300 border-2 hover:scale-110 shadow-lg shadow-pink-300 transition-all"
        >
          <FontAwesomeIcon icon={faGoogle} /> Google
        </button>
        <button
          onClick={loginWithGoogle}
          className="bg-white hover:bg-transparent hover:text-white text-black px-12 py-4 text-2xl rounded-md border-solid border-pink-300 border-2 hover:scale-110 shadow-lg shadow-pink-300 transition-all"
        >
          <FontAwesomeIcon icon={faFacebook} /> Facebook
        </button>
        <button
          onClick={loginWithGoogle}
          className="bg-white hover:bg-transparent hover:text-white text-black px-12 py-4 text-2xl rounded-md border-solid border-pink-300 border-2 hover:scale-110 shadow-lg shadow-pink-300 transition-all"
        >
          <FontAwesomeIcon icon={faGithub} /> Github
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
