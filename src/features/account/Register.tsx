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
import { useState } from 'react';
import { error } from 'console';
import { Alert, AlertTitle, List, ListItem, ListItemText } from '@mui/material';
import { toast } from 'react-toastify';
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

export default function Register() {
    const {register, handleSubmit, formState:{errors}} = useForm({
        mode:'onTouched'
    })
    const navigate = useNavigate();
    const dispatch = useAppDispatch(); //ovo sam dodala da bi mi registrovanog korisnika odmah preusmjerio kao ulogovanog
    const [validationErrors,setValidationErrors]=useState<string | null>(null);
    /*
        agent.Account.register(data)
            .then(response => {
                if(response.status === 'error'){
                    const problem = JSON.parse(response);
                    setValidationErrors(problem.errors);
                } else {
                    setValidationErrors(null);
                }
            })
            .catch(error => setValidationErrors(error.response.data.errors));
    };*/
    

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
            <Typography component="h1" variant="h5">
              REGISTER
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(data => 
              agent.Account.register(data)
              .then(() => {
                toast.success('Registration successful!');
                const credentials = {
                  KorisnickoIme: data.KorisnickoIme,
                  Lozinka: data.Lozinka
                };
                dispatch(signInUser(credentials));
                navigate('/catalog');
              })
              .catch(error => setValidationErrors(error)))} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="ime"
                {...register('ime', {required:'Ime je obavezno!'})}
                error={!!errors.ime}
                helperText={errors?.ime?.message as string}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Prezime"
                {...register('prezime',{required:'Prezime je obavezno!'})}
                error={!!errors.prezime}
                helperText={errors?.prezime?.message as string}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Adresa"
                {...register('adresa')}
                error={!!errors.adresa}
                helperText={errors?.adresa?.message as string}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Broj telefona"
                {...register('brojTelefona')}
                error={!!errors.brojTelefona}
                helperText={errors?.brojTelefona?.message as string}
              />
              <TextField
                margin="normal"
                fullWidth
                label="KorisnickoIme"
                {...register('KorisnickoIme',{required:'Korisnicko ime je obavezno!'})}
                error={!!errors.KorisnickoIme}
                helperText={errors?.KorisnickoIme?.message as string}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Email"
                type='email'
                InputProps={{
                  style: {
                    fontFamily: 'Old Standard TT',
                  },
                }}
                {...register('Email',{required:'Email je obavezan!'})}
                error={!!errors.Email}
                helperText={errors?.Email?.message as string}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Lozinka"
                type="password"
                {...register('Lozinka',{required:'Lozinka je obavezna!'})}
                error={!!errors.lozinka}
                helperText={errors?.Lozinka?.message as string}
              />
              <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{backgroundColor:'#90EE90', color:'white'}}
              >
              Registruj se
              </LoadingButton>

              <Grid container>
                <Grid item>
                  <Link href='/register' style={{color:'black', fontWeight:'bold'}}>
                    {"Već imate nalog? Ulogujte se"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} style={{color:'black', fontWeight:'bold'}} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

