import React from 'react';
import { useTranslate } from 'components/languageContext/languageContext';
import welcomeImage from './../../assets/images/welcome.png';
import styles from './WelcomePage.module.scss';
const bgColor = ['#FAEA73', '#F7CEDC', '#CCEFF6'];
export default function WelcomePage() {
  const buttonWelcomeText = useTranslate('welcomeText.welcome');
  const buttonNamingText = useTranslate('welcomeText.naming').toUpperCase();
  const team = useTranslate('welcomeText.team').split(',');
  const role = useTranslate('welcomeText.role');

  return (
    <div className={styles.welcome}>
      <div className="container" data-testid="welcome">
        <div className={styles.wrapper}>
          <div className={styles.projectInfo}>
            <div className={styles.welcomeText}>
              <span>
                {buttonNamingText}
                <br></br>
                {buttonWelcomeText}
              </span>
            </div>
            <img className={styles.welcomeImage} src={welcomeImage} alt="foto" />
          </div>
          <div className={styles.about}>
            {team.map((dev: string, index: number) => (
              <div key={dev} className={styles.cardDev} style={{ backgroundColor: bgColor[index] }}>
                <h4 className={styles.nameDev}>{dev.split(':')[0]}</h4>
                <h6 className={styles.nameDev}>{role}</h6>
                <h5 className={styles.nameDev}>{dev.split(':')[1]}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
