import React, { useEffect, useState } from "react";
import styles from "./PrimaryFeed.module.css";
import Header from "../Header/Header";
import PostForm from "../PostForm/PostForm";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { SupabaseClient, Session } from "@supabase/supabase-js";
import PostCard from "../PostCard/PostCard";

interface Props {
  title: string;
}

const PrimaryFeed: React.FC<Props> = ({ title }) => {
  const supabase: SupabaseClient = useSupabaseClient();
  const session: Session = useSession()!;
  const [posts, setPosts] = useState<any>(null);

  function fetchPost() {
    supabase
      .from("posts")
      .select(
        "id, content, created_at, photos, profiles(id, avatar_url, username, full_name)"
      )
      .is("parent", null)
      .order("created_at", { ascending: false })
      .then((result) => {
        setPosts(result.data);
      });
  }

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <>
      <div>
        <Header title={title} />
      </div>
      <PostForm onPost={fetchPost} />
      {posts?.length > 0 &&
        posts.map((post: any) => (
          <PostCard key={post.id} {...post} onDelete={fetchPost} />
        ))}
    </>
  );
};

export default PrimaryFeed;
