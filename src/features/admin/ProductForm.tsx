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
interface Props{
    product?: Proizvod;
    cancelEdit: ()=> void;
    vrste: number[];
    kategorije: number[];
    pakovanja: number[];
    //errors: any
    //validationSchema: yup.ObjectSchema<any>;
}


export default function ProductForm({product, cancelEdit, vrste, kategorije, pakovanja}:Props) {
    /*const isUpdateAction = !!product;
    validationSchema = isUpdateAction ? updateValidationSchema : createValidationSchema*/
    const { control, reset } = useForm<FieldValues>({
        defaultValues:product
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
      
          const productData: Proizvod | CreateProizvod = {
            proizvodId: product ? formData.get('proizvodId') as unknown as number : undefined,
            naziv: formData.get('naziv') as string,
            cijena: formData.get('cijena') as unknown as number,
            valuta: formData.get('valuta') as string,
            velicina: formData.get('velicina') as string,
            zalihe: formData.get('zalihe') as unknown as number,
            pakovanjeId: formData.get('pakovanjeId') as unknown as number,
            kategorijaId: formData.get('kategorijaId') as unknown as number,
            vrstaId: formData.get('vrstaId') as unknown as number,
            slika: formData.get('slika') as unknown as string
          };
      
          if (product) {
            agent.Admin.updateProduct(productData as Proizvod)
              .then((response: Proizvod) => {
                toast.success('Proizvod uspjesno azuriran!')
                console.log('Proizvod uspjesno azuriran:', response);
                cancelEdit();
              })
              .catch((error: any) => {
                console.log('Greska prilikom azuriranja proizvoda:', error);
              });
          } else {
            agent.Admin.createProduct(productData as CreateProizvod)
              .then((response: Proizvod) => {
                toast.success('Proizvod uspjesno dodat');
                cancelEdit();
              });
          }
        } catch (error) {
          console.log(error);
        }
      }
      
    

    useEffect(()=>{
        if (product) reset(product);
    },[product, reset])
    return (
        <Box component={Paper} sx={{p: 4}}>
            <Typography variant="h4" gutterBottom sx={{mb: 4}}>
                Detalji
            </Typography>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmitData(e)}>
            <Grid container spacing={3}>
            {product ? (
                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name='proizvodId' label='Id proizvoda' />
                </Grid>
                ) : null}
                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name='naziv' label='Naziv proizvoda' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='cijena' label='Cijena' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='valuta' label='Valuta' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='velicina' label='Velicina' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='zalihe' label='Zalihe' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='slika' label='Slika' />
                </Grid>
                <Grid item xs={12}>
  <AppSelectList
    control={control}
    name="pakovanjeId"
    label="Pakovanje"
    items={pakovanja}
  />
</Grid>
<Grid item xs={12}>
  <AppSelectList
    control={control}
    name="kategorijaId"
    label="Kategorija"
    items={kategorije}
  />
</Grid>
<Grid item xs={12}>
  <AppSelectList
    control={control}
    name="vrstaId"
    label="Vrste"
    items={vrste}
  />
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