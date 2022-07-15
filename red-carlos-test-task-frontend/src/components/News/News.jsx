import { React, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './News.module.scss';
import Modal from '../Modal/Modal';
import Header from '../Header/Header';

const News = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const [abr, setCategoryAbr] = useState('');
  const [card, setCardData] = useState({});

  useEffect(() => {
    setLoading(true);

    const fetchStories = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/news/${abr}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });
        console.log(data);

        setStories(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchStories('sport');
  }, [abr]);

  const getNormDate = (fullDate) => {
    const date = new Date(fullDate);
    const myDate = `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`;
    return myDate;
  };

  return (
    <div>
      <Header setAbr={setCategoryAbr} />
      <div>
        <h1>Stories</h1>

        {abr === '' ? (
          <h3>Please choose any category to display news</h3>
        ) : (
          <div className={styles.wrapper}>
            {loading && stories[0].title
              ? 'Loading...'
              : stories.map((story, index) => (
                  <div key={index} className={styles.stories}>
                    <div className={styles.head}>
                      <img className={styles.resize} src={story.image} alt="" />
                      <h4>{story.title}</h4>
                      <p>({story.category} category)</p>
                    </div>

                    <p>{story.shortDescription}</p>

                    <div className={styles.footer}>
                      <h5>Date: {getNormDate(story.date)}</h5>
                      <h6>Likes: {story.likesNumber}</h6>
                    </div>

                    <div className={styles.read}>
                      <button
                        onClick={() => {
                          setCardData(story);
                          setModalActive(true);
                        }}
                      >
                        Read now
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        )}

        <Modal
          active={modalActive}
          setActive={setModalActive}
          modalData={card}
        ></Modal>
      </div>
    </div>
  );
};

export default News;
