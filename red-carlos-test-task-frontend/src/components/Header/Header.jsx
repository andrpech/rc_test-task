import { React, useEffect, useState } from 'react';
import logoImage from '../../assets/img/red-carlos.png';
import axios from 'axios';
import styles from './Header.module.scss';
import Modal from '../Modal/Modal';

// import News from '../News/News';
// const news = new News();

const Header = ({ setAbr }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const [card, setCardData] = useState({});

  useEffect(() => {
    setLoading(true);

    const fetchRandom = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/news/random`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });
        console.log(data);

        setCardData(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchRandom();
  }, [modalActive]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/news/`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  // const handleClick = async (data) => {
  //   loadStories(data);
  //   console.log('значение this:', this);
  // };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={logoImage} alt="" height="50" />
          <button
            onClick={() => {
              setModalActive(true);
            }}
          >
            Random
          </button>
        </div>
        {loading && 'Loading...'}
        <div className={styles.wrapper}>
          <ul className={styles.menu}>
            {categories.map((item, index) => (
              <li key={`button index ${index}`}>
                <button
                  className={styles.buttons}
                  onClick={() => setAbr(item.abr)}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        modalData={card}
      ></Modal>
    </div>
  );
};

export default Header;
