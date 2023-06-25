import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import PostCard from "../PostCard/PostCard";

const Saved = () => {
  const [posts, setPosts] = useState<any>();
  const session = useSession();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }
    supabase
      .from("saved_posts")
      .select("post_id")
      .eq("user_id", session.user.id)
      .then((result) => {
        const postsIds: any = result.data?.map((item) => item.post_id);
        supabase
          .from("posts")
          .select("*, profiles(*)")
          .in("id", postsIds)
          .then((result) => setPosts(result.data));
      });
  }, [session?.user?.id]);

  return (
    <>
      <div>
        <Header title={"Saved posts"} />
      </div>
      {posts?.length > 0 &&
        posts.map((post: any) => <PostCard key={post.id} {...post} />)}
    </>
  );
};

export default Saved;
