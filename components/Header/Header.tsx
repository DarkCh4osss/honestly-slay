import React, { RefObject, useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
  faBell,
  faBookmark,
  faCircleInfo,
  faCircleQuestion,
  faEllipsis,
  faEnvelope,
  faGears,
  faHouse,
  faPenToSquare,
  faUser,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import { profile } from "console";
import Link from "next/link";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import Modal from "../Modal/Modal";
import ToggleMode from "../ToggleMode/ToggleMode";

interface Props {
  title: string;
}

interface Profile {
  id: string;
}

const Header: React.FC<Props> = ({ title }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDisplay, setOpenModalDisplay] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [profile, setProfile] = useState<Profile>();
  const supabase = useSupabaseClient();
  const session = useSession();

  useEffect(() => {
    if (!session?.user.id) {
      return;
    }
    fetchUser();
  }, [session?.user.id]);

  function fetchUser() {
    supabase
      .from("profiles")
      .select()
      .eq("id", session?.user.id)
      .then((result: any) => {
        if (result.error) {
          throw result.error;
        }
        if (result.data) {
          setProfile(result.data[0]);
        }
      });
  }

  const navRef = useRef<HTMLElement>();
  const showNavbar = () => {
    navRef.current?.classList.toggle(styles.responsive_nav);
  };

  async function logout() {
    await supabase.auth.signOut();
  }

  return (
    <>
      <header className={styles.headerSect}>
        <h3>{title}</h3>
        <div className={styles.burger}>
          <FontAwesomeIcon icon={faBars} onClick={showNavbar} />
        </div>
      </header>
      <nav className={styles.nav} ref={navRef as RefObject<HTMLElement>}>
        <h1>honestly, slay</h1>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/">
              <FontAwesomeIcon icon={faHouse} /> Home
            </Link>
          </li>
          <li>
            <Link href={`/saved`}>
              <FontAwesomeIcon icon={faBookmark} /> Saved
            </Link>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faEnvelope} /> Messages
            </a>
          </li>
          <li>
            <Link href={`/profile/${profile?.id}`}>
              <FontAwesomeIcon icon={faUser} /> Profile
            </Link>
          </li>
          <li>
            <a onClick={() => setOpenModal(true)}>
              <FontAwesomeIcon icon={faEllipsis} /> More
            </a>
          </li>
          <li>
            <a onClick={logout}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
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
              <li>
                <a
                  onClick={() => {
                    setOpenModal(false);
                    setOpenModalInfo(true);
                  }}
                >
                  <FontAwesomeIcon icon={faCircleInfo} /> Info
                </a>
              </li>
              <li>
                <a onClick={logout}>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
                </a>
              </li>
            </ul>
          }
          footer={undefined}
          closeModal={setOpenModal}
        />
      )}
      {openModalDisplay && (
        <Modal
          title="Display - Light/Dark mode"
          content={<ToggleMode />}
          footer={
            <button
              onClick={() => {
                setOpenModalDisplay(false);
                setOpenModal(true);
              }}
              className={`primary ${styles.doneBtn}`}
            >
              Done
            </button>
          }
          closeModal={setOpenModalDisplay}
        />
      )}
      {openModalInfo && (
        <Modal
          title="Info"
          content={
            <div>
              <strong>honestly, slay</strong> is a social network made by a drag
              queen, for drag queens. <br /> Its scope is to promote italian's
              drag art. <br />
              <br />
              Made by{" "}
              <a className={styles.info} href="https://fabiogrimaldi.dev/">
                Fabio Grimaldi{" "}
              </a>
              <a
                className={styles.info}
                href="https://www.instagram.com/angeli.que__/"
              >
                (Angeli Que)
              </a>
            </div>
          }
          footer={
            <button
              onClick={() => {
                setOpenModalInfo(false);
                setOpenModal(true);
              }}
              className={`primary ${styles.doneBtn}`}
            >
              Done
            </button>
          }
          closeModal={setOpenModalInfo}
        />
      )}
    </>
  );
};

export default Header;
