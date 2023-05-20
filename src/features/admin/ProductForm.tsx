import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import { Proizvod } from "../../app/models/proizvod";
import { useEffect } from "react";
import AppSelectList from "../../app/components/AppSelectList";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./productValidation";
import agent from "../../app/api/agent";
import ProductsCard from "../catalog/ProductCard";
import { useAppDispatch } from "../../app/store/configureStore";
interface Props{
    product?: Proizvod;
    cancelEdit: ()=> void;
    vrste: number[];
    kategorije: number[];
    pakovanja: number[];
}


export default function ProductForm({product, cancelEdit, vrste, kategorije, pakovanja}:Props) {
    const { control, reset } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const dispatch = useAppDispatch();

    function handleSubmitData(data:FieldValues){
        try {
            if(product)
            {
                const productData: Proizvod = {
                    proizvodId: data.proizvodId, // Fill in the correct value
                    naziv: data.naziv, // Fill in the correct value
                    cijena: data.cijena, // Fill in the correct value
                    valuta: data.valuta, // Fill in the correct value
                    velicina: data.velicina, // Fill in the correct value
                    zalihe: data.zalihe, // Fill in the correct value
                    pakovanjeId: data.pakovanjeId, // Fill in the correct value
                    kategorijaId: data.kategorijaId, // Fill in the correct value
                    vrstaId: data.vrstaId // Fill in the correct value
                  };
                agent.Admin.updateProduct(productData)
                  .then((response: Proizvod) => {
                    // Handle the successful response
                    console.log('Product updated:', response);
                    cancelEdit();
                    // Perform any additional actions or update the UI accordingly
                  })

                  .catch((error: any) => {
                    // Handle the error
                    console.log('Error updating product:', error);
                    // Display an error message or take appropriate actions
                  });
            
                } else {
                    const productData: Proizvod = {
                        proizvodId: data.proizvodId, // Fill in the correct value
                        naziv: data.naziv, // Fill in the correct value
                        cijena: data.cijena, // Fill in the correct value
                        valuta: data.valuta, // Fill in the correct value
                        velicina: data.velicina, // Fill in the correct value
                        zalihe: data.zalihe, // Fill in the correct value
                        pakovanjeId: data.pakovanjeId, // Fill in the correct value
                        kategorijaId: data.kategorijaId, // Fill in the correct value
                        vrstaId: data.vrstaId // Fill in the correct value
                      };
                    agent.Admin.createProduct(productData);
                }
            } catch( error)
            {
                console.log(error);
            }
    }
    

    useEffect(()=>{
        if (product) reset(product);
    },[product, reset])
    return (
        <Box component={Paper} sx={{p: 4}}>
            <Typography variant="h4" gutterBottom sx={{mb: 4}}>
                Product Details
            </Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name='proizvodId' label='Id proizvoda' />
                </Grid>
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
                <Grid item xs={12}>
                    <AppSelectList control={control} name='pakovanjeId' label='Pakovanje' items={pakovanja} />
                </Grid>
                <Grid item xs={12}>
                    <AppSelectList control={control} name='kategorijaId' label='Kategorija' items={kategorije} />
                </Grid>
                <Grid item xs={12}>
                    <AppSelectList control={control} name='vrstaId' label='Vrste' items={vrste} />
                </Grid>
            </Grid>
            <Box display='flex' justifyContent='space-between' sx={{mt: 3}}>
                <Button onClick={cancelEdit} variant='contained' color='inherit'>Cancel</Button>
                <Button variant='contained' color='success' onClick={handleSubmitData}>Submit</Button>
            </Box>
        </Box>
    )
} 