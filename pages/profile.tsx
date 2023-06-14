import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React from "react";

const ProfilePage = () => {
  const supabase = useSupabaseClient();
  const session = useSession();

  async function logout() {
    await supabase.auth.signOut();
  }

  return (
    <div>
      <a className="primary" onClick={logout}>
        Logout
      </a>
    </div>
  );
};

export default ProfilePage;
