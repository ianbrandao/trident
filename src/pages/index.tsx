import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

const imageSources = [
  '/led_contador.png',
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const [showImageContainer, setShowImageContainer] = useState(false);

  useEffect(() => {
    if (counter >= 5) {
      setShowImageContainer(true);
      setCurrentIndex(0); // Start with the first image when image container appears
    } else {
      setShowImageContainer(false);
    }
  }, [counter]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let imageInterval: NodeJS.Timeout | null = null; // Explicitly specify the type

    if (showImageContainer) {
      setCurrentIndex(0); // Reset to the first image when the container appears
      imageInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSources.length);
      }, 5000);
    }

    return () => {
      if (imageInterval !== null) {
        clearInterval(imageInterval); // Clear the interval when the component unmounts or when showImageContainer changes
      }
    };
  }, [showImageContainer]);

  return (
    <>
      <Head>
        <title>Trident</title>
        <meta name="description" content="Trident" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/* {showImageContainer ? (
          <div className={styles.center}>
            <Image
              className={styles.logo}
              src={imageSources[currentIndex]}
              alt="Contador"
              width={336}
              height={168}
              priority
            />
          </div>
        ) : (
          <div className={styles.counterBox}>
            <div className={styles.counterNumber}>{counter}</div>
          </div>
        )} */}
        <div className={styles.center}>
            <Image
              className={styles.logo}
              src={imageSources[currentIndex]}
              alt="Contador"
              width={336}
              height={168}
              priority
            />
          </div>
      </main>
    </>
  );
}
