import { UserContext } from "@/contexts/UserContext";
import {
  faBookmark,
  faHeart,
  faMessage,
  faShareFromSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useContext, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import Modal from "../Modal/Modal";
import styles from "./PostCard.module.css";

interface Props {
  id: any;
  content: any;
  created_at: any;
  profiles: any;
  photos: any;
}

const PostCard: React.FC<Props> = ({
  id,
  content,
  created_at,
  photos,
  profiles: profile,
}) => {
  const myProfile = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={`${styles.cardContainer}`}>
      <div className={styles.userInfo}>
        <img
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              "https://dumocrzhnglgqbahzekv.supabase.co/storage/v1/object/public/photos/default-pfp.jpg";
          }}
          src={profile.avatar_url}
          alt="Profile Picture"
          className={styles.pfpImage}
        />
        <div className={styles.usernameInfo}>
          <p className={styles.fullName}>
            <Link href={"/profile/" + profile.id}>{profile.full_name} </Link>
          </p>
          <p className={styles.userName}>
            @{profile.username} •{" "}
            <ReactTimeAgo date={new Date(created_at).getTime()} />{" "}
          </p>
        </div>
        <p className={styles.postMenu} onClick={() => setOpenModal(true)}>
          ...
        </p>
      </div>
      <div className={`${styles.postDetails}`}>
        <p>{content}</p>
        {photos.length > 0 && (
          <div className={styles.postImgs}>
            {photos.length > 0 &&
              photos.map((photo: any) => (
                <div key={photo} className={styles.postImg}>
                  <img src={photo} alt="" />
                </div>
              ))}
          </div>
        )}
        <div className={styles.cardAction}>
          <ul>
            <li className={styles.likeBtn}>
              <FontAwesomeIcon icon={faHeart} />
            </li>
            <li className={styles.commentBtn}>
              <FontAwesomeIcon icon={faMessage} />
            </li>
            <li className={styles.shareBtn}>
              <FontAwesomeIcon icon={faShareFromSquare} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
