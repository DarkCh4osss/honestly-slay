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

  function createPost() {
    supabase
      .from("posts")
      .insert({
        author: session.user.id,
        content,
      })
      .then((res) => {
        console.log(res);
      });
  }

  function fetchPost() {
    supabase
      .from("posts")
      .select("id, content, created_at, profiles(id, avatar, name)")
      .is("parent", null)
      .order("created_at", { ascending: false })
      .then((result) => {
        console.log(result);
        setPosts(result.data);
      });
  }

  if (!session) {
    return <LoginPage />;
  }

  return (
    <>
      <Head>
        <title>Home / Honestly Slay</title>
      </Head>
      <Layout />
    </>
  );
}
