import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/material/Button'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FieldValues, useForm } from 'react-hook-form';
import agent from '../../app/api/agent';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props} style={{fontFamily:'Old Standard TT', color:'black', fontWeight:'bold'}}>
      {'Copyright © BOTANIKO '}
        
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const navigate= useNavigate();
  const dispatch = useAppDispatch();
  const {register, handleSubmit, formState: {isSubmitting, errors, isValid},getValues} = useForm({
    mode:'onTouched'
  })

  function submitForm(data: FieldValues){
  //const cons = [data.korisnickoIme, data.lozinka] = getValues(["korisnickoIme","lozinka"])
  dispatch(signInUser(data));
  navigate('/catalog');
  }


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(images/login.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#90EE90' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" >
              LOG IN
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(submitForm)} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="korisnickoIme"
                {...register('korisnickoIme', {required:'Korisnicko ime je obavezno!'})}
                error={!!errors.korisnickoIme}
                helperText={errors?.korisnickoIme?.message as string}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Lozinka"
                type="password"
                {...register('lozinka',{required:'Lozinka je obavezna!'})}
                error={!!errors.lozinka}
                helperText={errors?.lozinka?.message as string}
              />
              <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{backgroundColor:'#90EE90', color:'white'}}
              >
              Uloguj se
              </LoadingButton>

              <Grid container>
                <Grid item>
                  <Link href='/register' style={{ color:'black', fontWeight:'bold'}}>
                    {"Nemate nalog? Registrujte se"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} style={{ color:'black', fontWeight:'bold'}} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

