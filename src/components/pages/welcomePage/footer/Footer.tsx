import React from 'react';
import style from './Footer.module.css';
import rs from './../../../assets/svg/rs.svg';
import git from './../../../assets/images/GitHub.png';

export default function Footer() {
  return (
    <div className={style.footer}>
      <a href="https://rs.school">
        <img className={style.rs} src={rs} />
      </a>
      <p>2022</p>
      <div>
        <a href="https://github.com/dmitriStpaniuk/project-management" className={style.git}>
          <img width={'20px'} src={git} />
          Git
        </a>
      </div>
    </div>
  );
}
