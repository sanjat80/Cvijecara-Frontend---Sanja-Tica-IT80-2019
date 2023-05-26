import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { Control, FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import { CreateProizvod, Proizvod } from "../../app/models/proizvod";
import { useEffect } from "react";
import AppSelectList from "../../app/components/AppSelectList";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateValidationSchema, createValidationSchema } from "./productValidation";
import agent from "../../app/api/agent";
import * as yup from 'yup';
import { toast } from "react-toastify";
import { KorisnikAdminCreate, KorisnikAdminUpdate } from "../../app/models/user";
interface Props{
    user?: KorisnikAdminUpdate;
    cancelEdit: ()=> void;
    tipovi: number[];
    //errors: any
    //validationSchema: yup.ObjectSchema<any>;
}


export default function UserForm({user, cancelEdit, tipovi}:Props) {
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
      
          const userData: KorisnikAdminUpdate | KorisnikAdminCreate = {
            korisnikId: user ? formData.get('korisnikId') as unknown as number:undefined,
            ime: formData.get('ime') as string,
            prezime: formData.get('prezime') as unknown as string,
            adresa: formData.get('adresa') as string,
            brojTelefona: formData.get('brojTelefona') as string,
            statusKorisnika: formData.get('statusKorisnika') as unknown as string,
            korisnickoIme: formData.get('korisnickoIme') as unknown as string,
            email: formData.get('email') as unknown as string,
            lozinka: formData.get('lozinka') as unknown as string,
            tipId: formData.get('tipId') as unknown as number,
          };
      
          if (user) {
            agent.User.updateUser(userData as KorisnikAdminUpdate)
              .then((response: KorisnikAdminUpdate) => {
                console.log('User updated:', response);
                cancelEdit();
              })
              .catch((error: any) => {
                console.log('Error updating product:', error);
              });
          } else {
            agent.User.createUser(userData as KorisnikAdminCreate)
              .then((response: KorisnikAdminCreate) => {
                toast.success('Korisnik uspjesno dodat');
                cancelEdit();
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
                Detalji o korisniku
            </Typography>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmitData(e)}>
            <Grid container spacing={3}>
            {user ? (
                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name='korisnikId' label='Id korisnika' />
                </Grid>
                ) : null}
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
                    <AppTextInput control={control} name='statusKorisnika' label='Status korisnika' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='korisnickoIme' label='Korisnicko ime' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='email' label='Email' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='lozinka' label='Lozinka' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppSelectList control={control} name='tipId' label='Tip korisnika' items={tipovi}/>
                </Grid>
</Grid>
            <Box display='flex' justifyContent='space-between' sx={{mt: 3}}>
                <Button onClick={cancelEdit} variant='contained' color='inherit'>Cancel</Button>
                <Button variant='contained' color='success' type="submit">Submit</Button>
            </Box>
            </form>
        </Box>
    )
} 