import { Button, Paper, Typography } from '@mui/material';
import { FormInputText } from 'components/FormInputText';
import { useAlerts } from 'components/SnackbarPanel';
import { loginRegExp, passwordRegExp } from 'components/utils/constants';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SignupUserData } from 'services/userServiceTypes';
import { useAppDispatch } from 'store/store';
import { createNewUserThunk } from 'store/thunks/userThunk';
import { useTranslate } from '../../languageContext/languageContext';
import styles from './Registration.module.scss';

export default function Registration() {
  const nameLabel = useTranslate('form.name');
  const loginLabel = useTranslate('form.login');
  const passwordLabel = useTranslate('form.password');
  const submitLabel = useTranslate('buttons.submit');
  const resetLabel = useTranslate('buttons.reset');
  const RegistrationSuccessMessage = useTranslate('alerts.successRegistration');
  const RegistrationErrorMessage = useTranslate('alerts.errorRegistration');
  const titleRegistration = useTranslate('registration.title');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const addAlert = useAlerts();

  const methods = useForm({
    defaultValues: { name: '', login: '', password: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: SignupUserData) => {
    try {
      await dispatch(createNewUserThunk(data));
      addAlert({ type: 'success', message: RegistrationSuccessMessage });
      navigate('/boards');
    } catch {
      addAlert({ type: 'error', message: RegistrationErrorMessage });
      navigate('/');
    }
  };

  return (
    <div className={styles.registration}>
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
            <Typography>{titleRegistration}</Typography>
            <FormProvider {...methods}>
              <FormInputText
                name="name"
                label={nameLabel}
                type="text"
                required={true}
                minLength={2}
                maxLength={15}
                pattern={loginRegExp}
              />
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
              className={styles.formButton}
              color="info"
              onClick={handleSubmit(onSubmit)}
              variant={'contained'}
              disabled={isSubmitting}
            >
              {submitLabel}
            </Button>
            <Button
              onClick={() => reset()}
              variant={'outlined'}
              className={styles.formButton}
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
