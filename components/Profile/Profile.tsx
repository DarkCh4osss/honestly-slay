import { faLocationDot, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import styles from "./Profile.module.css";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { SupabaseClient, Session } from "@supabase/supabase-js";
import PostCard from "../PostCard/PostCard";
import Modal from "../Modal/Modal";
import { faImages } from "@fortawesome/free-regular-svg-icons";

interface Props {
  profile: any;
}

const Profile: React.FC<Props> = ({ profile }) => {
  const supabase: SupabaseClient = useSupabaseClient();
  const session: Session = useSession()!;
  const [posts, setPosts] = useState<any>(null);

  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newLoc, setNewLoc] = useState("");
  const [newCover, setNewCover] = useState("");

  const [openModal, setOpenModal] = useState(false);

  async function loadPosts() {
    const posts = await fetchPost(profile?.id);
    setPosts(posts);
  }

  async function fetchPost(userId: any) {
    console.log(userId);
    const { data } = await supabase
      .from("posts")
      .select("id, content, photos, created_at, author")
      .eq("author", userId)
      .order("created_at", { ascending: false });
    return data;
  }

  function editProfile() {
    console.log(newBio);
    supabase
      .from("profiles")
      .update({
        full_name: newName.length > 0 ? newName : profile?.full_name,
        username: newUsername.length > 0 ? newUsername : profile?.username,
        bio: newBio.length > 0 ? newBio : profile?.bio,
        location: newLoc.length > 0 ? newLoc : profile?.loc,
      })
      .eq("id", session?.user.id)
      .then((res) => {
        if (!res.error) {
          window.location.reload();
        }
      });
  }

  async function updateCover(ev: any) {
    const file = ev.target.files?.[0];
    if (file) {
      const newName = Date.now() + file.name;
      const { data, error } = await supabase.storage
        .from("covers")
        .upload(newName, file);

      if (data) {
        const url =
          process.env.NEXT_PUBLIC_SUPABASE_URL +
          "/storage/v1/object/public/covers/" +
          data.path;
        supabase
          .from("profiles")
          .update({ cover_img: url })
          .eq("id", session?.user.id)
          .then((res) => {
            if (!res.error) {
              // window.location.reload();
            }
          });
      }
    }
  }

  useEffect(() => {
    loadPosts().then(() => {});
  }, []);

  useEffect(() => {
    if (openModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [openModal]);

  const isMyUser = profile?.id === session?.user?.id;

  return (
    <>
      <div>
        <Header title={profile?.full_name} />
      </div>
      <div
        onLoad={() => {
          console.log(profile?.id);
          loadPosts().then(() => {});
        }}
        className={styles.profileInfo}
      >
        <div className={styles.bannerContainer}>
          <img
            className={styles.profileBanner}
            src={profile?.cover_img}
            alt="Profile Banner"
          />
        </div>
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
      {posts?.length > 0 &&
        posts.map((post: any) => (
          <PostCard key={post.id} {...post} profiles={profile} />
        ))}
      {openModal && (
        <Modal
          title="Edit Profile"
          content={
            <div className={styles.profileInfoEdit}>
              <div className={styles.bannerEditContainer}>
                <div className={styles.bannerWrap}>
                  <img
                    className={styles.profileBannerEdit}
                    src={newCover ? newCover : profile?.cover_img}
                    alt="Profile Banner"
                  />
                  <div className={styles.bannerOverlay}>
                    <ul>
                      <li>
                        <label htmlFor="addPhoto">
                          <FontAwesomeIcon icon={faImages} />
                          <input
                            id="addPhoto"
                            multiple
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              setNewCover(e.target.src);
                              updateCover(e);
                            }}
                          />
                        </label>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faX} />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.profileAvatarSectEdit}>
                <div className={styles.avatarWrap}>
                  <img
                    src={profile?.avatar_url}
                    alt=""
                    className={styles.profileAvatarEdit}
                  />
                  <div className={styles.avatarOverlay}>
                    <ul>
                      <li>
                        <FontAwesomeIcon icon={faImages} />
                      </li>
                    </ul>
                  </div>
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
                  defaultValue={profile?.full_name}
                  id="editName"
                  onChange={(e) => setNewName(e.target.value)}
                />
                <label htmlFor="editName">Username</label>
                <input
                  className={styles.profileUsernameEdit}
                  type="text"
                  defaultValue={profile?.username}
                  id="editUsername"
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <label htmlFor="editName">Bio</label>
                <input
                  className={styles.profileBioEdit}
                  type="text"
                  defaultValue={profile?.bio}
                  id="editBio"
                  max={160}
                  onChange={(e) => setNewBio(e.target.value)}
                />
                <label htmlFor="editName">Location</label>
                <input
                  className={styles.profileLocEdit}
                  type="text"
                  defaultValue={profile?.location}
                  id="editLoc"
                  onChange={(e) => setNewLoc(e.target.value)}
                />
              </div>
            </div>
          }
          footer={
            <div>
              <button
                onClick={editProfile}
                className={`primary ${styles.doneBtn}`}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
                className={`cancel ${styles.cancelBtn}`}
              >
                Cancel
              </button>
            </div>
          }
          closeModal={setOpenModal}
        />
      )}
    </>
  );
};

export default Profile;
