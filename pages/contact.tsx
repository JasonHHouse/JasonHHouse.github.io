import Head from 'next/head';
import Header from './common/Header';
import Footer from './common/Footer';
import styles from './contact.module.css';

function Contact() {
  return (
    <div>
      <Head>
        <title>Contact - Jason House</title>
        <meta name="description" content="Get in touch with Jason House for leadership coaching, mentorship, and professional development opportunities." />
      </Head>
      <Header />
      <div className="container top-margin">
        <h2>Contact Me</h2>
        <br />
        <p>
          <a href="mailto:jh5975@gmail.com" className={styles.contactLink}>
            Email: jh5975@gmail.com
          </a>
        </p>
        <p>
          <a href="https://www.linkedin.com/in/jason-h-91181728/" className={styles.contactLink}>
            LinkedIn: linkedin.com/in/jason-h-91181728/
          </a>
        </p>
        <p>
          <a href="https://github.com/JasonHHouse" className={styles.contactLink}>
            GitHub: github.com/JasonHHouse
          </a>
        </p>
        <br />
        <div className="footer">
          Feel free to reach out!
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;