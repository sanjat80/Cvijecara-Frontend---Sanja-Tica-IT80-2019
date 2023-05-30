import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import {  FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";

import { useEffect } from "react";
import AppSelectList from "../../app/components/AppSelectList";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";
import { KorisnikAdminCreate, KorisnikAdminUpdate, KorisnikRegistration } from "../../app/models/user";
interface Props{
    user?: KorisnikAdminUpdate;
    //errors: any
    //validationSchema: yup.ObjectSchema<any>;
}


export default function RegistredUserForm({user}:Props) {
    /*const isUpdateAction = !!product;
    validationSchema = isUpdateAction ? updateValidationSchema : createValidationSchema*/
    const { control, reset } = useForm<FieldValues>({
        defaultValues:user
    });

    /*function handleSubmitData(data:FieldValues, event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        try {
            if(product)
            {
                console.log(product)
                const productData: Proizvod = {
                    proizvodId: data.proizvodId, 
                    naziv: data.naziv, 
                    cijena: data.cijena, 
                    valuta: data.valuta, 
                    velicina: data.velicina, 
                    zalihe: data.zalihe, 
                    pakovanjeId: data.pakovanjeId, 
                    kategorijaId: data.kategorijaId, 
                    vrstaId: data.vrstaId
                  };
                agent.Admin.updateProduct(productData)
                  .then((response: Proizvod) => {
                    
                    console.log('Product updated:', response);
                    cancelEdit();
                    
                  })

                  .catch((error: any) => {
                    console.log('Error updating product:', error);
                  });
            
                } else {
                    console.log(product)
                    const productData: CreateProizvod = {
                        //proizvodId: data.proizvodId, 
                        naziv: data.naziv,
                        cijena: data.cijena,
                        valuta: data.valuta,
                        velicina: data.velicina, 
                        zalihe: data.zalihe, 
                        pakovanjeId: data.pakovanjeId, 
                        kategorijaId: data.kategorijaId,
                        vrstaId: data.vrstaId 
                      };
                    agent.Admin.createProduct(productData).then((response: Proizvod)=>{
                        toast.success("Proizvod uspjesno dodat");
                        cancelEdit();
                    })
                }
            } catch( error)
            {
                console.log(error);
            }
    }*/
    function handleSubmitData(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
      
        try {
          const formData = new FormData(event.currentTarget);
      
          const userData: KorisnikRegistration = {
            ime: formData.get('ime') as string,
            prezime: formData.get('prezime') as unknown as string,
            adresa: formData.get('adresa') as string,
            brojTelefona: formData.get('brojTelefona') as string,
            korisnickoIme: formData.get('korisnickoIme') as unknown as string,
            email: formData.get('email') as unknown as string,
            lozinka: formData.get('lozinka') as unknown as string,
            
          };
      
          if (user) {
            agent.User.updateRegistredUser(userData as KorisnikRegistration)
              .then((response: KorisnikAdminUpdate) => {
                toast.success('Korisnik uspjesno azuriran!')
                console.log('Korisnik azuriran:', response);
              })
              .catch((error: any) => {
                console.log('Greska prilikom azuriranja korisnika:', error);
              });
          } else {
            agent.User.createUser(userData as KorisnikAdminCreate)
              .then((response: KorisnikAdminCreate) => {
                toast.success('Korisnik uspjesno dodat');
              });
          }
        } catch (error) {
          console.log(error);
        }
      }
      
    

    useEffect(()=>{
        if (user) reset(user);
    },[user, reset])
    return (
        <Box component={Paper} sx={{p: 4}}>
            <Typography variant="h4" gutterBottom sx={{mb: 4}}>
                Detalji 
            </Typography>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmitData(e)}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name='ime' label='Ime' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='prezime' label='Prezime' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='adresa' label='Adresa' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='brojTelefona' label='Broj telefona' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='email' label='Email' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='lozinka' label='Lozinka' />
                </Grid>
             </Grid>
            <Box display='flex' justifyContent='space-between' sx={{mt: 3}}>
                <Button variant='contained' color='success' type="submit">Submit</Button>
            </Box>
            </form>
        </Box>
    )
} 