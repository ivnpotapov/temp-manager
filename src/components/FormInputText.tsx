import { TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslate } from './languageContext/languageContext';

type FormInputProps = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
};

const validationParamsDefaultValue = {
  required: true,
  minLength: 2,
  maxLength: 30,
  pattern: /[*]/,
};

export const FormInputText = ({
  name,
  label,
  type,
  required = validationParamsDefaultValue.required,
  minLength = validationParamsDefaultValue.minLength,
  maxLength = validationParamsDefaultValue.maxLength,
  pattern = validationParamsDefaultValue.pattern,
}: FormInputProps) => {
  const { control } = useFormContext();

  const requiredErrorText = useTranslate('form.required');
  const minLengthErrorText = useTranslate('form.minLength');
  const maxLengthErrorText = useTranslate('form.maxLength');
  const patternErrorText = useTranslate('form.pattern');

  const inputsErrorMessage = {
    required: requiredErrorText,
    minLength: `${minLengthErrorText} ${minLength}`,
    maxLength: `${maxLengthErrorText} ${maxLength}`,
    pattern: patternErrorText,
  };

  type ErrorMessage = keyof typeof inputsErrorMessage;

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required, minLength, maxLength, pattern }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <TextField
            type={type}
            helperText={error ? inputsErrorMessage[error?.type as ErrorMessage] : ' '}
            size={'small'}
            error={!!error}
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
