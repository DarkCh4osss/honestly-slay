import Head from "next/head";
// import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Layout from "../components/Layout/Layout";
import {
  Session,
  SupabaseClient,
  useSession,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import LoginPage from "./login";
import { useEffect, useState } from "react";

export default function Home() {
  const supabase: SupabaseClient = useSupabaseClient();
  const session: Session = useSession()!;
  const [profile, setProfile] = useState(null);
  const [profilePic, setProfilePic] = useState("");

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
    <Layout>
      <img src={profilePic} alt="Profile picture" />
    </Layout>
  );
}
