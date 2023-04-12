import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

interface Props {
  // username: string;
}

const Navbar: React.FC<Props> = ({}) => {
  const supabase = useSupabaseClient();
  const session = useSession();

  async function logout() {
    await supabase.auth.signOut();
  }

  return (
    <div>
      <h1>Test</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Navbar;
