import React from 'react';
import styles from './Modal.module.scss';

const Modal = ({ active, setActive, children, modalData }) => {
  const getNormDate = (fullDate) => {
    const date = new Date(fullDate);
    const myDate = `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`;
    return myDate;
  };
  return (
    <div
      className={active ? styles.modal_active : styles.modal}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? styles.modal_content_active : styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <img className={styles.resize} src={modalData.image} alt="" />
            <h4>{modalData.title}</h4>
            <p>({modalData.category} category)</p>
          </div>

          <p>{modalData.description}</p>

          <div className={styles.footer}>
            <h5>Date: {getNormDate(modalData.date)}</h5>
            <h6>Likes: {modalData.likesNumber}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
