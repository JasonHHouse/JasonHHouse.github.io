import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <div className={styles.headerContainer}>
      <nav>
        <h1><a href="/">Leadership and Mentorship</a></h1>
        <ul>
          <li key="posts"><a href="/posts">Posts</a></li>
          <li key="cyoa"><a href="/cyoa">CYOA</a></li>
          <li key="about"><a href="/about">About</a></li>
          <li key="contact"><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <div className={styles.horizontalBar}></div>
    </div>
  );
};

export default Header;