import { useTranslate } from 'components/languageContext/languageContext';
import React from 'react';
import style from './Page404.module.css';

const Page404 = () => {
  const errorContext = useTranslate('links.page404');
  return (
    <div className={style.page404} data-testid="404">
      <h1>404</h1>
      <p>{errorContext}</p>
    </div>
  );
};
export default Page404;
