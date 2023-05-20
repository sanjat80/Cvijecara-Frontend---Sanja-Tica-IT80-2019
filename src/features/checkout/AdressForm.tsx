import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {  useFormContext } from 'react-hook-form';
import AppTextInput from '../../app/components/AppTextInput';
import AppCheckBox from '../../app/components/AppCheckBox';

export default function AddressForm() {
    const {control} = useFormContext();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <AppTextInput control = {control} name='adresa' label='Adresa'></AppTextInput>
        </Grid>
        <Grid item xs={12}>
        <AppTextInput control = {control} name='BrojTelefona' label='BrojTelefona'></AppTextInput>
        </Grid>
        <Grid item xs={12} sm={6}>
        <AppTextInput control = {control} name='grad' label='Grad'></AppTextInput>
        </Grid>
        <Grid item xs={12} sm={6}>
        <AppTextInput control = {control} name='region' label='Region'></AppTextInput>
        </Grid>
        <Grid item xs={12} sm={6}>
        <AppTextInput control = {control} name='drzava' label='Drzava'></AppTextInput>
        </Grid>
        </Grid>
      </React.Fragment>
  );
}