import Head from "next/head";
import Layout from "../components/Layout/Layout";
import {
  Session,
  SupabaseClient,
  useSession,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import LoginPage from "./login";
import { useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Home() {
  const supabase: SupabaseClient = useSupabaseClient();
  const session: Session = useSession()!;
  const [profile, setProfile] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }
    supabase
      .from("profiles")
      .select()
      .eq("id", session.user.id)
      .then((result: any) => {
        if (result.data.length) {
          setProfile(result.data[0]);
          setProfilePic(result.data[0].avatar_url);
        }
      });
  }, [session?.user?.id]);

  if (!session) {
    return <LoginPage />;
  }

  return (
    <UserContext.Provider value={{ profile }}>
      <Head>
        <title>Home / Honestly Slay</title>
      </Head>
      <Layout title="Home" />
    </UserContext.Provider>
  );
}
