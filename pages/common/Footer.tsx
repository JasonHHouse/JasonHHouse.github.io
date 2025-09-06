import styles from './Footer.module.css';

const Header = () => {

  return (
    <div className="container">
      <footer className={styles.footer}>
        &copy; 2025 Jason House's Blog. All rights reserved.&nbsp;
        <a href="/privacy">Privacy Policy</a>&nbsp;
        <a href="/contact">Contact</a>
      </footer>
    </div>
  );
}

export default Header;