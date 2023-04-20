import { Button, Paper } from '@mui/material';
import { FormInputText } from 'components/FormInputText';
import { useTranslate } from 'components/languageContext/languageContext';
import { useAlerts } from 'components/SnackbarPanel';
import { loginRegExp, passwordRegExp } from 'components/utils/constants';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SignupUserData } from 'services/userServiceTypes';
import { useAppDispatch, useAppSelector } from 'store/store';
import { deleteUserByIdThunk, updateUserThunk } from 'store/thunks/userThunk';
import styles from './../registration/Registration.module.scss';
import Typography from '@mui/material/Typography';

export default function Board() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const addAlert = useAlerts();

  const nameLabel = useTranslate('form.name');
  const loginLabel = useTranslate('form.login');
  const passwordLabel = useTranslate('form.password');
  const submitLabel = useTranslate('buttons.submit');
  const resetLabel = useTranslate('buttons.reset');
  const SuccessUpdateUserData = useTranslate('alerts.successUpdateUserData');
  const SuccessDeleteAccount = useTranslate('alerts.deleteAccount');
  const TitleUpdateUserData = useTranslate('profile.title');
  const DeleteAccauntText = useTranslate('profile.deleteButton');
  const errorLoginMessage = useTranslate('alerts.errorLogin');

  const userId = useAppSelector((state) => state.user.user?._id);

  useEffect(() => {
    if (!userId) {
      addAlert({ type: 'error', message: errorLoginMessage });
      navigate('/login');
    }
  }, []);

  const onSubmit = async (data: SignupUserData) => {
    if (userId) await dispatch(updateUserThunk(userId, data));
    addAlert({ type: 'success', message: SuccessUpdateUserData });
    navigate('/boards');
  };

  const hendleDeleteUser = async () => {
    if (userId) await dispatch(deleteUserByIdThunk(userId));
    localStorage.clear();
    addAlert({ type: 'success', message: SuccessDeleteAccount });
    navigate('/');
  };

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

  return (
    <form className={styles.registration}>
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
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
              {TitleUpdateUserData}
            </Typography>
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
            <Button
              onClick={hendleDeleteUser}
              variant={'outlined'}
              className={styles.formButton}
              color="error"
              sx={{ height: 'fit-content' }}
            >
              {DeleteAccauntText}
            </Button>
          </Paper>
        </div>
      </div>
    </form>
  );
}
