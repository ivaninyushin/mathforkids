import React from 'react';
import styles from './donatePage.module.scss';

const DonatePage: React.FC = () => {


  return (
    <div className={styles.container}>
      <p>Help to keep this site alive by making a donation.</p>
      <a href='https://www.paypal.com/donate/?hosted_button_id=7WWLHH3F9BEW2'
        target='_blank'
        rel="noreferrer"
        className={styles.link}>Donate via PayPal</a>
    </div>
  );
};


export default DonatePage;
