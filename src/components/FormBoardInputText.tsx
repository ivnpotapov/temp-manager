import { TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslate } from './languageContext/languageContext';

type FormInputProps = {
  name: string;
  label: string;
  type: string;
  required?: boolean | undefined;
  minLength?: number | undefined;
  maxLength?: number | undefined;
};

const validationParamsDefaultValue = {
  required: true,
  minLength: 1,
  maxLength: 10,
};
export const FormBoardInputText = ({
  name,
  label,
  type,
  required = validationParamsDefaultValue.required,
  minLength = validationParamsDefaultValue.minLength,
  maxLength = validationParamsDefaultValue.maxLength,
}: FormInputProps) => {
  const { control } = useFormContext();
  const requiredErrorText = useTranslate('form.required');
  const minLengthErrorText = useTranslate('form.minLength');
  const maxLengthErrorText = useTranslate('form.maxLength');

  const inputsErrorMessage = {
    required: requiredErrorText,
    minLength: `${minLengthErrorText} ${minLength}`,
    maxLength: `${maxLengthErrorText} ${maxLength}`,
  };
  type ErrorMessage = keyof typeof inputsErrorMessage;
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required, minLength, maxLength }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <TextField
            type={type}
            error={!!error}
            helperText={error ? inputsErrorMessage[error?.type as ErrorMessage] : ' '}
            size={'small'}
            onChange={onChange}
            value={value}
            fullWidth
            label={label}
            variant="outlined"
          />
        );
      }}
    />
  );
};
