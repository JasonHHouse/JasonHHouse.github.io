import { useRouter } from 'next/router';
import Header from './common/Header';
import Footer from './common/Footer';
import SEO from './common/SEO';
import styles from './404.module.css';

export default function Custom404() {
  const router = useRouter();

  return (
    <div>
      <SEO
        title="404 - Page Not Found | Jason House's Leadership Blog"
        description="The page you're looking for doesn't exist. Explore leadership insights and mentorship guidance on Jason House's blog."
        type="website"
      />
      <Header />
      <div className="container top-margin">
        <div className={styles.imageContainer}>
          <img
            src="/img/404.png"
            alt="404 - Page Not Found"
            className={styles.image}
            loading="lazy"
          />
        </div>
        <h1>404 - Page Not Found</h1>
        <p>
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <p>
          Here are some helpful links to get you back on track:
        </p>
        <ul className={styles.linkList}>
          <li>
            <a href="/" className={styles.link}>
              Home Page
            </a>
          </li>
          <li>
            <a href="/posts" className={styles.link}>
              Blog Posts
            </a>
          </li>
          <li>
            <a href="/about" className={styles.link}>
              About Jason
            </a>
          </li>
          <li>
            <a href="/contact" className={styles.link}>
              Contact
            </a>
          </li>
        </ul>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => router.back()}
            className={styles.backButton}
          >
            Go Back
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
