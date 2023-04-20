import { Button, Paper, Typography } from '@mui/material';
import { FormInputText } from 'components/FormInputText';
import { useTranslate } from 'components/languageContext/languageContext';
import { useAlerts } from 'components/SnackbarPanel';
import { loginRegExp, passwordRegExp } from 'components/utils/constants';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoginUserData } from 'services/userServiceTypes';
import { useAppDispatch } from 'store/store';
import { signinThunk } from 'store/thunks/userThunk';
import styles from './Login.module.scss';

export default function Login() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const loginSuccessMessage = useTranslate('alerts.successfullLogin');
  const UserNotFounted = useTranslate('alerts.userNotFouted');
  const loginLabel = useTranslate('form.login');
  const passwordLabel = useTranslate('form.password');
  const submitLabel = useTranslate('buttons.submit');
  const resetLabel = useTranslate('buttons.reset');
  const addAlert = useAlerts();
  const login = useTranslate('login.title');

  const methods = useForm({
    defaultValues: { login: '', password: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: LoginUserData) => {
    try {
      await dispatch(signinThunk(data));
      addAlert({ type: 'success', message: loginSuccessMessage });
      navigate('/boards');
    } catch {
      addAlert({ type: 'error', message: UserNotFounted });
      navigate('/');
    }
  };

  return (
    <div className={styles.login}>
      <div className="container">
        <div className={styles.wrapper}>
          <Paper
            style={{
              width: '100%',
              padding: '20px',
              display: 'grid',
              gridRowGap: '20px',
              justifyItems: 'center',
            }}
          >
            <Typography>{login}</Typography>
            <FormProvider {...methods}>
              <FormInputText
                name="login"
                label={loginLabel}
                type="text"
                required={true}
                minLength={2}
                maxLength={15}
                pattern={loginRegExp}
              />
              <FormInputText
                name="password"
                label={passwordLabel}
                type="password"
                required={true}
                minLength={2}
                maxLength={15}
                pattern={passwordRegExp}
              />
            </FormProvider>

            <Button
              onClick={handleSubmit(onSubmit)}
              className={styles.formButton}
              color="info"
              variant={'contained'}
              disabled={isSubmitting}
            >
              {submitLabel}
            </Button>
            <Button
              className={styles.formButton}
              onClick={() => {
                reset();
              }}
              variant={'outlined'}
              color="error"
            >
              {resetLabel}
            </Button>
          </Paper>
        </div>
      </div>
    </div>
  );
}
