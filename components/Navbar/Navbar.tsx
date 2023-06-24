import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCircleQuestion,
  faEllipsis,
  faEnvelope,
  faGears,
  faHouse,
  faPenToSquare,
  faUser,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal";
import ToggleMode from "../ToggleMode/ToggleMode";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/img/logo.png";

interface Props {
  // username: string;
}

const Navbar: React.FC<Props> = ({}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDisplay, setOpenModalDisplay] = useState(false);
  const [profile, setProfile] = useState(null);

  const supabase = useSupabaseClient();
  const session = useSession();

  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }
    supabase
      .from("profiles")
      .select()
      .eq("id", session.user.id)
      .then((result: any) => {
        if (result.data.length) {
          setProfile(result.data[0]);
        }
      });
  }, [session?.user?.id]);

  async function logout() {
    await supabase.auth.signOut();
  }

  return (
    <>
      <nav className={styles.nav}>
        <h1>honestly, slay</h1>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/">
              <FontAwesomeIcon icon={faHouse} /> Home
            </Link>
          </li>
          <li>
            {/* <a href={"profile/" + "profile?.id"}>
              
            </a> */}
            <Link href={``}>
              <FontAwesomeIcon icon={faBell} /> Notifications
            </Link>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faEnvelope} /> Messages
            </a>
          </li>
          <li>
            <Link href={`profile/${profile?.id}`}>
              <FontAwesomeIcon icon={faUser} /> Profile
            </Link>
          </li>
          <li>
            <a onClick={() => setOpenModal(true)}>
              <FontAwesomeIcon icon={faEllipsis} /> More
            </a>
          </li>
          <li>
            <button className={`primary ${styles.postBtn}`}>Post!</button>
          </li>
          <li>
            <button className={`primary`} onClick={logout}>
              Temp logout
            </button>
          </li>
        </ul>
        <ul className={`${styles.navLinks} ${styles.navResponsive}`}>
          <li>
            <Link href="/">
              <FontAwesomeIcon icon={faHouse} />
            </Link>
          </li>
          <li>
            <Link href={``}>
              <FontAwesomeIcon icon={faBell} />
            </Link>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </li>
          <li>
            <Link href={`profile/${profile?.id}`}>
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </li>
          <li>
            <a onClick={() => setOpenModal(true)}>
              <FontAwesomeIcon icon={faEllipsis} />
            </a>
          </li>
        </ul>
      </nav>
      {openModal && (
        <Modal
          title="More"
          content={
            <ul className={styles.moreLinks}>
              <li>
                <a>
                  <FontAwesomeIcon icon={faGears} /> Settings
                </a>
              </li>
              <li>
                <a>
                  <FontAwesomeIcon icon={faUserSecret} /> Privacy
                </a>
              </li>
              <li>
                <a>
                  <FontAwesomeIcon icon={faCircleQuestion} /> Help
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setOpenModal(false);
                    setOpenModalDisplay(true);
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} /> Display
                </a>
              </li>
            </ul>
          }
          footer={<button className={`primary ${styles.doneBtn}`}>Done</button>}
          closeModal={setOpenModal}
        />
      )}
      {openModalDisplay && (
        <Modal
          title="Display"
          content={"A"}
          footer={<button className={`primary ${styles.doneBtn}`}>Done</button>}
          closeModal={setOpenModalDisplay}
        />
      )}
    </>
  );
};

export default Navbar;
