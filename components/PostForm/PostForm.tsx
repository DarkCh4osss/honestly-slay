import React, { useState } from "react";
import styles from "./PostForm.module.css";
import DefaultPfp from "../../public/img/default-pfp.jpg";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faImage } from "@fortawesome/free-solid-svg-icons";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const PostForm = () => {
  const [content, setContent] = useState("");
  const [uploads, setUploads] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const supabase = useSupabaseClient();
  const session = useSession();

  function createPost() {
    supabase
      .from("posts")
      .insert({
        author: session!.user.id,
        content,
      })
      .then((response) => {
        if (!response.error) {
          setContent("");
          setUploads([]);
        }
      });
  }

  return (
    <div className={`${styles.formContainer}`}>
      <Image
        className={`${styles.pfpImage}`}
        src={DefaultPfp}
        alt="Default Pfp"
      />
      <div className={`${styles.postDetails}`}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          placeholder="What's happening?!"
        />
        <div className={styles.formAction}>
          <ul>
            <li>
              <FontAwesomeIcon icon={faImage} />
            </li>
            <li>
              <FontAwesomeIcon icon={faFaceSmile} />
            </li>
          </ul>
          <button onClick={createPost} className="primary">
            Post!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
