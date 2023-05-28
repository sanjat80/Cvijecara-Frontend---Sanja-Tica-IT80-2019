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
import { PakovanjeCreation, PakovanjeUpdate } from "../../app/models/pakovanje";
interface Props{
    pakovanje?: PakovanjeCreation;
    cancelEdit: ()=> void;
    //errors: any
    //validationSchema: yup.ObjectSchema<any>;
}


export default function PackageForm({pakovanje, cancelEdit}:Props) {
    /*const isUpdateAction = !!product;
    validationSchema = isUpdateAction ? updateValidationSchema : createValidationSchema*/
    const { control, reset } = useForm<FieldValues>({
        defaultValues:pakovanje
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
      
          const packageData: PakovanjeUpdate | PakovanjeCreation = {
            pakovanjeId: pakovanje ? formData.get('pakovanjeId') as unknown as number : undefined,
            vrsta: formData.get('vrsta') as string,
            cijena: formData.get('cijena') as unknown as number,
            valuta: formData.get('valuta') as string,
            ukrasi: formData.get('ukrasi') as string,
            posveta: formData.get('posveta') as unknown as string
          };
      
          if (pakovanje) {
            agent.Package.updatePakovanje(packageData as PakovanjeUpdate)
              .then((response: PakovanjeUpdate) => {
                toast.success('Pakovanje azyurirano!')
                console.log('Pakovanje azurirano:', response);
                cancelEdit();
              })
              .catch((error: any) => {
                console.log('Greska prilikom azuriranja pakovanja:', error);
              });
          } else {
            agent.Package.createPakovanje(packageData as PakovanjeCreation)
              .then((response:PakovanjeUpdate) => {
                toast.success('Pakovanje uspjesno dodato');
                cancelEdit();
              });
          }
        } catch (error) {
          console.log(error);
        }
      }
      
    

    useEffect(()=>{
        if (pakovanje) reset(pakovanje);
    },[pakovanje, reset])
    return (
        <Box component={Paper} sx={{p: 4}}>
            <Typography variant="h4" gutterBottom sx={{mb: 4}}>
                Detalji
            </Typography>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmitData(e)}>
            <Grid container spacing={3}>
            {pakovanje ? (
                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name='pakovanjeId' label='Id pakovanja' />
                </Grid>
                ) : null}
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='vrsta' label='Vrsta' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='cijena' label='Cijena' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='valuta' label='Valuta' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='ukrasi' label='Ukrasi' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='posveta' label='Posveta' />
                </Grid>
                <Grid item xs={12}>
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