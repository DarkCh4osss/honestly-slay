import Layout from "@/components/Layout/Layout";
import Main from "@/components/Main/Main";
import Saved from "@/components/Saved/Saved";
import { UserContextProvider } from "@/contexts/UserContext";
import Head from "next/head";
import React from "react";

const SavedPostsPage = () => {
  return (
    <UserContextProvider>
      <Head>
        <title>Saved posts / honestly, slay</title>
      </Head>
      <Layout main={<Main title={""} primaryCol={<Saved />} />} />
    </UserContextProvider>
  );
};

export default SavedPostsPage;
