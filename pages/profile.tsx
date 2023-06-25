import Layout from "@/components/Layout/Layout";
import Main from "@/components/Main/Main";
import Profile from "@/components/Profile/Profile";
import { UserContext, UserContextProvider } from "@/contexts/UserContext";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
// import styles from "../styles/profile.module.css";

interface Profile {
  username: string;
  full_name: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const { asPath: pathname } = router;
  const userId = router.query.id;
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetchUser();
  }, [userId]);

  function fetchUser() {
    supabase
      .from("profiles")
      .select()
      .eq("id", userId)
      .then((result: any) => {
        if (result.error) {
          throw result.error;
        }
        if (result.data) {
          setProfile(result.data[0]);
        }
      });
  }

  const supabase = useSupabaseClient();
  const session = useSession();

  async function logout() {
    await supabase.auth.signOut();
  }

  return (
    <UserContextProvider>
      <Head>
        <title>
          {profile?.full_name} (@{profile?.username}) / honestly, slay
        </title>
      </Head>
      <Layout
        main={<Main title={""} primaryCol={<Profile profile={profile} />} />}
      />
    </UserContextProvider>
  );
};

export default ProfilePage;
