import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Control, FieldValues, useController } from 'react-hook-form';

interface Props {
  control: Control<FieldValues, any>;
  name: string;
  label: string;
  rules?: object;
  helperText?: string;
}

export default function AppTextInputValidation(props: Props) {
  const { control, name, label, helperText } = props;
  const { field, fieldState } = useController({ control, name });

  return (
    <TextField
      {...field}
      label={label}
      fullWidth
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error ? fieldState.error.message : helperText}
    />
  );
}
