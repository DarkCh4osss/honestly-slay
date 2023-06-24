import React, { RefObject, useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faEllipsis,
  faEnvelope,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { profile } from "console";
import Link from "next/link";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  const [profile, setProfile] = useState(null);
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
            <a>
              <FontAwesomeIcon icon={faEllipsis} /> More
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
