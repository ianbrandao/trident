import { useState } from 'react';
import { useRouter } from 'next/router'; // Import the useRouter hook
import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

export default function LoginPage() {
  const router = useRouter(); // Initialize the useRouter hook

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const correctUsername = 'admin';
    const correctPassword = 'admin';

    if (username === correctUsername && password === correctPassword) {
      console.log('Logged in successfully');
      setLoginError(false);

      // Redirect to the admin page
      router.push('/admin'); // Replace with the correct path to your admin page
    } else {
      setLoginError(true);
    }
  };

  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta name="description" content="Login Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.loginMain}>
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
        <p className={styles.loginText}>Entre com usuário e senha</p>
        <form className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <input
              className={styles.inputForm}
              placeholder='Usuário'
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              className={styles.inputForm}
              placeholder='Senha'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={styles.loginButton} onClick={handleLogin}>
            Entrar
          </button>
          {loginError && <p className={styles.errorMessage}>Credenciais inválidas. Tente novamente.</p>}
        </form>
      </main>
    </>
  );
}
