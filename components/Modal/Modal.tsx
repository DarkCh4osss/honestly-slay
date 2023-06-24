import styles from "./Modal.module.css";

interface Props {
  title: string;
  content: any;
  footer: JSX.Element | undefined;
  closeModal: Function;
}

const Modal: React.FC<Props> = ({ title, content, footer, closeModal }) => {
  return (
    <div className={styles.fixedModal}>
      <div className={styles.modalBg}>
        <div className={styles.modalContainer}>
          <div className={styles.title}>
            <span onClick={() => closeModal(false)}>X</span> {title}
          </div>
          <div className={styles.content}>{content}</div>
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
