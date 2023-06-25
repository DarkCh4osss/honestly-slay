import { UserContext } from "@/contexts/UserContext";
import {
  faBookmark,
  faHeart,
  faMessage,
  faPaperPlane,
  faShareFromSquare,
  faTrash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import Modal from "../Modal/Modal";
import styles from "./PostCard.module.css";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";

interface Profile {
  id: string;
}

interface Props {
  id: any;
  content: any;
  created_at: any;
  profiles: any;
  photos: any;
  onDelete: Function;
}

const PostCard: React.FC<Props> = ({
  id,
  content,
  created_at,
  photos,
  profiles: profile,
  onDelete,
}) => {
  // const { profile: myProfile } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);
  const [media, setMedia] = useState();
  const [myProfile, setProfile] = useState<Profile>();
  const [focus, setFocus] = useState(false);

  const [likes, setLikes] = useState<any>();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<any>();
  const [isSaved, setIsSaved] = useState(false);

  const isMyPost = profile?.id === myProfile?.id ? true : false;

  const supabase = useSupabaseClient();
  const session = useSession();

  useEffect(() => {
    if (!session?.user.id) {
      return;
    }
    fetchUser();
    fetchLikes();
    fetchComments();
    if (session?.user.id) fetchIsSaved();
  }, [session?.user.id]);

  function fetchUser() {
    supabase
      .from("profiles")
      .select()
      .eq("id", session?.user.id)
      .then((result: any) => {
        if (result.error) {
          // throw rcomment.profiles.avatar_urlsult.error;
        }
        if (result.data) {
          setProfile(result.data[0]);
        }
      });
  }

  function fetchLikes() {
    supabase
      .from("likes")
      .select()
      .eq("post_id", id)
      .then((result) => setLikes(result.data));
  }

  function fetchComments() {
    supabase
      .from("posts")
      .select("*, profiles(*)")
      .eq("parent", id)
      .then((result) => setComments(result.data));
  }

  function fetchIsSaved() {
    supabase
      .from("saved_posts")
      .select()
      .eq("post_id", id)
      .eq("user_id", session?.user.id)
      .then((result: any) => {
        if (result.data?.length > 0) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      });
  }

  const isLikedByMe = likes?.find(
    (like: any) => like.user_id === myProfile?.id
  );

  function toggleLike() {
    if (isLikedByMe) {
      supabase
        .from("likes")
        .delete()
        .eq("post_id", id)
        .eq("user_id", myProfile?.id)
        .then(() => {
          alert("Il like al post e' stato rimosso!");
          fetchLikes();
        });
      return;
    }
    supabase
      .from("likes")
      .insert({
        post_id: id,
        user_id: myProfile?.id,
      })
      .then((result) => {
        alert("Hai messo like al post!");
        fetchLikes();
      });
  }

  function postComment(ev: any) {
    ev.preventDefault();
    supabase
      .from("posts")
      .insert({ content: commentText, author: myProfile?.id, parent: id })
      .then((res) => {
        fetchComments();
        setCommentText("");
      });
  }

  function savePost() {
    if (isSaved) {
      supabase
        .from("saved_posts")
        .delete()
        .eq("post_id", id)
        .eq("user_id", myProfile?.id)
        .then((result) => {
          setIsSaved(false);
        });
    }
    if (!isSaved) {
      supabase
        .from("saved_posts")
        .insert({
          user_id: myProfile?.id,
          post_id: id,
        })
        .then((result) => {
          setIsSaved(true);
        });
    }
  }

  function deletePost() {
    supabase
      .from("posts")
      .delete()
      .eq("id", id)
      .then((res) => {
        alert("This post has been deleted.");
        onDelete();
      });
  }

  return (
    <>
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
                    <img
                      src={photo}
                      alt={photo}
                      onClick={() => {
                        setOpenMedia(true);
                        setMedia(photo);
                      }}
                    />
                  </div>
                ))}
            </div>
          )}
          <div className={styles.cardAction}>
            <ul>
              <li className={styles.likeBtn} onClick={toggleLike}>
                <FontAwesomeIcon
                  icon={faHeart}
                  className={isLikedByMe ? styles.liked : ""}
                />{" "}
                {likes?.length}
              </li>
              <li
                onClick={() => setOpenComments(true)}
                className={styles.commentBtn}
              >
                <FontAwesomeIcon icon={faMessage} /> {comments?.length}
              </li>
              <li className={styles.shareBtn}>
                <FontAwesomeIcon icon={faShareFromSquare} /> 0
              </li>
            </ul>
          </div>
        </div>
      </div>

      {openMedia && (
        <Modal
          title={""}
          content={<img className={styles.openMedia} src={media} alt="Media" />}
          footer={undefined}
          closeModal={setOpenMedia}
        />
      )}

      {openComments && (
        <Modal
          title={"Comments"}
          content={
            <ul className={styles.commentsList}>
              {comments?.length > 0 &&
                comments?.map((comment: any) => (
                  <li key={comment.id}>
                    <img
                      src={comment.profiles.avatar_url}
                      alt="Comment avatar"
                      width={40}
                      height={40}
                    />
                    <div className={styles.commentTextSect}>
                      <p>
                        {comment.profiles.full_name} -{" "}
                        <span>@{comment.profiles.username} •</span>{" "}
                        <ReactTimeAgo
                          date={new Date(comment.created_at).getTime()}
                        />{" "}
                      </p>
                      <p>{comment.content}</p>
                    </div>
                  </li>
                ))}
            </ul>
          }
          footer={
            <form
              onSubmit={(e) => postComment(e)}
              className={`${styles.commentBar} ${
                focus ? styles.commentBarActive : ""
              }`}
            >
              <input
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                type="text"
                placeholder="Comment"
                className={focus ? styles.inpActive : ""}
                value={commentText}
                onChange={(ev) => setCommentText(ev.target.value)}
              />
              <FontAwesomeIcon
                className={styles.sendComment}
                icon={faPaperPlane}
                onClick={postComment}
              />
            </form>
          }
          closeModal={setOpenComments}
        />
      )}

      {openModal && (
        <Modal
          title={""}
          content={
            <ul className={styles.moreLinks}>
              <li onClick={savePost}>
                <a>
                  <FontAwesomeIcon icon={faBookmark} />{" "}
                  {isSaved ? "Remove from saved" : "Save post"}
                </a>
              </li>
              {isMyPost && (
                <li>
                  <a onClick={deletePost}>
                    <FontAwesomeIcon icon={faTrash} /> Delete post
                  </a>
                </li>
              )}
              <li>
                <a>
                  <FontAwesomeIcon icon={faTriangleExclamation} /> Report
                </a>
              </li>
            </ul>
          }
          footer={undefined}
          closeModal={setOpenModal}
        />
      )}
    </>
  );
};

export default PostCard;
