import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import { useEffect } from "react";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";
import { KategorijaCreate, KategorijaUpdate } from "../../app/models/kategorija";
interface Props{
    kategorija?: KategorijaCreate;
    cancelEdit: ()=> void;
    //errors: any
    //validationSchema: yup.ObjectSchema<any>;
}


export default function CategoryForm({kategorija, cancelEdit}:Props) {
    /*const isUpdateAction = !!product;
    validationSchema = isUpdateAction ? updateValidationSchema : createValidationSchema*/
    const { control, reset } = useForm<FieldValues>({
        defaultValues:kategorija
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
      
          const categoryData: KategorijaUpdate | KategorijaCreate = {
            kategorijaId: kategorija ? formData.get('kategorijaId') as unknown as number : undefined,
            naziv: formData.get('naziv') as unknown as string,
            opis: formData.get('opis') as unknown as string
          };
      
          if (kategorija) {
            agent.Categories.updateCategory(categoryData as KategorijaUpdate)
              .then((response: KategorijaUpdate) => {
                console.log('Kategorija azurirana:', response);
                toast.success('Kategorija azurirana!')
                cancelEdit();
              })
              .catch((error: any) => {
                console.log('Greska prilikom azuriranja kategorije:', error);
              });
          } else {
            agent.Categories.createCategory(categoryData as KategorijaCreate)
              .then((response:KategorijaUpdate) => {
                toast.success('Kategorija uspjesno dodata!');
                cancelEdit();
              });
          }
        } catch (error) {
          console.log(error);
        }
      }
      
    

    useEffect(()=>{
        if (kategorija) reset(kategorija);
    },[kategorija, reset])
    return (
        <Box component={Paper} sx={{p: 4}}>
            <Typography variant="h4" gutterBottom sx={{mb: 4}}>
                Detalji
            </Typography>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmitData(e)}>
            <Grid container spacing={3}>
            {kategorija ? (
                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name='kategorijaId' label='Id kategorije' />
                </Grid>
                ) : null}
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='naziv' label='Naziv' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='opis' label='Opis' />
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