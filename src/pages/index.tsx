import { SetStateAction, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

let imageSources = ["/led_destravado.png", "/led_paused.png"];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const [showImageContainer, setShowImageContainer] = useState(false);
  const [countdownInterval, setCountdownInterval] =
    useState<NodeJS.Timeout | null>(null);
  const [imageInterval, setImageInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    if (counter) {
      setShowImageContainer(false);
    } else {
      setShowImageContainer(true);
      setCurrentIndex(0); // Start with the first image when the image container appears
    }
  }, [counter]);

  useEffect(() => {
    if (counter > 0) {
      const interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);

      setCountdownInterval(interval);

      return () => {
        clearInterval(interval);
      };
    } else {
      setCounter(0);
      setCountdownInterval(null);
    }
  }, [counter]);

  // useEffect(() => {
  //   let imageInterval: NodeJS.Timeout | null = null;

  //   if (showImageContainer) {
  //     setCurrentIndex(0); // Reset to the first image when the container appears
  //     imageInterval = setInterval(() => {
  //       setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSources.length);
  //     }, 5000);

  //     setImageInterval(imageInterval);
  //   } else {
  //     setImageInterval(null);
  //   }

  //   return () => {
  //     if (imageInterval !== null) {
  //       clearInterval(imageInterval);
  //     }
  //   };
  // }, [showImageContainer]);

  // Function to receive the counter value from an event
  const receiveCounter = (newCounter: SetStateAction<number>) => {
    setCounter(newCounter);
  };

  useEffect(() => {
    const eventSource = new EventSource(`https://trident-server.vercel.app/admin-updates`);

    eventSource.onmessage = (event: { data: string }) => {
      console.log(event);
      // Handle the incoming event data
      // For example, you can extract the newCount from the event data
      const newCount = parseInt(event.data);

      // Update the counter state with the newCount
      setCounter(newCount);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    const eventPause = new EventSource(`https://trident-server.vercel.app/pause`);

    eventPause.onmessage = (event: { data: string }) => {
      console.log(event);
      setShowImageContainer(true);
      setCurrentIndex(1); // Set the image index to the paused image index

      if (countdownInterval) {
        clearInterval(countdownInterval);
      }

      if (imageInterval) {
        clearInterval(imageInterval);
      }
    };

    return () => {
      eventPause.close();
    };
  }, [countdownInterval, imageInterval]);

  useEffect(() => {
    const handleAdminUpdate: EventListener = (event: Event) => {
      const newCount = (event as CustomEvent<number>).detail;
      setCounter(newCount);
    };

    window.addEventListener("adminUpdate", handleAdminUpdate);

    return () => {
      window.removeEventListener("adminUpdate", handleAdminUpdate);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Trident</title>
        <meta name="description" content="Trident" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {showImageContainer ? (
          <div className={styles.center}>
            <Image
              className={styles.logo}
              src={imageSources[currentIndex]} // Use the paused image source
              alt="Paused"
              width={336}
              height={168}
              priority
            />
          </div>
        ) : (
          <div className={styles.counterBox}>
            <p className={styles.counterNumber}>{counter}</p>
          </div>
        )}
      </main>
    </>
  );
}
