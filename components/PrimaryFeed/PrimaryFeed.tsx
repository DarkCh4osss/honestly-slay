import React, { useState } from "react";
import styles from "./PrimaryFeed.module.css";
import Header from "../Header/Header";
import PostForm from "../PostForm/PostForm";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { SupabaseClient, Session } from "@supabase/supabase-js";

interface Props {
  title: string;
}

const PrimaryFeed: React.FC<Props> = ({ title }) => {
  const supabase: SupabaseClient = useSupabaseClient();
  const session: Session = useSession()!;
  const [posts, setPosts] = useState<any>();

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

  // useEffect(() => {
  //   fetchPost();
  // }, []);

  return (
    <>
      <div onLoad={fetchPost}>
        <Header title={title} />
        <PostForm />
      </div>
      {posts?.length > 0 && console.log(posts)}
    </>
  );
};

export default PrimaryFeed;
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
