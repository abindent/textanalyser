// DEFAULTS
import Link from "next/link";

// STYLE
import styles from "./css/footer.module.css";

// MUI ICONS
import { CallIcon, HomeIcon, PersonIcon } from "@/icon";

// FONTAWESOME ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faGithub,
  faInstagram,
  faLinkedin,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer ()  {
  return (
    <footer className={styles.footer}>
      <div className={styles._footer_row}>
        <div className={styles._footer_col}>
          <img
            srcSet="/icon.png"
            className={styles._footer_logo}
            alt="favicon"
          />
          <p>
          Just wanna to analyse your text? Come here and start analysing.
          </p>
        </div>
        <div className={styles._footer_col}>
          <h3>
            ADDRESS{" "}
            <div className={styles._underline_animation}>
              <span />
            </div>
          </h3>
          <p>Sarat Ava</p>
          <p>Senpara, Jalpaiguri</p>
          <p>West Bengal, PIN 735101, India</p>
          <p className="_footer_email">onotes@techie.com</p>
          <h4>+91 - 9883105019</h4>
        </div>
        <div className={styles._footer_col}>
          <h3>
            LINKS{" "}
            <div className={styles._underline_animation}>
              <span />
            </div>
          </h3>
          <ul>
            <li>
              <Link className={styles._wrapper_links} href="/">
                <HomeIcon />
                <p style={{ marginTop: "3px" }}>&nbsp;HOME</p>
              </Link>
            </li>
            <li>
              <Link className={styles._wrapper_links} href="/about">
                <PersonIcon />
                <p style={{ marginTop: "3px" }}>&nbsp;ABOUT</p>
              </Link>
            </li>
            <li>
              <Link className={styles._wrapper_links} href="/contact">
                <CallIcon />
                <p style={{ marginTop: "3px" }}>&nbsp;CONTACT</p>
              </Link>
            </li>
            
          </ul>
        </div>
        <div className={styles._footer_col}>
          <h3>
            SOCIAL LINKS
            <div className={styles._underline_animation}>
              <span />
            </div>
          </h3>
          <ul>
            <li>
              <Link href="https://www.linkedin.com/in/sinchan-maitra-22a303217/">
                <FontAwesomeIcon
                  className={styles._footer_social_icons}
                  icon={faLinkedin}
                />
              </Link>
            </li>
            <li>
              <Link href="https://in.pinterest.com/maitrababai2007/">
                <FontAwesomeIcon
                  className={styles._footer_social_icons}
                  icon={faPinterest}
                />
              </Link>
            </li>
            <li>
              <Link href="https://discord.io/OpenSourceGames">
                <FontAwesomeIcon
                  className={styles._footer_social_icons}
                  icon={faDiscord}
                />
              </Link>
            </li>
            <li>
              <Link href="https://github.com/abindent">
                <FontAwesomeIcon
                  className={styles._footer_social_icons}
                  icon={faGithub}
                />
              </Link>
            </li>
            <li>
              <Link href="https://instagram.com/itz_abindent_xtreme">
                <FontAwesomeIcon
                  className={styles._footer_social_icons}
                  icon={faInstagram}
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <hr className={styles._footer_hr} />
      <p className={styles._footer_copyright_}>
        TextAnalyser by OpenSourceCodes © {new Date().getFullYear()} - All Rights Reserved
      </p>
    </footer>
  );
};