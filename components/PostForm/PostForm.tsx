import React, { useEffect, useState } from "react";
import styles from "./PostForm.module.css";
import DefaultPfp from "../../public/img/default-pfp.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faImage } from "@fortawesome/free-solid-svg-icons";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { BounceLoader } from "react-spinners";

interface Props {
  onPost: Function;
}

const PostForm: React.FC<Props> = ({ onPost }) => {
  const [content, setContent] = useState("");
  const [uploads, setUploads] = useState<any[]>([]);
  const [profile, setProfile] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const supabase = useSupabaseClient();
  const session = useSession();

  useEffect(() => {
    supabase
      .from("profiles")
      .select()
      .eq("id", session!.user.id)
      .then((result: any) => {
        if (result.data.length) {
          setProfile(result.data[0]);
          setProfilePic(result.data[0].avatar_url);
        }
      });
  }, []);

  function createPost() {
    supabase
      .from("posts")
      .insert({
        author: session!.user.id,
        content,
        photos: uploads,
      })
      .then((response) => {
        if (!response.error) {
          setContent("");
          setUploads([]);
          if (onPost) {
            onPost();
          }
        }
      });
  }

  async function addPhotos(ev: any) {
    const files = ev.target.files;
    if (files.length > 0) {
      setIsUploading(true);
      for (const file of files) {
        const newName = Date.now() + file.name;
        const res = await supabase.storage.from("photos").upload(newName, file);
        if (res.data) {
          const url =
            process.env.NEXT_PUBLIC_SUPABASE_URL +
            "/storage/v1/object/public/photos/" +
            res.data.path;
          setUploads((prevUploads) => [...prevUploads, url]);
        } else {
          console.log(res);
        }
      }
      setIsUploading(false);
    }
  }

  return (
    <div className={`${styles.formContainer}`}>
      <img
        src={
          profilePic != null ? profilePic : "../../public/img/default-pfp.jpg"
        }
        alt="Profile Picture"
        className={styles.pfpImage}
      />
      <div className={`${styles.postDetails}`}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          placeholder="What's happening?!"
        />
        {isUploading && (
          <div className={styles.loader}>
            <BounceLoader speedMultiplier={2} color={"#ffafcc"} />
          </div>
        )}
        {uploads.length > 0 && (
          <div className={styles.uploadedImgs}>
            {uploads.length > 0 &&
              uploads.map((upload) => (
                <div className={styles.uploadedImg}>
                  <img src={upload} alt="uploaded image" />
                </div>
              ))}
          </div>
        )}
        <div className={styles.formAction}>
          <ul>
            <li>
              <label htmlFor="addPhoto">
                <FontAwesomeIcon icon={faImage} />
                <input
                  id="addPhoto"
                  multiple
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={addPhotos}
                />
              </label>
            </li>
            <li>
              <FontAwesomeIcon icon={faFaceSmile} />
            </li>
          </ul>
          {(content.length > 0 || uploads.length > 0) && (
            <button onClick={createPost} className="primary">
              Post!
            </button>
          )}
          {(content.length < 0 || (content == "" && uploads.length <= 0)) && (
            <button disabled onClick={createPost} className="primary disabled">
              Post!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostForm;
