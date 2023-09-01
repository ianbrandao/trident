import { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import axios from 'axios';

export default function AdminPage() {
  const [publicationCount, setPublicationCount] = useState(0);
  const countInputRef = useRef<HTMLInputElement>(null);

  const handlePublicationCountUpdate = (newCount: number) => {
    setPublicationCount(newCount);
  
    // Send an admin update to the root page
    const event = new CustomEvent('adminUpdate', { detail: newCount });
    window.dispatchEvent(event); // Dispatch the event with the newCount as detail
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newCount = parseInt(countInputRef.current?.value || '0', 10);
  
    try {
      // Make a POST request to trigger the update
      const response = await axios.post('https://trident-server.vercel.app/trigger-button', { text: newCount });
  
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const pause = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('oi');
  
    try {
      const numberOfRequests = 1; // Number of requests you want to send
      const requests = Array.from({ length: numberOfRequests }, () =>
        axios.get(`https://trident-server.vercel.app/trigger-button?text=pause`)
      );
  
      const responses = await Promise.all(requests);
  
      responses.forEach(response => {
        // Dispatch the adminUpdate event with the response data as detail
        const customEvent = new CustomEvent('pause', { detail: response.data });
        window.dispatchEvent(customEvent);
      });
  
      console.log('Responses:', responses.map(response => response.data));
      return responses;
    } catch (error) {
      console.error('Error triggering update:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Page</title>
        <meta name="description" content="Admin Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.adminMain}>
        <Image
          className={styles.logo}
          src="/Group 2.svg" // Replace with your logo image path
          alt="Logo"
          width={92}
          height={59}
        />
        <Image
          className={styles.logo}
          src="/Group 4.svg" // Replace with your logo image path
          alt="Logo"
          width={155}
          height={18}
        />
        <h1 className={styles.adminTitle}>Quantidade de publicações</h1>
        <p className={styles.adminSubtitle}>
          Insira a quantidade de publicações necessárias para destravar o
          brinde.
        </p>
        <form className={styles.adminForm} onSubmit={handleFormSubmit}>
          <div className={styles.adminInputContainer}>
            <input
              className={styles.adminInput}
              type="number"
              placeholder="Enter a number"
              ref={countInputRef}
            />
          </div>
          <div className={styles.adminButtonContainer}>
            <button className={styles.loginButton}>Aplicar</button>
          </div>
        </form>
        <p className={styles.adminTitle}>
          Atenção: ao pressionar o botão aplicar, o countdown será reiniciado
        </p>
        <hr className={styles.adminDivider} />
        <div className={styles.adminFooter}>
          <h1 className={styles.adminRightTitle}>Controle do countdown</h1>
          <div className={styles.adminButtonGroup}>
            <button className={styles.adminButton}>Iniciar Countdown</button>
            <button className={styles.adminButton} onClick={pause}>Tela de espera</button>
          </div>
        </div>
      </main>
    </>
  );
}
