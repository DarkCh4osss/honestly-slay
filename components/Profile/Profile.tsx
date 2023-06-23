import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import styles from "./Profile.module.css";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { SupabaseClient, Session } from "@supabase/supabase-js";
import PostCard from "../PostCard/PostCard";
import Modal from "../Modal/Modal";

interface Props {
  profile: any;
}

const Profile: React.FC<Props> = ({ profile }) => {
  const supabase: SupabaseClient = useSupabaseClient();
  const session: Session = useSession()!;
  const [posts, setPosts] = useState<any>(null);

  const [openModal, setOpenModal] = useState(false);

  function fetchPost() {
    supabase
      .from("posts")
      .select(
        "id, content, created_at, photos, profiles(id, avatar_url, username, full_name)"
      )
      .order("created_at", { ascending: false })
      .then((result) => {
        setPosts(result.data);
      });
  }

  useEffect(() => {
    fetchPost();
  }, []);

  const isMyUser = profile?.id === session?.user?.id;

  return (
    <>
      <div onLoad={fetchPost}>
        <Header title={profile?.full_name} />
      </div>
      <div className={styles.profileInfo}>
        <img
          className={styles.profileBanner}
          src={profile?.cover_img}
          alt="Profile Banner"
        />
        <div className={styles.profileAvatarSect}>
          <div>
            <img
              src={profile?.avatar_url}
              alt=""
              className={styles.profileAvatar}
            />
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className={isMyUser ? styles.editBtn : styles.editBtnNo}
          >
            Edit Profile
          </button>
        </div>
        <div className={styles.profile}>
          <p className={styles.profileName}>{profile?.full_name}</p>
          <p className={styles.profileUsername}>@{profile?.username}</p>
          <p className={styles.profileBio}>{profile?.bio}</p>
          <p className={styles.profileLoc}>
            <FontAwesomeIcon icon={faLocationDot} />
            {profile?.location}
          </p>
        </div>
      </div>
      {/* {posts?.length > 0 &&
        posts.map((post: any) => <PostCard key={post.id} {...post} />)} */}
      {openModal && (
        <Modal
          title="Edit Profile"
          content={
            <div className={styles.profileInfoEdit}>
              <img
                className={styles.profileBannerEdit}
                src={profile?.cover_img}
                alt="Profile Banner"
              />
              <div className={styles.profileAvatarSectEdit}>
                <div>
                  <img
                    src={profile?.avatar_url}
                    alt=""
                    className={styles.profileAvatarEdit}
                  />
                </div>
                <button
                  onClick={() => setOpenModal(true)}
                  className={styles.editBtnNo}
                >
                  Edit Profile
                </button>
              </div>
              <div className={styles.profile}>
                <label htmlFor="editName">Name</label>
                <input
                  className={styles.profileNameEdit}
                  type="text"
                  value={profile?.full_name}
                  id="editName"
                />
                <label htmlFor="editName">Username</label>
                <input
                  className={styles.profileUsernameEdit}
                  type="text"
                  value={profile?.username}
                  id="editUsername"
                />
                <label htmlFor="editName">Bio</label>
                <input
                  className={styles.profileBioEdit}
                  type="text"
                  value={profile?.bio}
                  id="editBio"
                  max={140}
                />
                <label htmlFor="editName">Location</label>
                <input
                  className={styles.profileLocEdit}
                  type="text"
                  value={profile?.location}
                  id="editLoc"
                />
              </div>
            </div>
          }
          footer={<button className={`primary ${styles.doneBtn}`}>Done</button>}
          closeModal={setOpenModal}
        />
      )}
    </>
  );
};

export default Profile;
