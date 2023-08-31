import { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import axios from 'axios';
import { randomInt } from 'crypto';

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
      const response = await axios.get(`http://127.0.0.1:3001/trigger?count=${newCount}`);
      handlePublicationCountUpdate(newCount);

      // Dispatch the adminUpdate event with the new count as detail
      const event = new CustomEvent('adminUpdate', { detail: newCount });
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Error triggering update:', error);
    }
  };

  const pause = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://127.0.0.1:3001/trigger-button?text=pause`);

      // Dispatch the adminUpdate event with the new count as detail
      const customEvent = new CustomEvent('pause', { detail: response });
      window.dispatchEvent(customEvent);
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
