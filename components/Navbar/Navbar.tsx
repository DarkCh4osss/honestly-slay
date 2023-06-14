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
import { useState } from "react";

interface Props {
  // username: string;
}

const Navbar: React.FC<Props> = ({}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDisplay, setOpenModalDisplay] = useState(false);

  const supabase = useSupabaseClient();
  const session = useSession();

  async function logout() {
    await supabase.auth.signOut();
  }

  return (
    <>
      <nav className={styles.nav}>
        <h1>Honestly, Slay</h1>
        <ul className={styles.navLinks}>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faHouse} /> Home
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faBell} /> Notifications
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faEnvelope} /> Messages
            </a>
          </li>
          <li>
            <a href="../../profile">
              <FontAwesomeIcon icon={faUser} /> Profile
            </a>
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
